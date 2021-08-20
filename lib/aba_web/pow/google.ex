defmodule Aba.OAuth2.Google do

  # Instructions on how to setup for new email account:
  # https://blog.mailtrap.io/send-emails-with-gmail-api/
  # download the confgi.json and update the gmail_client_config.json
  # also update here @client_id, @client_secret
  # then run Blog.OAuth2.Google.make_authorize_url and get URL
  # open URL in browser and get the code
  # update the @code here and invoke new user registration so that new access token is requested
  # Note: the code obrained earlier can not be used twice and has limited time to use


  # for admin@altbot.tech
  @client_id "284855641071-0bkm5fb481asmr7pm858i21emam54tup.apps.googleusercontent.com"
  @client_secret "fDcihXYLiJxocsBpOy9iDZ9A"
  @code "4/0AY0e-g63Lyf-nfUEGs6a-khs4aOiMR6LIWDoonqRsCcRcGYMnVKPhJqPKwoQFmUxftkEaA"

  # https://accounts.google.com/o/oauth2/auth?client_id=97700630539-m28pvkt6g78deeb3uok1e53roa7pdonq.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A4000&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.send&access_type=offline&prompt=consent
  def make_authorize_url do
    config = %{
      client_id:      @client_id,
      client_secret:  @client_secret,

      authorize_url:  "https://accounts.google.com/o/oauth2/auth",
      token_url:      "https://accounts.google.com/o/oauth2/token",
      redirect_uri:   "http://localhost:4000",

      scope:          "https://www.googleapis.com/auth/gmail.send",
      prompt:         "consent",
      access_type:    "offline",
      response_type:  "code"
    }

    query_params = [
      client_id:      config.client_id,
      redirect_uri:   config.redirect_uri,
      response_type:  config.response_type,
      scope:          config.scope,
      access_type:    config.access_type,
      # state:          "some unique hash",
      prompt:         config.prompt
    ]
    |> URI.encode_query
    config.authorize_url <> "?" <> query_params
  end

  def get_access_token, do: get_access_token(read_token())

  def get_access_token({:ok, token}) do
    {:ok, expires_at, 0} = DateTime.from_iso8601(token["expires_at"])
    case DateTime.compare(expires_at, DateTime.utc_now()) do
      :gt ->
        {:ok, token}
      _ ->
        maybe_refresh_access_token()
    end
  end
  def get_access_token({:error, _reason}), do: maybe_refresh_access_token()

  def maybe_refresh_access_token(), do: maybe_refresh_access_token(read_oauth2_config())
  def maybe_refresh_access_token(%{"web" => %{"refresh_token" => _refresh_token} = client_config} = _config), do: refresh_access_token(client_config)
  def maybe_refresh_access_token(%{"web" => client_config} = _config), do: issue_new_token(client_config)

  def issue_new_token(config) do
    config = %{
      client_id:      @client_id,
      client_secret:  @client_secret,
      authorize_url:  "https://accounts.google.com/o/oauth2/auth",
      token_url:      "https://oauth2.googleapis.com/token",
      redirect_uri:   "http://localhost:4000",

      scope:          "https://www.googleapis.com/auth/gmail.send",
      prompt:         "consent",
      access_type:    "offline",
      response_type:  "code",

      code:           @code
    }

    headears = [
      {<<"content-type">>, <<"application/x-www-form-urlencoded">>},
      {<<"accept">>, <<"application/json">>}
    ]
    body_params = [
      client_id: @client_id,
      client_secret: @client_secret,
      code: @code,
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:4000"
    ]
    body = URI.encode_query(body_params)
    conn = %{
      url:      'oauth2.googleapis.com',
      port:     443,
      endpoint: "/token",
      method:   :post,
      head:     headears,
      body:     body,
      options:  %{:protocols => [:http]}
    }
    {:ok, conn} = :ac_client_rest.start(conn)
    {:ok, conn} = :ac_client_rest.req(conn)
    {:ok, :stopped} = :ac_client_rest.stop(conn)
    verify_response(conn.response)
  end


  def refresh_access_token(config) do
    headears = [
      {<<"content-type">>, <<"application/x-www-form-urlencoded">>},
      {<<"accept">>, <<"application/json">>}
    ]
    body_params = [
      client_id: config["client_id"],
      client_secret: config["client_secret"],
      refresh_token: config["refresh_token"],
      grant_type: "refresh_token"
    ]
    body = URI.encode_query(body_params)
    conn = %{
      url:      'oauth2.googleapis.com',
      port:     443,
      endpoint: "/token",
      method:   :post,
      head:     headears,
      body:     body,
    }
    {:ok, conn} = :ac_client_rest.start(conn)
    {:ok, conn} = :ac_client_rest.req(conn)
    {:ok, :stopped} = :ac_client_rest.stop(conn)
    verify_response(conn.response)
  end

  def verify_response({:error, :no_data}), do: {:error, :no_data}
  def verify_response(token) do
    token = Jason.decode!(token)
    token = add_expires_at(token)
    :ok = store_token(token)
    {:ok, token}
  end

  def read_oauth2_config do
    config = Application.fetch_env!(:aba, Aba.OAuth2.Google)
    path = Path.join([File.cwd!, Keyword.get(config, :data_dir), "/gmail_client_config.json"])
    oauth2_config = File.read!(path)
    Jason.decode!(oauth2_config)
  end

  def store_token(data) do
    content = Jason.encode!(data)
    config = Application.fetch_env!(:aba, Aba.OAuth2.Google)
    path = Path.join([File.cwd!, Keyword.get(config, :data_dir), "/gmail_client_token.json"])
    File.write(path, content)
  end

  def read_token() do
    config = Application.fetch_env!(:aba, Aba.OAuth2.Google)
    path = Path.join([File.cwd!, Keyword.get(config, :data_dir), "/gmail_client_token.json"])
    case File.read(path) do
      {:error, :enoent} ->
        {:error, :enoent}
      {:ok, data} ->
        Jason.decode(data)
    end
  end

  defp add_expires_at(token) do
    expires_at = DateTime.add(DateTime.utc_now(), token["expires_in"], :second)
    Map.put(token, "expires_at", DateTime.to_iso8601(expires_at))
  end

end
