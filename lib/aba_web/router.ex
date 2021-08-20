defmodule AbaWeb.Router do
  use AbaWeb, :router
  use Pow.Phoenix.Router
  use Pow.Extension.Phoenix.Router,
    extensions: [PowResetPassword, PowEmailConfirmation]


  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, {AbaWeb.LayoutView, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug AbaWeb.APIAuthPlug, otp_app: :aba
  end

  pipeline :api_protected do
    plug Pow.Plug.RequireAuthenticated, error_handler: AbaWeb.APIAuthErrorHandler
  end


  scope "/api/v1", AbaWeb, as: :api_v1 do
    pipe_through [:api, :api_protected]

    resources "/users", UserController
  end

  scope "/", AbaWeb do
    pipe_through :browser

    live "/session/new", PageLive, :index
    live "/confirm-email/:id", PageLive, :index
    live "/reset-password/new", PageLive, :index
    live "/reset-password/:id", PageLive, :index
  end

  # scope "/", Pow.Phoenix.RegistrationController do
  scope "/" do
    pipe_through :browser

    get "/confirm_email/:id", PowEmailConfirmation.Phoenix.ConfirmationController, :show

    post "/reset_password", PowResetPassword.Phoenix.ResetPasswordController, :create
    get "/reset_password/:id", PowResetPassword.Phoenix.ResetPasswordController, :edit
    patch "/reset_password/:id", PowResetPassword.Phoenix.ResetPasswordController, :update
    put "/reset_password/:id", PowResetPassword.Phoenix.ResetPasswordController, :update

    pow_routes()
    pow_extension_routes()
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
