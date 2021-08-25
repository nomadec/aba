defmodule Aba.Appointments.Appointment do
  use Aba.Schema
  import Ecto.Changeset


  @derive {Jason.Encoder, only: [:id, :date_time, :paid]}
  schema "appointments" do
    belongs_to :service, Aba.Services.Service
    belongs_to :user, Aba.Users.User
    field :date_time, :utc_datetime
    field :paid, :boolean, default: false

    timestamps()
  end

  @doc false
  def changeset(appointment, attrs) do
    appointment
    |> cast(attrs, [:date_time, :paid, :user_id, :service_id])
    |> validate_required([:date_time, :paid, :user_id, :service_id])
  end
end
