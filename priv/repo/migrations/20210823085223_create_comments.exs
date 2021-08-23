defmodule Aba.Repo.Migrations.CreateComments do
  use Ecto.Migration

  def change do
    create table(:comments, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :user_id, references(:users, column: :id, type: :uuid, on_delete: :nothing)
      add :service_id, references(:services, column: :id, type: :uuid, on_delete: :nothing)
      add :content, :text

      timestamps()
    end

    create index(:comments, [:user_id])
    create index(:comments, [:service_id])
  end
end
