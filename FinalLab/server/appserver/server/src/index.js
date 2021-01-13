import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from './router';

const app = express();
var cors = require('cors')
const PORT = process.env.PORT || 5000;

mongoose.connect(
	'mongodb://localhost:27017/volunteersDbbb1',
	{ useNewUrlParser: true }
);

const db = mongoose.connection;
db.once('open', () => console.log('mongodb is connected')).on('error', err =>
	console.error(err)
);

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/volunteers', router);

app.listen(PORT, () => {
	console.log('server connected at ' + PORT);
});
