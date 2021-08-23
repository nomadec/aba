defmodule Aba.Services do
  @moduledoc """
  The Services context.
  """

  import Ecto.Query, warn: false
  alias Aba.Repo

  alias Aba.Services.Service

  @doc """
  Returns the list of services.

  ## Examples

      iex> list_services()
      [%Service{}, ...]

  """
  def list_services(), do: list_services(nil)
  def list_services(search_term), do: list_services(search_term, {:inserted_at, :asc})
  def list_services(search_term, sort_by), do: list_services(search_term, sort_by, 5, 1)

  def list_services(search_term, sort_by, per_page, page) do
    rummage = %{}
    |> build_search(search_term)
    |> build_sort(sort_by)
    |> build_paginate(per_page, page)

    {queryable, rummage} = Rummage.Ecto.rummage(Service, rummage, repo: Aba.Repo)
    Map.put(rummage, :services, Repo.all(queryable))
  end

  defp build_search(rummage, nil), do: rummage
  defp build_search(rummage, search_term) do
    search_params = %{
      :name => %{search_type: :ilike, search_term: search_term},
      # :price_gteq => %{search_type: :gteq, search_term: 2, search_field: :price},
      # :price => %{search_type: :lteq, search_term: 40},
      # :duration => %{search_type: :eq, search_term: search_term},
      :location => %{search_type: :ilike, search_term: search_term},
      :description => %{search_type: :ilike, search_term: search_term}
      # :first_name => %{assoc: [inner: :user], search_type: :ilike, search_term: search_term}
      # :first_name => %{assoc: [inner: :user], search_type: :ilike, search_expr: :where, search_term: search_term}
    }
    Map.put(rummage, :search, search_params)
  end

  defp build_sort(rummage, {field, order}) do
    Map.put(rummage, :sort, %{field: field, order: order})
  end

  defp build_paginate(rummage, per_page, page) do
    Map.put(rummage, :paginate, %{per_page: per_page, page: page})
  end

  @doc """
  Gets a single service.

  Raises `Ecto.NoResultsError` if the Service does not exist.

  ## Examples

      iex> get_service!(123)
      %Service{}

      iex> get_service!(456)
      ** (Ecto.NoResultsError)

  """
  def get_service!(id), do: Repo.get!(Service, id)

  @doc """
  Creates a service.

  ## Examples

      iex> create_service(%{field: value})
      {:ok, %Service{}}

      iex> create_service(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_service(attrs \\ %{}) do
    %Service{}
    |> Service.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a service.

  ## Examples

      iex> update_service(service, %{field: new_value})
      {:ok, %Service{}}

      iex> update_service(service, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_service(%Service{} = service, attrs) do
    service
    |> Service.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a service.

  ## Examples

      iex> delete_service(service)
      {:ok, %Service{}}

      iex> delete_service(service)
      {:error, %Ecto.Changeset{}}

  """
  def delete_service(%Service{} = service) do
    Repo.delete(service)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking service changes.

  ## Examples

      iex> change_service(service)
      %Ecto.Changeset{data: %Service{}}

  """
  def change_service(%Service{} = service, attrs \\ %{}) do
    Service.changeset(service, attrs)
  end
end
