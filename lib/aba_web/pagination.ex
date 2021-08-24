defmodule AbaWeb.Pagination do
  import Ecto.Query
  alias Aba.Repo

  def query(query, page, per_page: per_page) when is_binary(page) do
    query(query, String.to_integer(page), per_page: String.to_integer(per_page))
  end

  def query(query, page, per_page: per_page) when is_integer(page) and is_integer(per_page) do
    query
    |> limit(^(per_page + 1))
    |> offset(^(per_page * (page - 1)))
    |> Repo.all()
  end

  def page(query, page, per_page: per_page) when is_binary(page) do
    query(query, String.to_integer(page), per_page: per_page)
  end

  def page(query, page, per_page: per_page) when is_integer(page) do
    results = query(query, page, per_page: per_page)
    has_next = length(results) > per_page
    has_prev = page > 1
    count = Repo.one(from(t in subquery(query), select: count("*")))

    %{
      has_next_page: has_next,
      has_prev_page: has_prev,
      prev_page: page - 1,
      current_page: page,
      next_page: page + 1,
      total_pages: ceil(count / per_page),
      first_count: (page - 1) * per_page + 1,
      last_count: Enum.min([page * per_page, count]),
      total_count: count,
      list: Enum.slice(results, 0, per_page)
    }
  end

  # alias Aba.Repo
  # alias Aba.Comments.Comment
  # user_id = "98b13c6a-e535-432a-820f-c064175192ab"
  # Comment |> where(user_id: ^user_id) |> Repo.all

  # query = Comment |> where(user_id: ^user_id)
  # AbaWeb.Pagination.page(query, 1, per_page: 3)


end
