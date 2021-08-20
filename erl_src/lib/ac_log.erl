-module(ac_log).

-export([init/0]).

%%====================================================================
%% API functions
%%====================================================================
init() ->
    logger:set_primary_config(level, debug),
    add_handlers().

add_handlers() ->
    ok = add_handler(info),
    ok = add_handler(warning),
    ok = add_handler(error).

add_handler(LogLevel) ->
    HandlerID = erlang:list_to_atom(erlang:atom_to_list(LogLevel) ++ "_handler"),
    Mod = logger_disk_log_h,
    Config = #{
        level => LogLevel,
        config => handler_config(LogLevel),
        burst_limit_enable => false,
        formatter => handler_formatter(),
        filter_default => stop,
        filters => handler_filters(LogLevel)
    },
    ok = logger:add_handler(HandlerID, Mod, Config).

handler_config(LogLevel) ->
    File = "./logs/" ++ erlang:atom_to_list(LogLevel) ++ "/" ++ erlang:atom_to_list(LogLevel) ++ ".log",
    #{
        file => File,
        type => wrap,
        max_no_files => 40,
        max_no_bytes => 52428800
    }.

handler_formatter() ->
    {logger_formatter, #{
        legacy_header => true,
        single_line => false
    }}.

handler_filters(LogLevel) ->
    FilterID = erlang:list_to_atom(erlang:atom_to_list(LogLevel) ++ "_only"),
    [{FilterID, {fun logger_filters:level/2, {log, eq, LogLevel}}}].

%%====================================================================
%% Internal functions
%%====================================================================
