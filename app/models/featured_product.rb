class FeaturedProduct < ApplicationRecord
  has_one_attached :image
  belongs_to :product

  validates :product, presence: true

  def image_url
    Rails.application.routes.url_helpers.rails_blob_path(
      self.image,
      only_path: true,
    )
  end
end
