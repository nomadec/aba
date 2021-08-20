defmodule AbaWeb.UserView do
  use AbaWeb, :view
  alias AbaWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      email: user.email,
      password_hash: user.password_hash,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      email_confirmation_token: user.email_confirmation_token,
      email_confirmed_at: user.email_confirmed_at,
      unconfirmed_email: user.unconfirmed_email}
  end
end
