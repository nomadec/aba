defmodule PowAPICustomPlug.Phoenix.ControllerCallbacks do

  use Pow.Extension.Phoenix.ControllerCallbacks.Base

  # PowRegistration related flow
  def before_respond(Pow.Phoenix.RegistrationController, :create, {:ok, user, conn}, _config) do
    conn = Plug.Conn.put_status(conn, 200)
    {:ok, user, conn}
  end
  # def before_respond(Pow.Phoenix.RegistrationController, :create, {:error, changeset, conn}, _config) do
  #   :ok = :ac_users.log(:error, "Pow.Phoenix.RegistrationController, :create", {:error, changeset, conn})
  #   {:error, changeset, conn}
  # end
  # def before_respond(Pow.Phoenix.RegistrationController, :update, {:ok, user, conn}, _config) do
  #   {:ok, _} = :ac_users.update(user)
  #   {:ok, user, conn}
  # end


  # PowEmailConfirmation related flow
  def before_respond(PowEmailConfirmation.Phoenix.ConfirmationController, :show, {:ok, user, conn}, _config) do
    conn = Plug.Conn.put_status(conn, 200)
    {:ok, user, conn}
  end

  # PowSession related flow
  def before_respond(Pow.Phoenix.SessionController, :create, {:ok, conn}, _config) do
    conn = Plug.Conn.put_status(conn, 200)
    {:ok, conn}
  end
  def before_respond(Pow.Phoenix.SessionController, :create, {:error, conn}, _config) do
    conn = Plug.Conn.put_status(conn, 401)
    {:error, conn}
  end
  def before_respond(Pow.Phoenix.SessionController, :delete, {:ok, conn}, _config) do
    conn = Plug.Conn.put_status(conn, 200)
    {:ok, conn}
  end


  # PowResetPassword related flow
  def before_respond(PowResetPassword.Phoenix.ResetPasswordController, :create, {:ok, data, conn}, _config) do
    conn = Plug.Conn.put_status(conn, 200)
    {:ok, data, conn}
  end
  def before_respond(PowResetPassword.Phoenix.ResetPasswordController, :update, {:ok, user, conn}, _config) do
    conn = Plug.Conn.put_status(conn, 200)
    {:ok, user, conn}
  end

  # PowInvitation related flow
  # def before_respond(PowInvitation.Phoenix.InvitationController, :new, {:ok, changeset, conn}, _config) do
  #   {:ok, changeset, conn}
  # end
  # def before_respond(PowInvitation.Phoenix.InvitationController, :create, {:ok, user, conn}, _config) do
  #   {:ok, _} = :ac_users.invite_user(user)
  #   {:ok, user, conn}
  # end
  # def before_respond(PowInvitation.Phoenix.InvitationController, :edit, {:ok, changeset, conn}, _config) do
  #   {:ok, changeset, conn}
  # end
  # def before_respond(PowInvitation.Phoenix.InvitationController, :update, {:ok, user, conn}, _config) do
  #   {:ok, _} = :ac_users.accept_invite(user)
  #   {:ok, user, conn}
  # end

end
