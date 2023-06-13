Clearance.configure do |config|
  config.routes = false
  config.mailer_sender = "reply@example.com"
  config.rotate_csrf_on_sign_in = true
  config.parent_controller = "Admin::ApplicationController"
  config.user_model = "AdminUser"
  config.allow_sign_up = false
  config.redirect_url = "/admin"
end
