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

## API Documentation
In your IDE open the file [openapi.yaml](openapi.yaml) and install the OpenAPI Specification plugin from JetBrains
![screenshot](https://cdn.discordapp.com/attachments/969317854635769929/1091670517859242014/image.png)
