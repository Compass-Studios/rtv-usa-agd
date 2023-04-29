class ProductsController < ApplicationController
  def index
    @products = Product.all
    render json: @products
  end

  def show
    @product = Product.find_by(id: params[:id])
    if @product
      render json: @product
    else
      render status: :not_found
    end
  end
end
