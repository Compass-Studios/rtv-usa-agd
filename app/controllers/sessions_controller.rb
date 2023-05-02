class SessionsController < ApplicationController
  def create
    @user = User.find_by(email: session_params[:email])
    if @user && @user.authenticate(session_params[:password])
      helpers.login!
      render json: {
        logged_in: true,
        user: helpers.current_user_info,
      }
    else
      render json: {
        errors: ["Invalid email or password"],
      }, status: :unauthorized
    end
  end

  def destroy
    helpers.logout!
    render json: {
      logged_in: false
    }
  end

  def is_logged_in
    if helpers.logged_in? && helpers.current_user
      render json: {
        logged_in: true,
        user: helpers.current_user_info,
      }
    else
      render json: {
        logged_in: false,
      }
    end
  end

  private
  def session_params
    params.require(:user).permit(:name, :email, :password)
  end
end
