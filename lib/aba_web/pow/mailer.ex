defmodule AbaWeb.Pow.Mailer do
  use Pow.Phoenix.Mailer
  use Swoosh.Mailer, otp_app: :aba

  import Swoosh.Email

  require Logger

  @app_name "ABA"
  @email_address "admin@altbot.tech"

  @impl true
  # def cast(%{user: user, subject: subject, text: text, html: html, assigns: _assigns}) do
  #   # Build email struct to be used in `process/1`

  #   %{to: user.email, subject: subject, text: text, html: html}
  # end
  def cast(%{user: user, subject: subject, text: text, html: html}) do
    %Swoosh.Email{}
    |> from({@app_name, @email_address})
    |> to({"", user.email})
    |> bcc({"", @email_address})
    |> subject(subject)
    |> html_body(html)
    |> text_body(text)
  end

  @impl true
  # def process(email) do
  #   # Send email

  #   Logger.debug("E-mail sent: #{inspect email}")
  # end
  def process(email) do
    # An asynchronous process should be used here to prevent enumeration
    # attacks. Synchronous e-mail delivery can reveal whether a user already
    # exists in the system or not.
    {:ok, gmail_access_token} = Aba.OAuth2.Google.get_access_token

    Task.start(fn ->
      email
      |> deliver(access_token: gmail_access_token["access_token"])
      |> maybe_log_response()
    end)

    :ok
  end

  defp maybe_log_response({:error, reason}) do
    Logger.error("Mailer backend failed with: #{inspect(reason)}")
  end

  defp maybe_log_response({:ok, response}), do: {:ok, response}
end
