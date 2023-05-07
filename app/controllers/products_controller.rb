class ProductsController < ApplicationController
  def index
    @products = Product.all
    render json: @products.to_json(
      except: [:description],
      methods: :image_sm,
    )
  end

  def show
    @product = Product.find_by(id: params[:id])
    if @product
      render json: @product.to_json(
        methods: :image_lg,
      )
    else
      render json: {
        errors: ["Product not found"]
      }, status: :not_found
    end
  end

  def featured
    @featured_products = FeaturedProduct.all
    render json: @featured_products.to_json(
      only: [:product_id],
      methods: :image_url,
    )
  end
end
