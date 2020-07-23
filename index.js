// Initialize express
const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Set db
require('./data/eduyelp-db');

// Add after body parser initialization!
app.use(expressValidator());
require('./controllers/reviews.js')(app);
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.get('/', (req, res) => {
  res.render('home');
})
app.get('/reviews/new', (req, res) => {
  res.render('reviews-new.handlebars');
})

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})