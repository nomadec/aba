# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :aba,
  ecto_repos: [Aba.Repo]

# Configures the endpoint
config :aba, AbaWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "3aJg0gtwqIXDsumY0/YZfFYETWyb6m46uAyrnKRTPLlw043vu3KzXE8OXCdtdLa9",
  render_errors: [view: AbaWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Aba.PubSub,
  live_view: [signing_salt: "4KoJxzNw"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
