class UsersController < ApplicationController
   before_action :logged_in, only: [ :show, :edit]
  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def create
        @user = User.new(user_params)
        @user.username =  @user.username = "anonymous#{User.last.id + 1}" if @user.username.nil?
        if @user.save
        session[:user_id] = @user.id
        redirect_to @user
        else
           render '/users/new'
        end
     end

  def show
     if logged_in
       @user = User.find_by(id: params[:id])
   else
       redirect_to '/'
     end
  end

  def edit
      @user = User.find(params[:id])
  end

  def update
        @user = User.find(params[:id])
        if @user.update(user_params)
            redirect_to @user
        else
            render :edit
        end
    end

  def destroy
      @user = User.find(params[:id])
      @user.destroy
      redirect_to root_path
  end

private

  def user_params
    params.require(:user).permit(:password, :password_confirmation, :email, :admin, :uid, :provider, :oauth_token, :oauth_expires_at, :image)
  end

  def set_auth
        @auth = session[:omniauth] if session[:omniauth]
    end
end
