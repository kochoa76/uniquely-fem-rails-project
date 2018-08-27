class SessionsController < ApplicationController

  def create
    @auth = request.env["omniauth.auth"]
    if @auth
        @user = User.from_omniauth(request.env["omniauth.auth"])
        session[:user_id] = @user.id
        @user.username = "anonymous#{User.last.id + 1}"
        flash[:notice]= "Successfully signed in"
        render 'users/show'
    else
        @user = User.find_by(email: params[:email])
          if @user && @user.authenticate(params[:password])
             session[:user_id] = @user.id
             flash[:notice]= "Successfully signed in"
             redirect_to user_path(@user)
          else
             flash[:notice]= "Username/email/password incorrect or can't be blank"
             render '/sessions/new'
          end
        end
      end

    def destroy
      session[:user_id] = nil
       session[:omniauth] = nil
      redirect_to root_path
    end

 end
