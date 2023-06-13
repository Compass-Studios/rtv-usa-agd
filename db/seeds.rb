# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'faker'
require 'down'

product_img_url = Faker::LoremFlickr.image(
  size: '500x500',
  search_terms: %w(computer white background)
)
featured_product_img_url = Faker::LoremFlickr.image(
  size: '1300x500',
  search_terms: %w(washing machine)
)

print 'Creating example products'

rand(70..100).times do
  product = Product.create!(
  name: Faker::Commerce.product_name,
  price: Faker::Commerce.price,
  description: Faker::Lorem.paragraph(random_sentences_to_add: 20),
  )

  product.image.attach(
    io: Down.download(product_img_url),
    filename: product.name + '.jpg'
  )

  print '.'
end

puts "\nDatabase populated with #{Product.count} Products"
print 'Adding example featured products'

rand(3..5).times do
  random_product = Product.find_by(id: rand(Product.count))

  featured_product = FeaturedProduct.create!(
    product: random_product
  )
  featured_product.image.attach(
    io: Down.download(featured_product_img_url),
    filename: random_product.name + '.jpg'
  )

  print '.'
end

puts "\nDatabase populated with #{FeaturedProduct.count} featured products"

AdminUser.create!(email: 'admin@rtv-usa-agd.com', password: 'admin')
puts "\nDefault admin user email: 'admin@rtv-usa-agd.com', password: 'admin'"
