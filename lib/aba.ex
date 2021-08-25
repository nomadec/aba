defmodule Aba do
  @moduledoc """
  Aba keeps the contexts that define your domain
  and business logic.

  Contexts are also responsible for managing your data, regardless
  if it comes from the database, an external API or others.
  """

  # mix phx.gen.json Users User users email:string password_hash:string first_name:string last_name:string role:string email_confirmation_token:string email_confirmed_at:utc_datetime unconfirmed_email:string
  # mix phx.gen.json Services Service services name:string user_id:uuid price:float duration:integer location:string description:string

  # mix phx.gen.json Appointments Appointment appointments user_id:references:users service_id:references:services date_time:utc_datetime paid:boolean
  # mix phx.gen.json Comments Comment comments user_id:references:users service_id:references:services content:text

  # mix phx.gen.json Categories Category categories name:references:users service_id:references:services content:text

  def attach_owner(conn, params) do
    current_user = Pow.Plug.current_user(conn)
    Map.put(params, "user_id", current_user.id)
  end

  def verify_ownership(conn, record) do
    current_user = Pow.Plug.current_user(conn)
    record.user_id === current_user.id
  end

end
