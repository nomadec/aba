defmodule Aba.Users.User do
  use Ecto.Schema
  use Pow.Ecto.Schema

  schema "users" do
    pow_user_fields()
    field :role, :string, null: false, default: "consumer"

    field :first_name, :string, null: false
    field :last_name, :string, null: false

    timestamps()
  end

  def changeset(user_or_changeset, attrs) do
    user_or_changeset
    |> pow_changeset(attrs)
    |> Ecto.Changeset.cast(attrs, [:role, :first_name, :last_name])
    |> Ecto.Changeset.validate_required([:role, :first_name, :last_name])
  end

end
