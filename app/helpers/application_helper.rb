module ApplicationHelper
  def login!
    session[:user_id] = @user.id
  end

  def logout!
    session.clear
  end

  def logged_in?
    !!session[:user_id]
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  # Returns current user as a hash without :password_digest, :created_at and :updated_at
  def current_user_info
    current_user.attributes.except("password_digest", "created_at", "updated_at")
  end

  def authorized_user?
    @user == current_user
  end

  def set_user
    @user = User.find_by(id: session[:user_id])
  end
end
