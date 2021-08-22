# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :aba,
  ecto_repos: [Aba.Repo],
  migration_primary_key: [name: :id, type: :binary_id]

# Configures the Search, Sort & Pagination


# Configures the endpoint
config :aba, AbaWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "3aJg0gtwqIXDsumY0/YZfFYETWyb6m46uAyrnKRTPLlw043vu3KzXE8OXCdtdLa9",
  render_errors: [view: AbaWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Aba.PubSub,
  live_view: [signing_salt: "4KoJxzNw"]

# Connfigure Pow for User Auth
config :aba, :pow,
  user: Aba.Users.User,
  repo: Aba.Repo,
  users_context: Aba.Users,
  extensions: [PowResetPassword, PowEmailConfirmation, PowAPICustomPlug],
  controller_callbacks: Pow.Extension.Phoenix.ControllerCallbacks,
  mailer_backend: AbaWeb.Pow.Mailer,
  web_mailer_module: AbaWeb,
  web_module: AbaWeb

# Configures the Swoosh Mailer client
config :aba, AbaWeb.Pow.Mailer,
  adapter: Swoosh.Adapters.Gmail
  # access_token: {:system, GMAIL_API_ACCESS_TOKEN}
config :aba, Aba.OAuth2.Google,
  data_dir: "/priv/gcp/"

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
