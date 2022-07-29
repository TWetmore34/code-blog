# 14 Model-View-Controller (MVC): Tech Blog

## Your Task

Writing about tech can be just as important as making it. Developers spend plenty of time creating new applications and debugging existing codebases, but most developers also spend at least some of their time reading and writing about technical concepts, recent advancements, and new technologies. A simple Google search for any concept covered in this course returns thousands of think pieces and tutorials from developers of all skill levels!

Your task this week is to build a CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well. You’ll build this site completely from scratch and deploy it to Heroku. Your app will follow the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

## User Story

```md
AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions
```

## Acceptance Criteria
<!-- route for the main page is gonna make an api call to get every post -->
<!-- login will be tough but doable -->
<!-- creating a new post will be an object pulling from the value fields and taking the user id as a foreign key -->
<!-- the hard part here is just gonna be learning handlebars to pull all that data from the index file - idk how to do that without a front end script file -->
```md
GIVEN a CMS-style blog site
<!-- we know how to render a main page using handlebars, we know how to setup a basic login option -->
WHEN I visit the site for the first time
<!-- so i think the dashboard will end up being a profile page? ill probably pass in the req.session obj to get user details for the render? -->
THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
<!-- main layout folder has an anchor element w href=/home -->
WHEN I click on the homepage option
THEN I am taken to the homepage
<!-- this means homepage is viewable without login, all others are not. means we render in a 'please sign in' block on all our partials -->
WHEN I click on any other links in the navigation
THEN I am prompted to either sign up or sign in
<!-- sign in page - check activity 15, but its gonna be two post requests - one creates a user obj + stores a hashed password, the other checks username and hashed password -->
WHEN I choose to sign up
THEN I am prompted to create a username and password
<!-- post request 1 TO THE API -->
WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site
<!-- means the database needs permanence - nothing we havent done yet -->
WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my username and password
<!-- other half of the if statements: logout button needs to be changed as the conditional in the main layout folder -->
WHEN I am signed in to the site
THEN I see navigation links for the homepage, the dashboard, and the option to log out
<!-- date created means we need to store timestamps and use our date modifying functions -->
WHEN I click on the homepage option in the navigation
THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
<!-- each of those elements needs an attached listener in the public js file - we can do that w querySelectorAll, a for loop, and attaching the return to an event listener each time -->
<!-- second half will be a get request for a specific post id -->
WHEN I click on an existing blog post
THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
<!-- post.hasMany(comments) this might need to use a similar setup to the productTags from 13, that way its actually attached but idk -->
<!-- regardless, to make sure its cemented, itll need a .update on post whenever a comment is added -->
<!-- it might end up looking like await Comment.create(newComment) => Post.update(same post info as before, but with the newly created comment pushed onto its comment array)-->
WHEN I enter a comment and click on the submit button while signed in
THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
<!-- this is a get request thatll filter by user_id -->
<!-- create new is a post request thatll just add a new post with post_id(PK), user_id(FK), an empty comments arr(FK), post_text, and post_header -->
WHEN I click on the dashboard option in the navigation
THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
<!-- post request -->
WHEN I click on the button to add a new blog post
THEN I am prompted to enter both a title and contents for my blog post
<!-- taken back to updated dashboard means the post request on the frontside js file needs to end by reloading the page -->
WHEN I click on the button to create a new blog post
THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
<!-- update post is gross and i stand by it it will b used for nefarious means BUT -->
<!-- delete it findByPk(this).destroy() -->
<!-- update is gonna be the same, but .update instead of destroy, where the input is pulled from the current textfield -->
<!-- so the update button will on front end, switch the display to some text input fields with a starting value of the currrent title and description -->
<!-- backend, itll do what? put request to the api that updates the values of text and header? -->
WHEN I click on one of my existing posts in the dashboard
THEN I am able to delete or update my post and taken back to an updated dashboard
<!-- logout can just destroy the session obj -->
WHEN I click on the logout option in the navigation
THEN I am signed out of the site
<!-- this will be cookies i havent learned it yet dw (BUT looks like it wont be anythign too crazy, seems like the basic ones just have a set amount of time before some event occurs - might just be like a jqueryui window or smth renders at 15 minutes of a session) -->
WHEN I am idle on the site for more than a set time
THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments
```

## Mock-Up

The following animation demonstrates the application functionality:

![Animation cycles through signing into the app, clicking on buttons, and updating blog posts.](./Assets/14-mvc-homework-demo-01.gif) 

## Getting Started

Your application’s folder structure must follow the Model-View-Controller paradigm. You’ll need to use the [express-handlebars](https://www.npmjs.com/package/express-handlebars) package to implement Handlebars.js for your Views, use the [MySQL2](https://www.npmjs.com/package/mysql2) and [Sequelize](https://www.npmjs.com/package/sequelize) packages to connect to a MySQL database for your Models, and create an Express.js API for your Controllers.

You’ll also need the [dotenv package](https://www.npmjs.com/package/dotenv) to use environment variables, the [bcrypt package](https://www.npmjs.com/package/bcrypt) to hash passwords, and the [express-session](https://www.npmjs.com/package/express-session) and [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize) packages to add authentication.

**Note**: The [express-session](https://www.npmjs.com/package/express-session) package stores the session data on the client in a cookie. When you are idle on the site for more than a set time, the cookie will expire and you will be required to log in again to start a new session. This is the default behavior and you do not have to do anything to your application other than implement the npm package.

## Grading Requirements

> **Note**: If a Challenge assignment submission is marked as “0”, it is considered incomplete and will not count towards your graduation requirements. Examples of incomplete submissions include the following:
>
> * A repository that has no code
>
> * A repository that includes a unique name but nothing else
>
> * A repository that includes only a README file but nothing else
>
> * A repository that only includes starter code

This Challenge is graded based on the following criteria:

### Technical Acceptance Criteria: 40%

* Satisfies all of the preceding acceptance criteria plus the following:

    * Application’s folder structure follows the Model-View-Controller paradigm.

    * Uses the [express-handlebars](https://www.npmjs.com/package/express-handlebars) package to implement Handlebars.js for your Views.

    * Application must be deployed to Heroku.

### Deployment: 32%

* Application deployed at live URL.

* Application loads with no errors.

* Application GitHub URL submitted.

* GitHub repository contains application code.

### Application Quality: 15%

* User experience is intuitive and easy to navigate.

* User interface style is clean and polished.

* Application resembles the mock-up functionality provided in the Challenge instructions.

### Repository Quality: 13%

* Repository has a unique name.

* Repository follows best practices for file structure and naming conventions.

* Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.

* Repository contains multiple descriptive commit messages.

* Repository contains quality readme file with description, screenshot, and link to deployed application.

## Review

You are required to submit BOTH of the following for review:

* The URL of the functional, deployed application.

* The URL of the GitHub repository, with a unique name and a readme describing the project.

---
© 2022 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.
