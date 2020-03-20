For our MERN stack project we created a fullstack movie review app utilizing Node.js, Mongoose, Express and React. It also makes use of React Router, CORS, Bulma CSS framework, and an external API. Our main goal was to have the user be able to search for any movie they wanted, have a homepage display the results of that search, and then enable the reviewer to add that film to their collection page where they can then review it.

We decided to use themoviedb for our external API because it allowed for us to pull an entire page worth of results at a time, which was required to fulfill our main user story. We used this API in tandem with our own local API in order to store the user’s collection of movies and subsequently add their own reviews on their “My Movies” page.

The backend of our app utilizes the MVC file structure to streamline our code, as well as the seven RESTFUL routes and full CRUD in order to allow for the user to add movies to their collection, view their movies, create/update their reviews, and delete the movie from their collection.

On the frontend we made use of Create React App in conjunction with React Router as a means to develop a single page application with multiple views. This was necessary to fulfill our user story in which we have a main landing page where the user searches for and adds movies to their collection, as well as a separate view where they could maintain their collection.

When it came to styling our app we decided to use Bulma for our CSS framework because we wanted to challenge ourselves and experiment with something different. While we had all previously worked with Bootstrap, we felt like Bulma was unexplored territory that we wanted to get some experience with. While it was rewarding to get exposure to this new framework it would ultimately end up being one of the first of many hurdles in the development process.

Some other challenges we ran into throughout the course of development that we hope to resolve in the future are implementing authentication, adding dynamic star ratings to each movie in our collection, and getting comfortable enough with Bulma to include portfolio-quality styling in our app. While we came close to including many of these features, we ultimately didn’t get everything functioning perfectly ahead of the deadline and felt that they should be left out for future implementation.

Overall we are satisfied with the end result, but wish we had more time to tie up the loose ends described above. Both React and Bulma were extremely challenging to work with, but the experience was invaluable.

Live site: https://movie-critique.herokuapp.com
Original repo before we spunoff front and backend: https://github.com/joyfulben/Movie-Review
Trello: https://trello.com/b/UN509aBV/movie-review-project
Backend repo: https://github.com/joyfulben/movie_backend
