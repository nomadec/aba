defmodule AbaWeb.APIAuthErrorHandler do
  use AbaWeb, :controller
  alias Plug.Conn

  @spec call(Conn.t(), :not_authenticated) :: Conn.t()
  def call(conn, :not_authenticated) do
    conn
    |> put_status(401)
    |> json(%{data: %{code: 401, message: "Not authenticated"}})
  end
end
