defmodule Aba.Services.Service do
  use Aba.Schema
  import Ecto.Changeset
  use Rummage.Ecto

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

#   rummage = [
#     search: [name: [search_type: :like, search_term: "1"]],
#     sort: [field: :name, order: :asc],
#     paginate: [per_page: 2, page: 1]
#   ]
# rummage = [search: [name: [search_type: :like, search_term: "1"]]]

# {queryable, rummage} = Aba.Services.Service.rummage(Aba.Services.Service, rummage)

  # {queryable, rummage} = %Aba.Services.Service{} |> Rummage.Ecto.rummage(rummage)

  # products = queryable |> Aba.Repo.all

# rummage = %{search: %{:name => %{search_type: :like, search_term: "field_!"}}, sort: %{field: :field1, order: :asc}, paginate: %{per_page: 2, page: 1}}
# {queryable, rummage} = Service |> Rummage.Ecto.rummage(rummage, repo: Aba.Repo, per_page: 2, search: Rummage.Ecto.Hook.Search, sort: Rummage.Ecto.Hook.Sort, paginate: Rummage.Ecto.Hook.Paginate)


# params = %{"q" => %{"name_and_location_like" => "elixir"}, "s" => "inserted_at+asc", "page" => 0, "per_page" => 2}
# params = %{"s" => "inserted_at+asc", "page" => 0, "per_page" => 2}
# Turbo.Ecto.turbo(Turbo.Ecto.Schemas.Aba.Services.Service, params)
# Turbo.Ecto.turboq(Aba.Services.Service, params)

# %{repo: nil,
#           per_page: 10,
#           search: Rummage.Ecto.Hook.Search,
#           sort: Rummage.Ecto.Hook.Sort,
#           paginate: Rummage.Ecto.Hook.Paginate

end
