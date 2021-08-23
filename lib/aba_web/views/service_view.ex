defmodule AbaWeb.ServiceView do
  use AbaWeb, :view
  alias AbaWeb.ServiceView

  def render("index.json", %{services: services, paginate: paginate, sort: sort} = data) do
    %{data: Map.put(%{paginate: paginate, sort: sort}, :services, render_many(services, ServiceView, "service.json"))}
  end

  def render("show.json", %{service: service}) do
    %{data: render_one(service, ServiceView, "service.json")}
  end

  def render("service.json", %{service: service}) do
    %{id: service.id,
      name: service.name,
      user_id: service.user_id,
      price: service.price,
      duration: service.duration,
      location: service.location,
      description: service.description}
  end
end
