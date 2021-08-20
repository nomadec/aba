defmodule AbaWeb.PowEmailConfirmation.MailerView do
  use AbaWeb, :mailer_view

  def subject(:email_confirmation, _assigns), do: "Confirm your email address"
end
