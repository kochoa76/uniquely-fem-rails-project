class SessionsController < ApplicationController


  def create
          if auth_hash
            @user= User.find_or_create_by(uid: auth_hash[:uid]) do |user|
              user.password = SecureRandom.hex
              user.username = auth_hash[:info][:username]
              user.email = auth_hash[:info][:email]
           end
              session[:user_id] = @user.id
              render user_path(@user), flash[:alert] =  "Successfully signed in"
          else
              @user = User.find_by(email: params[:email])
              if @user && @user.authenticate(params[:password])
                  session[:user_id] = @user.id
                  redirect_to  @user
              else
              flash[:alert] = "Invalid credentials. Please try again or signup to create account."
              render :new
              end
            end
          end

    def destroy
      session.clear
      redirect_to root_path
    end

   private

   def auth_hash
       request.env["omniauth.auth"]
   end
 end
