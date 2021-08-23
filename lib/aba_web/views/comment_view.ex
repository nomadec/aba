defmodule AbaWeb.CommentView do
  use AbaWeb, :view
  alias AbaWeb.CommentView

  def render("index.json", %{comments: comments}) do
    %{data: render_many(comments, CommentView, "comment.json")}
  end

  def render("show.json", %{comment: comment}) do
    %{data: render_one(comment, CommentView, "comment.json")}
  end

  def render("comment.json", %{comment: comment}) do
    IO.inspect(comment)
    %{
      id: comment.id,
      user_id: comment.user_id,
      user_first_name: comment.user.first_name,
      user_last_name: comment.user.last_name,
      content: comment.content,
      updated_at: comment.updated_at,
      inserted_at: comment.inserted_at
    }
  end
end
