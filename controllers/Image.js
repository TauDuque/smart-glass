const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'api key no bloco de notas'
});

const handleApiCall = (req, res) => {
    app.models.predict(
    "api key no bloco de notas", 
    req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work this API!!'))
}



const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries =>{ 
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('error'))
}

module.exports = {
    handleImage,
    handleApiCall
}
