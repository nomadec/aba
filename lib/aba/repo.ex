defmodule Aba.Repo do
  use Ecto.Repo,
    otp_app: :aba,
    adapter: Ecto.Adapters.Postgres
end
