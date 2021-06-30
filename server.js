const express = require('express');
const cors = require('cors');
const knex = require('knex');

const pokedex = require('./controllers/pokedex');
const searchDex = require('./controllers/searchDex');

const app = express();

app.use(express.json());
app.use(cors());

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: '',
		password : '',
		database: 'pokedex'
	}
});

app.get('/', (req, res) => {
	res.send('WE HAVE BEGUN!');
});

app.get('/pokedex', (req, res) => { pokedex.handlePokedex(req, res, db) });

app.post('/searchdex', (req, res) => { searchDex.handleSearchDex(req, res, db) });

app.listen(process.env.PORT || 3001, () => {
	console.log(`app is running on port ${process.env.PORT || 3001}`);
});
