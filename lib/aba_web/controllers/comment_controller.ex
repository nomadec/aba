defmodule AbaWeb.CommentController do
  use AbaWeb, :controller

  alias Aba.Comments
  alias Aba.Comments.Comment

  action_fallback AbaWeb.FallbackController

  def index(conn, params) do
    comments = Comments.list_comments(params)
    render(conn, "index.json", comments: comments)
  end

  def create(conn, %{"comment" => comment_params}) do
    comment_params = Aba.attach_owner(conn, comment_params)
    with {:ok, %Comment{} = comment} <- Comments.create_comment(comment_params) do
      conn
      |> put_status(:created)
      # |> put_resp_header("location", Routes.comment_path(conn, :show, comment))
      |> render("show.json", comment: comment)
    end
  end

  def show(conn, %{"id" => id}) do
    comment = Comments.get_comment!(id)
    render(conn, "show.json", comment: comment)
  end

  def update(conn, %{"id" => id, "comment" => comment_params}) do
    comment = Comments.get_comment!(id)
    case Aba.verify_ownership(conn, comment) do
      true ->
        with {:ok, %Comment{} = comment} <- Comments.update_comment(comment, comment_params) do
          render(conn, "show.json", comment: comment)
        end
      false ->
        conn
        |> put_status(401)
        |> json(%{data: %{code: 401, message: "No rights"}})
        |> halt()
    end
  end

  def delete(conn, %{"id" => id}) do
    comment = Comments.get_comment!(id)
    case Aba.verify_ownership(conn, comment) do
      true ->
        with {:ok, %Comment{}} <- Comments.delete_comment(comment) do
          send_resp(conn, :no_content, "")
        end
      false ->
        # send_resp(conn, 401, "No rights")
        # Controller.json(%{data: %{code: 401, message: "No rights"}})
        conn
        |> put_status(401)
        |> json(%{data: %{code: 401, message: "No rights"}})
        |> halt()
    end
  end
end
