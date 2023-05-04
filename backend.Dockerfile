FROM ruby:3.2.2-slim

RUN apt update \
    && apt install -y make gcc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

VOLUME ["/data"]
ENV DATABASE_URL "../data/rtv-usa-agd.sqlite3"
EXPOSE 3000
CMD bundle exec rails s -b 0.0.0.0
