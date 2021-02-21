const express = require('express');
const router = express.Router();
//Model
const MovieModel = require('../models/Movie');

//GET ALL MOVIES : .../api/movies/ 
router.get('/', (req, res) => {
    MovieModel.find()
                    .then((movieList)=>{res.json(movieList);})
                    .catch((errorMsg)=>{res.json(errorMsg);});
})

//GET A MOVIE : .../api/movies/123 
router.get('/:movieId', (req, res,next) => {
    MovieModel.findById(req.params.movieId)
                    .then((movieList)=>{          
                        res.json(movieList);})
                    .catch((errorMsg)=>{
                        next({message:"The movie was not found.(CATCH)",code:99});
                        res.json(errorMsg);});
})

//POST
router.post('/', function (req, res) {
    /*const movie = new MovieModel({
        title : req.body.title,
        imdb_score:req.body.imdb_score,
        category:req.body.category,
        country:req.body.country,
        year:req.body.year
    })*/
    const movie = new MovieModel(req.body);
    /*movie.save((err,data)=>{
        if (err) {res.json(err);}
        res.json(data);
    });*/
    movie.save()
            .then((data)=>{res.json(data);})
            .catch((err)=>{res.json(err)});
})

module.exports = router;