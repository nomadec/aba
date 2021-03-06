defmodule AbaWeb.ServiceController do
  use AbaWeb, :controller

  alias Aba.Services
  alias Aba.Services.Service

  action_fallback AbaWeb.FallbackController

  @default_per_page "5"
  @default_sort_by :inserted_at
  @default_sort_order :asc

  def index(conn, params) do
    # %{"_q" => search_term, "_page" => page, "_limit" => per_page, "_sort" => sort_by "_order" => sort_order}
    search_term = Map.get(params, "_q", nil)
    sort_by = {Map.get(params, "_sort", @default_sort_by), Map.get(params, "_order", @default_sort_order)}
    page = Map.get(params, "_page", "1")
    per_page = Map.get(params, "_limit", @default_per_page)
    # data = Services.list_services(search_term, sort_by, String.to_integer(per_page), String.to_integer(page))
    # data = Services.list_services(:paged, String.to_integer(page), String.to_integer(per_page), params)
    data = Services.list_services(:paged, params)
    filters = Services.get_min_max_price_on_services()
    data = Map.put(data, :filters, filters)
    render(conn, "index.json", data)
  end

  def create(conn, %{"service" => service_params}) do
    service_params = Aba.attach_owner(conn, service_params)
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
    service = Services.get_service!(id)
    case Aba.verify_ownership(conn, service) do
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
    service = Services.get_service!(id)
    case Aba.verify_ownership(conn, service) do
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
