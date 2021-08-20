-module(ac_client_rest).
-behaviour(gen_server).

-export([start/1, stop/1]).
-export([req/1]).

-export([start_link/1]).
-export([init/1, terminate/2, code_change/3, handle_call/3, handle_cast/2, handle_info/2]).

-define(MAX_RETRY, 10).

%%====================================================================
%% API functions
%%====================================================================
start(#{url := Url, port := Port} = Conn) ->
    start(#{url := Url, port := Port} = Conn, 1).
start(#{url := Url, port := Port} = Conn, Attempt) ->
    {ok, ConnPid} = open_gun(Url, Port, maps:get(options, Conn, undefined)),
    MRef = erlang:monitor(process, ConnPid),
    Conn1 = Conn#{conn_pid => ConnPid, mref => MRef},
    case gun:await_up(ConnPid, 10000, MRef) of
        {ok, Protocol} ->
            Conn2 = Conn1#{
                protocol => Protocol,
                http_status => up
            },
            {ok, Conn2};
        {error, timeout} when Attempt =< ?MAX_RETRY ->
            logger:error("Mod: ~p, Fun: ~p, Error: ~p, Attempt: ~p Conn: ~p", [?MODULE, ?FUNCTION_NAME, timeout, Attempt, Conn1]),
            {ok, stopped} = stop(Conn1),
            start(Conn1#{prev_conn_pid => ConnPid}, Attempt + 1);
        {error, timeout} when Attempt > ?MAX_RETRY ->
            logger:error("Mod: ~p, Fun: ~p, Error: ~p, Conn: ~p", [?MODULE, ?FUNCTION_NAME, timeout, Conn1]),
            {error, timeout}
    end.

open_gun(Url, Port, undefined) ->
    gun:open(Url, Port);
open_gun(Url, Port, Options) ->
    gun:open(Url, Port, Options).

%%====================================================================
stop(#{conn_pid := ConnPid, mref := MRef} = _Conn) ->
    true = erlang:demonitor(MRef, [flush]),
    gun:shutdown(ConnPid),
    {ok, stopped}.

%%====================================================================
req(#{method := get, conn_pid := ConnPid, endpoint := Endpoint, head := Head} = Conn) ->
    StreamRef = gun:get(ConnPid, Endpoint, Head),
    req(StreamRef, Conn);
req(#{method := get, conn_pid := ConnPid, endpoint := Endpoint} = Conn) ->
    StreamRef = gun:get(ConnPid, Endpoint),
    req(StreamRef, Conn);

req(#{method := post, conn_pid := ConnPid, endpoint := Endpoint, head := Head} = Conn) ->
    StreamRef = gun:post(ConnPid, Endpoint, Head, maps:get(body, Conn, [])),
    req(StreamRef, Conn);

req(#{method := put, conn_pid := ConnPid, endpoint := Endpoint, head := Head} = Conn) ->
    StreamRef = gun:put(ConnPid, Endpoint, Head, maps:get(body, Conn, [])),
    req(StreamRef, Conn);

req(#{method := delete, conn_pid := ConnPid, endpoint := Endpoint, head := Head} = Conn) ->
    StreamRef = gun:delete(ConnPid, Endpoint, Head),
    req(StreamRef, Conn).

req(StreamRef, Conn) ->
    {ok, _Conn1} = wait_for_response(Conn#{stream_ref => StreamRef}).

%%====================================================================
%% GenServer functions
%%====================================================================
start_link(#{id := Server} = State) ->
    gen_server:start_link({local, Server}, ?MODULE, State, []).

init(#{handler := Handler} = State) ->
    erlang:process_flag(trap_exit, true),
    {ok, NewState} = Handler:init_client(State),
    self() ! connect_to_server,
    {ok, NewState}.

terminate(_Reason, _State) ->
    ok.

code_change(_OldVsn, State, _Extra) ->
    NewState = State,
    {ok, NewState}.

%%====================================================================
handle_call({get, Req}, _From, State) ->
    Reply = req(maps:merge(Req#{method => get}, State)),
    {reply, Reply, State};

handle_call({post, Req}, _From, State) ->
    Reply = req(maps:merge(Req#{method => post}, State)),
    {reply, Reply, State};

handle_call(Req, From, State) ->
    logger:error("Mod: ~p, Fun: ~p, Error: Unknown Call received: ~p, from: ~p, with State: ~p", [?MODULE, ?FUNCTION_NAME, Req, From, State]),
    Reply = {error, "Unknown Call Req"},
    {reply, Reply, State}.

handle_cast(Req, State) ->
    logger:error("Mod: ~p, Fun: ~p, Error: Unknown Cast Req received: ~p, with State: ~p", [?MODULE, ?FUNCTION_NAME, Req, State]),
    {noreply, State}.

%%====================================================================
handle_info(connect_to_server, State) ->
    {ok, NewState} = start(State),
    {noreply, NewState};

handle_info(Msg, State) -> 
    logger:error("Mod: ~p, Fun: ~p, Error: Unknown Msg received: ~p, with State: ~p", [?MODULE, ?FUNCTION_NAME, Msg, State]),
    {noreply, State}.

%%====================================================================
%% Internal functions
%%====================================================================
wait_for_response(#{conn_pid := ConnPid, mref := MRef, stream_ref := StreamRef} = Conn) ->
    Timeout = maps:get(timeout, Conn, 60000),
    case gun:await(ConnPid, StreamRef, Timeout, MRef) of
        {response, fin, _Status, _Headers} ->
            {ok, Conn#{response => no_data}};
        {response, nofin, Status, Headers} ->
            {ok, Body} = gun:await_body(ConnPid, StreamRef, Timeout, MRef),
            {ok, Conn#{response => Body, headers => Headers, resp_status => Status}};
        {error, Reason} ->
            logger:error("Mod: ~p, Fun: ~p, Error: ~p, for Conn: ~p", [?MODULE, ?FUNCTION_NAME, Reason, Conn]),
            {ok, Conn#{response => Reason}}
    end.
