const app = require('./server');

if(!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

console.log(process.env.NODE_ENV);

app.listen(process.env.PORT || 3001, () => {
	console.log(`app is running on port ${process.env.PORT || 3001}`);
});
