defmodule AbaWeb.ServiceController do
  use AbaWeb, :controller

  alias Aba.Services
  alias Aba.Services.Service

  action_fallback AbaWeb.FallbackController

  def index(conn, _params) do
    services = Services.list_services()
    render(conn, "index.json", services: services)
  end

  def create(conn, %{"service" => service_params}) do
    current_user = Pow.Plug.current_user(conn)
    service_params = Map.put(service_params, "user_id", current_user.id)
    with {:ok, %Service{} = service} <- Services.create_service(service_params) do
      conn
      |> put_status(:created)
      # |> put_resp_header("location", Routes.service_path(conn, :show, service))
      |> render("show.json", service: service)
    end
  end

  def show(conn, %{"id" => id}) do
    service = Services.get_service!(id)
    render(conn, "show.json", service: service)
  end

  def update(conn, %{"id" => id, "service" => service_params}) do
    current_user = Pow.Plug.current_user(conn)
    service = Services.get_service!(id)
    case service.user_id === current_user.id do
      true ->
        with {:ok, %Service{} = service} <- Services.update_service(service, service_params) do
          render(conn, "show.json", service: service)
        end
      false ->
        conn
        |> put_status(401)
        |> json(%{data: %{code: 401, message: "No rights"}})
        |> halt()
    end
  end

  def delete(conn, %{"id" => id}) do
    current_user = Pow.Plug.current_user(conn)
    service = Services.get_service!(id)
    case service.user_id === current_user.id do
      true ->
        with {:ok, %Service{}} <- Services.delete_service(service) do
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
