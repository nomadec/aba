defmodule AbaWeb.ServiceView do
  use AbaWeb, :view
  alias AbaWeb.ServiceView

  def render("index.json", %{services: services, paginate: paginate, sort: sort} = data) do
    %{data: Map.put(%{paginate: paginate, sort: sort}, :services, render_many(services, ServiceView, "service.json"))}
  end
  def render("index.json", %{list: services, total_pages: total_pages, total_count: total_count, filters: filters} = data) do
    # %{data: []}
    %{data: Map.put(%{paginate: %{total_pages: total_pages, total_count: total_count}, filters: filters}, :services, render_many(services, ServiceView, "service.json"))}
  end

  def render("show.json", %{service: service}) do
    %{data: render_one(service, ServiceView, "service.json")}
  end

  def render("service.json", %{service: service}) do
    %{
      id: service.id,
      name: service.name,
      category: service.category,
      user_id: service.user_id,
      price: service.price,
      duration: service.duration,
      location: service.location,
      description: service.description,
      image: service.image,
      provider_first_name: service.user.first_name,
      provider_last_name: service.user.last_name
    }
  end
end
