Specifications for the Rails Assessment

Specs:

Using Ruby on Rails for the project Include at least one has_many relationship (x has_many y e.g. User has_many Recipes) Include at least one belongs_to relationship (x belongs_to y e.g. Post belongs_to User) Include at least one has_many through relationship (x has_many y through z e.g. Recipe has_many Items through Ingredients) The "through" part of the has_many through includes at least one user submittable attribute (attribute_name e.g. ingredients.quantity) Include reasonable validations for simple model objects (list of model objects with validations e.g. User, Recipe, Ingredient, Item) Include a class level ActiveRecord scope method (model object & class method name and URL to see the working feature e.g. User.most_recipes URL: /users/most_recipes) Include signup (how e.g. Devise) Include login (how e.g. Devise) Include logout (how e.g. Devise) Include third party signup/login (how e.g. Devise/OmniAuth) Include nested resource show or index (URL e.g. users/2/recipes) Include nested resource "new" form (URL e.g. recipes/1/ingredients) Include form display of validation errors (form URL e.g. /recipes/new) Confirm:

The application is pretty DRY Limited logic in controllers Views use helper methods if appropriate Views use partials if appropriate


Rails App with JavaScript Frontend Spec
Project Specs:
x Must have a Rails Backend and new requirements implemented through JavaScript.
x Makes use of ES6 features as much as possible(e.g Arrow functions, Let & Const, Constructor Functions)
x Must translate the JSON responses into Javascript Model Objects using either ES6 class or constructor syntax.
x Must render at least one index page (index resource - 'list of things') via JavaScript and an Active Model Serialization JSON Backend.
x Must render at least one show page (show resource - 'one specific thing') via JavaScript and an Active Model Serialization JSON Backend.
x Your Rails application must reveal at least one `has-many` relationship through JSON that is then rendered to the page.
x Must use your Rails application and Javascript to render a form for creating a resource that submits dynamically.
x At least one of the JS Model Objects must have a method on the prototype.

Project Repo Specs:
Read Me file contains:
Application Description
Installation guide (e.g. fork and clone repo, migrate db, bundle install, etc)
Contributors guide (e.g. file an issue, file an issue with a pull request, etc)
Licensing statement at the bottom (e.g. This project has been licensed under the MIT open source license.)
Repo General
You have a large number of small Git commits
Your commit messages are meaningful
You made the changes in a commit that relate to the commit message
You don't include changes in a commit that aren't related to the commit message
