defmodule Aba.Services.Service do
  use Aba.Schema
  import Ecto.Changeset

  schema "services" do
    field :description, :string
    field :duration, :integer
    field :location, :string
    field :name, :string
    field :price, :float
    field :provider_id, Ecto.UUID

    timestamps()
  end

  @doc false
  def changeset(service, attrs) do
    service
    |> cast(attrs, [:name, :provider_id, :price, :duration, :location, :description])
    |> validate_required([:name, :provider_id, :price, :duration, :location, :description])
  end
end
