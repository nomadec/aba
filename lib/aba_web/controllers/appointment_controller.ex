defmodule AbaWeb.AppointmentController do
  use AbaWeb, :controller

  alias Aba.Appointments
  alias Aba.Appointments.Appointment

  action_fallback AbaWeb.FallbackController

  def index(conn, _params) do
    appointments = Appointments.list_appointments()
    render(conn, "index.json", appointments: appointments)
  end

  def create(conn, %{"appointment" => appointment_params}) do
    current_user = Pow.Plug.current_user(conn)
    appointment_params = Map.put(appointment_params, "user_id", current_user.id)
    with {:ok, %Appointment{} = appointment} <- Appointments.create_appointment(appointment_params) do
      conn
      |> put_status(:created)
      # |> put_resp_header("location", Routes.appointment_path(conn, :show, appointment))
      |> render("show.json", appointment: appointment)
    end
  end

  def show(conn, %{"id" => id}) do
    appointment = Appointments.get_appointment!(id)
    render(conn, "show.json", appointment: appointment)
  end

  def update(conn, %{"id" => id, "appointment" => appointment_params}) do
    current_user = Pow.Plug.current_user(conn)
    appointment = Appointments.get_appointment!(id)
    case appointment.user_id === current_user.id do
      true ->
        with {:ok, %Appointment{} = appointment} <- Appointments.update_appointment(appointment, appointment_params) do
          render(conn, "show.json", appointment: appointment)
        end
      false ->
        conn
        |> put_status(401)
        |> json(%{data: %{code: 401, message: "No rights"}})
        |> halt()
    end
  end

  def delete(conn, %{"id" => id}) do
    current_user = Pow.Plug.current_user(conn)
    appointment = Appointments.get_appointment!(id)
    case appointment.user_id === current_user.id do
      true ->
        with {:ok, %Appointment{}} <- Appointments.delete_appointment(appointment) do
          send_resp(conn, :no_content, "")
        end
      false ->
        # send_resp(conn, 401, "No rights")
        # Controller.json(%{data: %{code: 401, message: "No rights"}})
        conn
        |> put_status(401)
        |> json(%{data: %{code: 401, message: "No rights"}})
        |> halt()
    end
  end
end
