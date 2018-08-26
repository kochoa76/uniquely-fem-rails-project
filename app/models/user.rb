class User < ApplicationRecord
  has_many :reviews
  has_many :companies, :through=> :reviews
  validates :username, presence: true
  validates :username, uniqueness: true
  validates :email, presence: true
  validates :email, uniqueness: true
  # before_save :set_anonymous_username
  # helper_method :set_anonymous_username
  has_secure_password

  # def self.set_anonymous_username
  #   @user.username = "anonymous#{User.last.id + 1}"
  #   @user.update(username: params[:username])
  # end

  def self.from_omniauth(auth)
        where(auth.slice(:provider, :uid)).first_or_initialize.tap do |user|
          user.provider = auth.provider
          user.uid = auth.uid
          user.username = auth.info.name
          user.email = auth.info.email
          user.password_digest = SecureRandom.hex
          user.oauth_token = auth.credentials.token
          user.oauth_expires_at = Time.at(auth.credentials.expires_at)
          user.save!
        end
    end

end
