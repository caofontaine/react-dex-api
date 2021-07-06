module.exports = {
  prod: {
    client: 'pg',
    connection: {
  		connectionString: process.env.DATABASE_URL,
  		ssl: true
    }
  },
  dev: {
    client: 'pg',
  	connection: {
  		host: '127.0.0.1',
  		user: '',
  		password : '',
  		database: 'pokedex'
  	}
  }
}
