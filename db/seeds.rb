# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

companies = Company.create!([
  {name: 'Pinterest', size: 3000, city: 'San Francisco', state: 'California'},
  {name: 'Glossier', size: 300, city: 'New York', state: 'New York'},
  {name: 'Modern Fertility', size: 20, city: 'San Francisco', state: 'California'},
  {name: 'Hubspot', size: 3000, city: 'Cambridge', state: 'Massachussetts'}])

users = User.create!([
  {username: 'ro', email: 'ro@gmail.com', password: 'ro', admin: false},
  {username: 'Sandy', email: 'sandy@gmail.com', password: 'pink', admin: false},
  {username: 'admin', email: 'admin@gmail.com', password: 'admin', admin: true}
  ])

reviews = Review.create!([
  {company_id: 1, user_id: 2, job_rating: 4, salary: 70000, women_exec_roles: true, recommend: true, content: 'Fast paced company with good benefits, some remote options available, great leadership', promo_opps: true, created_at: DateTime.new(2018, 9, 15)},
  {company_id: 2, user_id: 3, job_rating: 3, salary: 50000, women_exec_roles: true, recommend: true, content: 'There are women in executive positions but it is an environment that fosters playing favorites, fast paced company but difficult to find mentors', promo_opps: true, created_at: DateTime.new(2018, 9, 15)},
  {company_id: 3, user_id: 1, job_rating: 4, salary: 60000, women_exec_roles:true, recommend:true, content: 'Small company with a great mission, fast paced movement, great environment', promo_opps: false, created_at: DateTime.new(2018, 9, 15)}
  ])
