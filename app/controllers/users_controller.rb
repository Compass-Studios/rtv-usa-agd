class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    puts user_params
    if @user.save
      helpers.login!
      render json: {
        logged_in: true,
        user: helpers.current_user_info,
      }
    else
      render json: {
        errors: @user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
