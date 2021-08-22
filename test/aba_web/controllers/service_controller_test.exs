defmodule AbaWeb.ServiceControllerTest do
  use AbaWeb.ConnCase

  alias Aba.Services
  alias Aba.Services.Service

  @create_attrs %{
    description: "some description",
    duration: 42,
    location: "some location",
    name: "some name",
    price: 120.5,
    user_id: "7488a646-e31f-11e4-aace-600308960662"
  }
  @update_attrs %{
    description: "some updated description",
    duration: 43,
    location: "some updated location",
    name: "some updated name",
    price: 456.7,
    user_id: "7488a646-e31f-11e4-aace-600308960668"
  }
  @invalid_attrs %{description: nil, duration: nil, location: nil, name: nil, price: nil, user_id: nil}

  def fixture(:service) do
    {:ok, service} = Services.create_service(@create_attrs)
    service
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all services", %{conn: conn} do
      conn = get(conn, Routes.service_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create service" do
    test "renders service when data is valid", %{conn: conn} do
      conn = post(conn, Routes.service_path(conn, :create), service: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.service_path(conn, :show, id))

      assert %{
               "id" => id,
               "description" => "some description",
               "duration" => 42,
               "location" => "some location",
               "name" => "some name",
               "price" => 120.5,
               "user_id" => "7488a646-e31f-11e4-aace-600308960662"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.service_path(conn, :create), service: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update service" do
    setup [:create_service]

    test "renders service when data is valid", %{conn: conn, service: %Service{id: id} = service} do
      conn = put(conn, Routes.service_path(conn, :update, service), service: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.service_path(conn, :show, id))

      assert %{
               "id" => id,
               "description" => "some updated description",
               "duration" => 43,
               "location" => "some updated location",
               "name" => "some updated name",
               "price" => 456.7,
               "user_id" => "7488a646-e31f-11e4-aace-600308960668"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, service: service} do
      conn = put(conn, Routes.service_path(conn, :update, service), service: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete service" do
    setup [:create_service]

    test "deletes chosen service", %{conn: conn, service: service} do
      conn = delete(conn, Routes.service_path(conn, :delete, service))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.service_path(conn, :show, service))
      end
    end
  end

  defp create_service(_) do
    service = fixture(:service)
    %{service: service}
  end
end
