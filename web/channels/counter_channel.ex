defmodule PhoenixReactReduxSample.CounterChannel do
  require Logger

  use PhoenixReactReduxSample.Web, :channel

  def join("counter:" <> counter_id, _params, socket) do
    {:ok, assign(socket, :counter_id, counter_id) }
  end

  def handle_in("counter:async", params, socket) do
    Logger.info "got async counter msg"
    broadcast! socket, "counter:incrementFromServer", %{
      text: params["text"]
    }

    {:reply, :ok, socket}
  end
end
