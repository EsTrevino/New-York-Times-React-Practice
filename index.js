const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Article = require('./models/Articles.js');

const app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 5000; 

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
	

//mongoose connection with mongoDB
mongoose.Promise = global.Promise;
// const mongoURI = 'mongodb://localhost/scraper_db';
const mLabURI = "mongodb://estevaano:nytreact@ds155695.mlab.com:55695/heroku_dfx75c1g";

mongoose.connect(mLabURI, { useMongoClient: true }).then(() => {
        console.log('Start');
    })
    .catch(err => {
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

//app.use section
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//api routes
app.get('/api/saved', function(req, res){
	Article.find({}, (err, articles) => {  
    if (err) {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
        res.status(500).send(err)
    } else {
        // send the list of all people
        res.status(200).json(articles);
    	}
	});
});

app.post('/api/saved', function(req, res){
//create new post from data sent from react
    var article = new Article(req.body);
    //save to database
    article.save().then(article => {
        //if item sends, let user know
        res.json('item added successfully');
        //if not, catch error and send this message
    }).catch(err =>{
        res.status(400).send("unable to save to database")
    });
});



   


app.delete('/api/saved', function(req, res){
	// The "todo" in this callback function represents the document that was found.
// It allows you to pass a reference back to the client in case they need a reference for some reason.
Article.findByIdAndRemove(req.params.articleID, (err, article) => {  
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    let response = {
        message: "Article successfully deleted",
        id: article._id
    };
    res.status(200).send(response);
});
})


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});