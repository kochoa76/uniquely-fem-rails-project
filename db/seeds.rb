# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

companies = Company.create!([
  {name: 'Pinterest', size: 3000, city: 'San Francisco', state: 'California', description: "is a free website that requires registration to use. Users can upload, save, sort, and manage images—known as pins—and other media content (e.g., videos) through collections known as pinboards."},
  {name: 'Glossier', size: 300, city: 'New York', state: 'New York', description: "is one of the first makeup brands to be born out of social media, and it looks the part: Its modern, minimalist packaging is designed to look good in photographs. Every Glossier product arrives in a reusable, pink plastic pouch that doubles as a handy Instagram backdrop"},
  {name: 'Modern Fertility', size: 20, city: 'San Francisco', state: 'California', description: "is a women's health company closing the fertility information gap by letting women test key fertility hormones at home."},
  {name: 'Hubspot', size: 3000, city: 'Cambridge', state: 'Massachussetts', description: "is a developer and marketer of software products for inbound marketing and sales."}
  ])

users = User.create!([
  {username: 'ro', email: 'ro@gmail.com', password: 'ro', admin: false},
  {username: 'Sandy', email: 'sandy@gmail.com', password: 'pink', admin: false},
  {username: 'admin', email: 'admin@gmail.com', password: 'admin', admin: true}
  ])

reviews = Review.create!([
  {company_id: 1, user_id: 2, job_rating: 4, salary: 70000, women_exec_roles: true, recommend: true, content: 'Fast paced company with good benefits, some remote options available, great leadership', promo_opps: true, created_at: DateTime.new(2018, 9, 15)},
  {company_id: 2, user_id: 3, job_rating: 3, salary: 50000, women_exec_roles: true, recommend: true, content: 'There are women in executive positions but it is an environment that fosters playing favorites, fast paced company but difficult to find mentors', promo_opps: true, created_at: DateTime.new(2018, 9, 15)},
  {company_id: 3, user_id: 1, job_rating: 4, salary: 60000, women_exec_roles:true, recommend:true, content: 'Small company with a great mission, fast paced movement, great environment', promo_opps: false, created_at: DateTime.new(2018, 9, 15)},
  {company_id: 4, user_id: 1, job_rating: 3, salary: 50000, women_exec_roles: true, recommend: false, content: 'Large company, management makes impulse decisions that dont align with other departments, very competitive environment', promo_opps: false, created_at: DateTime.new(2018, 12, 20)},
  {company_id: 1, user_id: 2, job_rating: 5, salary: 90000, women_exec_roles: true, recommend: true, content: 'One of the best companies to work for, highly talented team, takes care of employees, benefits and remote work flexibility', promo_opps: true, created_at: DateTime.new(2018, 11, 13)},
  {company_id: 4, user_id: 3, job_rating: 4, salary: 70000, women_exec_roles: true, recommend: true, content: 'Was good for a year to get my bearings in a new industry, not competitive pay, very quick competitive environment', promo_opps: true, created_at: DateTime.new(2018, 10, 15)}
  ])
