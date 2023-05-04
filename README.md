# RTV USA AGD
Rails + React

## Development
0. Install [Ruby 3.2.1](https://www.ruby-lang.org/en/documentation/installation/) and Node.js
1. Clone the repository
2. Run the following snippet from the repository root to install dependencies and run database migrations
```sh
bundle install
npm --prefix frontend install
rails db:migrate
```
3. Start the development server by running `bin/dev`. It will start both the Rails and Vite dev servers. If you're on Windows, good luck with that, because I have no idea how to do it. Try WSL, or smthg, idk  
   Alternatively, you can start Vite and Rails separately, with `npm --prefix frontend run dev` and `rails s`.

### Running backend in Docker
0. If you want to run it on a Windows host, you have to install [Docker Desktop](https://docs.docker.com/desktop/install/windows-install/).  
   If using Linux or WSL, you can install [Docker Engine](https://docs.docker.com/engine/install/#server) itself. Choose the distro you're using, and follow instructions to install Docker.
1. After you're done installing Docker, open the terminal (either Powershell or Linux terminal, depending on your installation type). Navigate to the project root and run the following commands to build a Docker image of a project and run database migrations:
```shell
docker compose build
docker compose run backend rails db:migrate
```
> Info  
> If docker cli requires you to use sudo, follow these instructions to add your user to the docker group:
> https://docs.docker.com/engine/install/linux-postinstall/

2. To start the backend container, run the following command:
```shell
docker compose up
```

3. Keep in mind that every time backend code is updated, you have to rebuild the container and apply new migrations.

### How to manually add products
1. Run `rails c` to get interactive Rails console  
   If backend is run inside a Docker container, use `docker compose run backend rails c` instead.
2. Paste the following snippet, replace the values, and press enter
```rb
Product.new(name: "Test Product", price: 12.34, description: "Lorem ipsum").save
```
3. Type `exit` to exit the Rails console

## API Documentation
In your IDE open the file [openapi.yaml](openapi.yaml) and install the OpenAPI Specification plugin from JetBrains
![screenshot](https://cdn.discordapp.com/attachments/969317854635769929/1091670517859242014/image.png)
