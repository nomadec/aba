defmodule Aba.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :email, :string, null: false
      add :password_hash, :string

      add :first_name, :string, null: false
      add :last_name, :string, null: false
      add :role, :string, null: false, default: "consumer"

      timestamps()
    end

    create unique_index(:users, [:email])
  end
end
