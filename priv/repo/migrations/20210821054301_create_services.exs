defmodule Aba.Repo.Migrations.CreateServices do
  use Ecto.Migration

  def change do
    create table(:services, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :name, :string
      add :category, :string
      add :duration, :integer
      add :price, :float
      add :location, :string
      add :description, :string
      add :image, :string
      add :user_id, :uuid

      timestamps()
    end

  end
end
