defmodule Aba.Services.Service do
  use Aba.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :name, :price, :duration, :location, :description]}
  schema "services" do
    field :name, :string
    field :category, :string
    field :duration, :integer
    field :price, :float
    field :location, :string
    field :description, :string
    field :image, :string
    belongs_to :user, Aba.Users.User
    has_many :appointments, Aba.Appointments.Appointment

    timestamps()
  end

  @doc false
  def changeset(service, attrs) do
    service
    |> cast(attrs, [:name, :category, :duration, :price, :location, :description, :image, :user_id])
    |> validate_required([:name, :category, :duration, :price, :location, :description, :image, :user_id])
  end

  def init_db do
    case Aba.Services.list_services do
      [] ->
        do_init_db()
      _ ->
        false;
    end
  end
  def do_init_db() do
    data = [
      %{
        name: "",
        price: 1.5,
        duration: 30,
        location: "",
        description: "",
        category: ""
      },


      %{"email" => "bado@email.com", "password" => "12345678", "password_confirmation" => "12345678", "first_name" => "B", "last_name" => "K", "role" => "guest"},
      %{"email" => "mike@email.com", "password" => "12345678", "password_confirmation" => "12345678", "first_name" => "M", "last_name" => "V", "role" => "guest"},
      %{"email" => "umid@email.com", "password" => "12345678", "password_confirmation" => "12345678", "first_name" => "U", "last_name" => "K", "role" => "guest"}
    ]

    Enum.map(data, fn user ->
      Hotelverse.Users.create(user)
      # Pow.Ecto.Context.create(user)
      # pow_create
      # Pow.Plug.create_user(%{private: %{}}, user)
    end)
  end

end
