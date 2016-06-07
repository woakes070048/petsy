class Pet < ActiveRecord::Base
  validates :name, :animal, :description, :sex, :age, presence: true

  has_attached_file :image, default_url: "noimage.jpg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
end
