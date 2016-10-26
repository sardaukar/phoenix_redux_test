# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :phoenix_react_redux_sample,
  ecto_repos: [PhoenixReactReduxSample.Repo]

# Configures the endpoint
config :phoenix_react_redux_sample, PhoenixReactReduxSample.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "7oj0NLtU1zBcfzSeJKnuWe1hTrUlVT7H17LQArEWYa2RRlJA2F+6FVaOwBNMSCeK",
  render_errors: [view: PhoenixReactReduxSample.ErrorView, accepts: ~w(html json)],
  pubsub: [name: PhoenixReactReduxSample.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
