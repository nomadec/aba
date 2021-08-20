defmodule Aba.UsersTest do
  use Aba.DataCase

  alias Aba.Users

  describe "users" do
    alias Aba.Users.User

    @valid_attrs %{email: "some email", email_confirmation_token: "some email_confirmation_token", email_confirmed_at: "2010-04-17T14:00:00Z", first_name: "some first_name", last_name: "some last_name", password_hash: "some password_hash", role: "some role", unconfirmed_email: "some unconfirmed_email"}
    @update_attrs %{email: "some updated email", email_confirmation_token: "some updated email_confirmation_token", email_confirmed_at: "2011-05-18T15:01:01Z", first_name: "some updated first_name", last_name: "some updated last_name", password_hash: "some updated password_hash", role: "some updated role", unconfirmed_email: "some updated unconfirmed_email"}
    @invalid_attrs %{email: nil, email_confirmation_token: nil, email_confirmed_at: nil, first_name: nil, last_name: nil, password_hash: nil, role: nil, unconfirmed_email: nil}

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Users.create_user()

      user
    end

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert Users.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Users.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = Users.create_user(@valid_attrs)
      assert user.email == "some email"
      assert user.email_confirmation_token == "some email_confirmation_token"
      assert user.email_confirmed_at == DateTime.from_naive!(~N[2010-04-17T14:00:00Z], "Etc/UTC")
      assert user.first_name == "some first_name"
      assert user.last_name == "some last_name"
      assert user.password_hash == "some password_hash"
      assert user.role == "some role"
      assert user.unconfirmed_email == "some unconfirmed_email"
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Users.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert {:ok, %User{} = user} = Users.update_user(user, @update_attrs)
      assert user.email == "some updated email"
      assert user.email_confirmation_token == "some updated email_confirmation_token"
      assert user.email_confirmed_at == DateTime.from_naive!(~N[2011-05-18T15:01:01Z], "Etc/UTC")
      assert user.first_name == "some updated first_name"
      assert user.last_name == "some updated last_name"
      assert user.password_hash == "some updated password_hash"
      assert user.role == "some updated role"
      assert user.unconfirmed_email == "some updated unconfirmed_email"
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Users.update_user(user, @invalid_attrs)
      assert user == Users.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Users.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Users.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Users.change_user(user)
    end
  end
end
