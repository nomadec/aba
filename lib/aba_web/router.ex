defmodule AbaWeb.Router do
  use AbaWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, {AbaWeb.LayoutView, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug Pow.Plug.Session, otp_app: :aba
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug AbaWeb.APIAuthPlug, otp_app: :aba
  end

  pipeline :api_protected do
    plug Pow.Plug.RequireAuthenticated, error_handler: AbaWeb.APIAuthErrorHandler
  end

  scope "/api/v1", AbaWeb.API.V1, as: :api_v1 do
    pipe_through :api

    resources "/registration", RegistrationController, singleton: true, only: [:create]
    resources "/session", SessionController, singleton: true, only: [:create]
    post "/session/renew", SessionController, :renew
  end

  scope "/api/v1", AbaWeb.API.V1, as: :api_v1 do
    pipe_through [:api, :api_protected]

    resources "/session", SessionController, singleton: true, only: [:delete]

    # Your protected API endpoints here
  end

  scope "/", AbaWeb do
    pipe_through :browser

    live "/*path", PageLive, :index
  end


  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser
      live_dashboard "/dashboard", metrics: AbaWeb.Telemetry
    end
  end
end
