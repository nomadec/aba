defmodule Aba.Repo.Migrations.CreateAppointments do
  use Ecto.Migration

  def change do
    create table(:appointments, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :user_id, references(:users, column: :id, type: :uuid, on_delete: :nothing)
      add :service_id, references(:services, column: :id, type: :uuid, on_delete: :nothing)
      add :date_time, :utc_datetime
      add :paid, :boolean, default: false, null: false

      timestamps()
    end

    create index(:appointments, [:user_id])
    create index(:appointments, [:service_id])
  end
end
