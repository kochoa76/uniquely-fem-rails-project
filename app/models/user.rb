class User < ApplicationRecord
  has_many :reviews
  has_many :companies, :through=> :reviews

  validates :email, presence: true
  validates :email, uniqueness: true
  validates :password, presence: true
  has_secure_password
  after_create :set_anonymous_user

  def self.from_omniauth(auth)
          where(auth.slice(:provider, :uid)).first_or_initialize.tap do |user|
            user.provider = auth.provider
            user.uid = auth.uid
            user.email = auth.info.email
            user.password = SecureRandom.hex
            user.oauth_token = auth.credentials.token
            user.oath_expires_at = Time.at(auth.credentials.expires_at)
            user.save!
          end
      end

    def set_anonymous_user
      self.username = "anonymous#{User.last.id + 1}"
      save
    end
  end
