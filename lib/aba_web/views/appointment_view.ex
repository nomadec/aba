defmodule AbaWeb.AppointmentView do
  use AbaWeb, :view
  alias AbaWeb.AppointmentView

  def render("index.json", %{appointments: appointments}) do
    %{data: render_many(appointments, AppointmentView, "appointment.json")}
  end

  def render("show.json", %{appointment: appointment}) do
    %{data: render_one(appointment, AppointmentView, "appointment.json")}
  end

  def render("appointment.json", %{appointment: appointment}) do
    %{id: appointment.id,
      date_time: appointment.date_time,
      paid: appointment.paid}
  end
end
