const Clarifai = require('clarifai');

const app = new Clarifai.App({
	apiKey: 'b01accfee0a4480793d1b1b09e0e4490'
});

const handleApiCall = (req, res) =>{
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch (err => res.status(400).json("unable to fetch data"))
}

const handleImagePut = (req, res, db)=>{
	const { id } = req.body;
	db('users').where('id', '=' , id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0])
	})
	.catch(err=> res.status(400).json('unable to retrieve entries'))
}

module.exports = {
	handleImagePut,
	handleApiCall
}