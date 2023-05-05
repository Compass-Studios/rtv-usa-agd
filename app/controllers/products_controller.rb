class ProductsController < ApplicationController
  def index
    @products = Product.all
    render json: @products.to_json(
      except: [:description]
    )
  end

  def show
    @product = Product.find_by(id: params[:id])
    if @product
      render json: @product
    else
      render json: {
        errors: ["Product not found"]
      }, status: :not_found
    end
  end
end
