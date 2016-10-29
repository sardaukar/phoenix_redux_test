defmodule PhoenixReactReduxSample.CounterSocket do
  use Phoenix.Socket

  channel "counter:*", PhoenixReactReduxSample.CounterChannel

  transport :websocket, Phoenix.Transports.WebSocket

  def connect(_params, socket) do
    {:ok, socket}
  end

  def id(_socket), do: nil
end
