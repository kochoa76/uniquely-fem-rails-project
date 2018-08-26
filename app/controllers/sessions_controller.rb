class SessionsController < ApplicationController


  def create
        @auth = request.env["omniauth.auth"]
        if @auth
            @user = User.from_omniauth(request.env["omniauth.auth"])
            session[:user_id] = @user.id
            render user_path(@user), notice: "Successfully signed in"
           else
            @user = User.find_by(email: params[:email])
            if @user && @user.authenticate(params[:password])
                session[:user_id] = @user.id
                redirect_to  @user
            else
                render '/sessions/new', :notice => "Username/email/password incorrect or can't be blank"
            end
        end
    end

    def destroy
     session[:user_id] = nil
     session[:omniauth] = nil
     redirect_to root_url
   end
 end
