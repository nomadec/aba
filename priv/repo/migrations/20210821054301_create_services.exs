defmodule Aba.Repo.Migrations.CreateServices do
  use Ecto.Migration

  def change do
    create table(:services, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :name, :string
      add :user_id, :uuid
      add :price, :float
      add :duration, :integer
      add :location, :string
      add :description, :string

      timestamps()
    end

  end
end
