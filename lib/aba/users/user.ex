defmodule Aba.Users.User do
  use Aba.Schema
  use Pow.Ecto.Schema
  use Pow.Extension.Ecto.Schema,
    extensions: [PowResetPassword, PowEmailConfirmation]


  @derive {Jason.Encoder, only: [:id, :first_name, :last_name]}
  schema "users" do
    pow_user_fields()
    field :role, :string, null: false, default: "consumer"

    field :first_name, :string, null: false
    field :last_name, :string, null: false
    has_many :services, Aba.Services.Service
    has_many :appointments, Aba.Appointments.Appointment

    timestamps()
  end

  def changeset(user_or_changeset, attrs) do
    user_or_changeset
    |> pow_changeset(attrs)
    |> pow_extension_changeset(attrs)
    |> Ecto.Changeset.cast(attrs, [:role, :first_name, :last_name])
    |> Ecto.Changeset.validate_required([:role, :first_name, :last_name])
    |> Ecto.Changeset.validate_inclusion(:role, ~w(consumer provider))
  end

  @spec changeset_role(Ecto.Schema.t() | Ecto.Changeset.t(), map()) :: Ecto.Changeset.t()
  def changeset_role(user_or_changeset, attrs) do
    user_or_changeset
    |> Ecto.Changeset.cast(attrs, [:role])
    |> Ecto.Changeset.validate_inclusion(:role, ~w(consumer provider admin))
  end

end
