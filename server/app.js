const express = require('express');
const axios = require('axios')
const morgan = require('morgan');
const app = express();
const cache = {
    url: '',
    data: ''
};

app.get('/', function (req, res) {

    if (req.query.i) {
        if (cache.url === req.query.i) {
            res.send(cache.data);

        } else
            axios
                .get('http://www.omdbapi.com/?i=' + req.query.i + '&apikey=8730e0e')
                .then(function (response) {
                    cache.url = req.query.i;
                    cache.data = response.data;
                    res.send(response.data);
                    console.log(cache);

                }, function (error) {
                    res.send('error ' + error);

                }
                );

    }
    else {
        if (cache.url === req.query.t) {
            res.send(cache.data);
        }

        var query = req.query.t && req.query.t.replace(' ', '%20');

        axios
            .get('http://www.omdbapi.com/?t=' + query + '&apikey=8730e0e')
            .then(function (response) {
                cache.url = req.query.t;
                cache.data = response.data;
                res.send(response.data);
                console.log(cache);

            },


        );
    }
})

module.exports = app;


