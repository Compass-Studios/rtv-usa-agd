FROM ruby:3.2.2-slim

RUN apt update \
    && apt install -y make gcc g++ libvips-tools libpq-dev --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY Gemfile Gemfile.lock ./
RUN bundle install \
    && apt remove -y make gcc g++ \
    && apt autoremove -y

COPY . .

VOLUME ["/data"]
EXPOSE 3000
CMD bundle exec rails s -b 0.0.0.0
