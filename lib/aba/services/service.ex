defmodule Aba.Services.Service do
  use Aba.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :name, :price, :duration, :location, :description]}
  schema "services" do
    field :name, :string
    field :price, :float
    field :duration, :integer
    field :location, :string
    field :description, :string
    belongs_to :user, Aba.Users.User
    has_many :appointments, Aba.Appointments.Appointment

    timestamps()
  end

  @doc false
  def changeset(service, attrs) do
    service
    |> cast(attrs, [:name, :price, :duration, :location, :description, :user_id])
    |> validate_required([:name, :price, :duration, :location, :description, :user_id])
  end
end
