# RTV USA AGD
Online store with electronics and household appliances, made with Rails and React
![screenshot](https://github.com/Compass-Studios/rtv-usa-agd/assets/70489677/8d2392b0-a6f2-48bb-bbc3-682c1bb3e8ab)

## Development
0. Install [Ruby 3.2.2](https://www.ruby-lang.org/en/documentation/installation/), Node.js and a `vips` package (or `vips-tools`, or `libvips` depending on your Linux distribution. I have no idea about Windows), and `postgresql-devel` (or `libpq-dev` on debain-based distros)  
   Set up a PostgreSQL database
1. Clone the repository
2. Export required environment variables: `DATABASE_HOST`, `DATABASE_NAME`, `DATABASE_USER`, `DATABASE_PASSWORD`, and optionally `DATABASE_PORT`
3. Run the following snippet from the repository root to install dependencies and run database migrations, and populate DB with example data
```sh
bundle install
npm --prefix frontend install
rails db:migrate
rails db:seed
```
4. Start the development server by running `bin/dev`. It will start both the Rails and Vite dev servers. If you're on Windows, good luck with that, because I have no idea how to do it. Try WSL, or smthg, idk  
   Alternatively, you can start Vite and Rails separately, with `npm --prefix frontend run dev` and `rails s`.

### Running backend in Docker
0. If you want to run it on a Windows host, you have to install [Docker Desktop](https://docs.docker.com/desktop/install/windows-install/).  
   If using Linux or WSL, you can install [Docker Engine](https://docs.docker.com/engine/install/#server) itself. Choose the distro you're using, and follow instructions to install Docker.
1. After you're done installing Docker, open the terminal (either Powershell or Linux terminal, depending on your installation type). Navigate to the project root and run the following commands to build a Docker image of a project, run database migrations and populate DB with example data:
```shell
docker compose build
docker compose run backend rails db:migrate
docker compose run backend rails db:seed
```
> **Note**  
> If docker cli requires you to use sudo, follow these instructions to add your user to the docker group:
> https://docs.docker.com/engine/install/linux-postinstall/

2. To start the backend container, run the following command:
```shell
docker compose up
```

3. Keep in mind that every time backend code is updated, you have to rebuild the container and apply new migrations.

### API Documentation
In your IDE open the file [openapi.yaml](openapi.yaml) and install the OpenAPI Specification plugin from JetBrains
![screenshot](https://cdn.discordapp.com/attachments/969317854635769929/1091670517859242014/image.png)

### Using admin panel
Just go to http://localhost:3000/admin and log in using an admin account

> **Note**  
> If you ran `rails db:seed`, it generated a default admin user with email `admin@rtv-usa-agd.com` and password `admin`

#### Creating admin users
1. If you want to create and admin user, run `rails c` to get interactive Rails console  
   If backend is run inside a Docker container, use `docker compose run backend rails c` instead.
2. Paste the following snippet, replace the values, and press enter
```rb
AdminUser.create!(email: 'admin@rtv-usa-agd.com', password: 'admin')
```
3. Type `exit` to exit the Rails console

## Running in production
Firstly, you need to build the frontend. Clone this repository and navigate to the frontend subdirectory. Fill the `.env` file, like in this example:
```sh
VITE_API_URL="https://your-domain.com/api"
VITE_API_DOMAIN="https://your-domain.com"
```
Then run `npm run build`. The built files are contained in a `dist` directory. They will be needed later.

On your server, create a new directory. Inside, create a docker-compose.yml file, and pase the following contents, replacing `HOSTNAME`, `RAILS_MASTER_KEY`, and `SECRET_KEY_BASE` with the apropriate values.
```yml
version: '3.3'

services:
  backend:
    image: ghcr.io/compass-studios/rtv-usa-agd-backend:latest
    restart: always
    environment:
      DATABASE_HOST: db
      DATABASE_NAME: rtv-usa-agd
      DATABASE_USER: rtv-usa-agd
      DATABASE_PASSWORD: 'password'
      RAILS_ENV: production
      RAILS_RELATIVE_URL_ROOT: '/api'
      RAILS_LOG_TO_STDOUT: true
      HOSTNAME: 'your-domain.com'
      RAILS_SERVE_STATIC_FILES: true
      # Generate a secret with `rails secret | cut -c-32` inside the container
      RAILS_MASTER_KEY: paste-the-master-key
      # Same here, but with only `rails secret`
      SECRET_KEY_BASE: paste-the-secret-key
    ports:
      - '127.0.0.1:3000:3000'
    volumes:
      - ./data/storage:/app/storage
    depends_on:
      - db
  db:
    image: postgres:15-alpine
    restart: always
    environment:
      POSTGRES_USER: rtv-usa-agd
      POSTGRES_PASSWORD: password
      POSTGRES_DB: rtv-usa-agd
    volumes:
        - ./data/db:/var/lib/postgresql/data
```

Then start the backend and database containers with `docker compose up -d`

Next up, copy the previously built frontend files to a folder that could be served by nginx. I prefer it being in the same directory as my docker compose file.

Now it's time to configure Nginx to serve our frontend, and proxy our backend. Assuming you already have Nginx working, create a file (lets say, `rtv-usa-agd`) in `/etc/nginx/sites-available`, and paste the following contents, replacing `/path/to/your/frontend` with, well, a path to your built frontend:
```nginx
server {
    server_name your-domain.com;

    location /api {
        proxy_pass http://127.0.0.1:3000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /admin/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        root      /path/to/your/frontend;
        index     index.html;
        try_files $uri /index.html;
    }

    listen 80 http2;
    listen [::]:80 http2;

    client_max_body_size 1024M;
}
```

Now link the file to the sites-enabled folder
```sh
sudo ln -s /etc/nginx/sites-available/rtv-usa-agd /etc/nginx/sites-enabled/rtv-usa-agd
```
And reload Nginx
```sh
sudo systemctl reload nginx
```

And that's it! Now you should be able to access the RTV USA AGD website on your domain, and the admin panel on `/admin`.
