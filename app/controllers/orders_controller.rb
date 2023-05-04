class OrdersController < ApplicationController
  def index
    return if require_login!

    render json: helpers.current_user.orders.all.to_json(
      except: [:user_id, :product_id],
      include: [product: { only: [:id, :name] }]
    )
  end

  def show
    return if require_login!

    @order = helpers.current_user.orders.find_by(id: params[:id])
    if @order
      render json: @order.to_json(
        except: [:user_id, :product_id],
        include: [product: { only: [:id, :name] }]
      )
    else
      render json: {
        errors: ['Order not found']
      }, status: :not_found
    end
  end

  def create
    return if require_login!

    @product = Product.find_by(id: order_params[:product])
    unless @product
      render json: {
        errors: ["Product not found"]
      }, status: :unprocessable_entity
      return
    end

    @order = helpers.current_user.orders.new(
      user: helpers.current_user,
      product: @product,
      quantity: order_params[:quantity],
    )
    if @order.save
      render json: @order.to_json(
        except: [:user_id, :product_id],
        include: [product: { only: [:id, :name] }]
      )
    else
      render json: {
        errors: @order.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private
  def order_params
    params.require(:order).permit(:product, :quantity)
  end

  def require_login!
    unless helpers.logged_in?
      render json: {
        errors: ['You are not authorised to perform this action']
      }, status: :unauthorized

      true
    end
  end
end
