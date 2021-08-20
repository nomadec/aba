defmodule AbaWeb.PowResetPassword.MailerView do
  use AbaWeb, :mailer_view

  def subject(:reset_password, _assigns), do: "Reset password link"
end
