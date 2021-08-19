defmodule AbaWeb.API.V1.RegistrationController do
  use AbaWeb, :controller

  alias Ecto.Changeset
  alias Plug.Conn
  alias AbaWeb.ErrorHelpers

  @spec create(Conn.t(), map()) :: Conn.t()
  def create(conn, %{"user" => user_params}) do
    conn
    |> Pow.Plug.create_user(user_params)
    |> case do
      {:ok, user, conn} ->
        resp = AbaWeb.API.V1.SessionController.make_resp(conn, user)
        json(conn, resp)

      {:error, changeset, conn} ->
        errors = Changeset.traverse_errors(changeset, &ErrorHelpers.translate_error/1)

        conn
        |> put_status(500)
        |> json(%{data: errors})
    end
  end
end
