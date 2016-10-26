defmodule PhoenixReactReduxSample.PageController do
  use PhoenixReactReduxSample.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
