/**
 * Created by Joe on 2017/6/15.
 */
var app = require('../../express');

app.get('/api/project/omdb', searchByTitle);
app.get('/api/project/omdb/:imdbID', searchMovieByImdbID);

function searchMovieByImdbID(req, res) {
    var imdbID = req.params['imdbID'];
    for (var i in movies) {
        if(movies[i]._imdbId === imdbID) {
            res.send(movies[i]);
            return;
        }
    }
    res.sendStatus(404);
}

function searchByTitle(req, res) {
    var title = req.query['title'];
    for (var i in movies) {
        if (movies[i].title === title){
            res.json(movie);
            return;
        }
    }
    res.sendStatus(404);
}