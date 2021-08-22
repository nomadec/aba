defmodule AbaWeb.AppointmentControllerTest do
  use AbaWeb.ConnCase

  alias Aba.Appointments
  alias Aba.Appointments.Appointment

  @create_attrs %{
    date_time: "2010-04-17T14:00:00Z",
    paid: true
  }
  @update_attrs %{
    date_time: "2011-05-18T15:01:01Z",
    paid: false
  }
  @invalid_attrs %{date_time: nil, paid: nil}

  def fixture(:appointment) do
    {:ok, appointment} = Appointments.create_appointment(@create_attrs)
    appointment
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all appointments", %{conn: conn} do
      conn = get(conn, Routes.appointment_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create appointment" do
    test "renders appointment when data is valid", %{conn: conn} do
      conn = post(conn, Routes.appointment_path(conn, :create), appointment: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.appointment_path(conn, :show, id))

      assert %{
               "id" => id,
               "date_time" => "2010-04-17T14:00:00Z",
               "paid" => true
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.appointment_path(conn, :create), appointment: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update appointment" do
    setup [:create_appointment]

    test "renders appointment when data is valid", %{conn: conn, appointment: %Appointment{id: id} = appointment} do
      conn = put(conn, Routes.appointment_path(conn, :update, appointment), appointment: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.appointment_path(conn, :show, id))

      assert %{
               "id" => id,
               "date_time" => "2011-05-18T15:01:01Z",
               "paid" => false
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, appointment: appointment} do
      conn = put(conn, Routes.appointment_path(conn, :update, appointment), appointment: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete appointment" do
    setup [:create_appointment]

    test "deletes chosen appointment", %{conn: conn, appointment: appointment} do
      conn = delete(conn, Routes.appointment_path(conn, :delete, appointment))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.appointment_path(conn, :show, appointment))
      end
    end
  end

  defp create_appointment(_) do
    appointment = fixture(:appointment)
    %{appointment: appointment}
  end
end
