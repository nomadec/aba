defmodule Aba.ServicesTest do
  use Aba.DataCase

  alias Aba.Services

  describe "services" do
    alias Aba.Services.Service

    @valid_attrs %{description: "some description", duration: 42, location: "some location", name: "some name", price: 120.5, provider_id: "7488a646-e31f-11e4-aace-600308960662"}
    @update_attrs %{description: "some updated description", duration: 43, location: "some updated location", name: "some updated name", price: 456.7, provider_id: "7488a646-e31f-11e4-aace-600308960668"}
    @invalid_attrs %{description: nil, duration: nil, location: nil, name: nil, price: nil, provider_id: nil}

    def service_fixture(attrs \\ %{}) do
      {:ok, service} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Services.create_service()

      service
    end

    test "list_services/0 returns all services" do
      service = service_fixture()
      assert Services.list_services() == [service]
    end

    test "get_service!/1 returns the service with given id" do
      service = service_fixture()
      assert Services.get_service!(service.id) == service
    end

    test "create_service/1 with valid data creates a service" do
      assert {:ok, %Service{} = service} = Services.create_service(@valid_attrs)
      assert service.description == "some description"
      assert service.duration == 42
      assert service.location == "some location"
      assert service.name == "some name"
      assert service.price == 120.5
      assert service.provider_id == "7488a646-e31f-11e4-aace-600308960662"
    end

    test "create_service/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Services.create_service(@invalid_attrs)
    end

    test "update_service/2 with valid data updates the service" do
      service = service_fixture()
      assert {:ok, %Service{} = service} = Services.update_service(service, @update_attrs)
      assert service.description == "some updated description"
      assert service.duration == 43
      assert service.location == "some updated location"
      assert service.name == "some updated name"
      assert service.price == 456.7
      assert service.provider_id == "7488a646-e31f-11e4-aace-600308960668"
    end

    test "update_service/2 with invalid data returns error changeset" do
      service = service_fixture()
      assert {:error, %Ecto.Changeset{}} = Services.update_service(service, @invalid_attrs)
      assert service == Services.get_service!(service.id)
    end

    test "delete_service/1 deletes the service" do
      service = service_fixture()
      assert {:ok, %Service{}} = Services.delete_service(service)
      assert_raise Ecto.NoResultsError, fn -> Services.get_service!(service.id) end
    end

    test "change_service/1 returns a service changeset" do
      service = service_fixture()
      assert %Ecto.Changeset{} = Services.change_service(service)
    end
  end
end
