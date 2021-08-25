defmodule Aba.Comments.Comment do
  use Aba.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :content]}
  schema "comments" do
    belongs_to :user, Aba.Users.User
    belongs_to :service, Aba.Services.Service
    field :content, :string

    timestamps()
  end

  @doc false
  def changeset(comment, attrs) do
    comment
    |> cast(attrs, [:content, :user_id, :service_id])
    |> validate_required([:content, :user_id, :service_id])
  end
end
