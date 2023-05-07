# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'faker'
require 'down'

rand(70..100).times do
  product = Product.create!(
    name: Faker::Commerce.product_name,
    price: Faker::Commerce.price,
    description: Faker::Lorem.paragraph(random_sentences_to_add: 20),
  )

  image_url = Faker::LoremFlickr.image(
    size: '500x500',
    search_terms: %w(computer white background)
  )

  product.image.attach(
    io: Down.download(image_url),
    filename: product.name + '.jpg'
  )

  print '.'
end

puts "Database populated with #{Product.count} Products"
