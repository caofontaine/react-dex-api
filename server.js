const express = require('express');
const cors = require('cors');

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const pokedex = require('./controllers/pokedex');
const searchDex = require('./controllers/searchDex');

if (process.env.NODE_ENV === 'prod') process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const app = express();
const db = require('./dbConfig.js');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('WE HAVE BEGUN!');
});

app.get('/pokedex', (req, res) => { pokedex.handlePokedex(req, res, db) });

app.post('/searchdex', (req, res) => { searchDex.handleSearchDex(req, res, db) });

module.exports = app;
