const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);
const app = express();
module.exports = app;

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
// app.use(express.json());
// app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// auth and api routes
app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

app.get('/', (req, res) =>
	res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
	if (path.extname(req.path).length) {
		const err = new Error('Not found');
		err.status = 404;
		next(err);
	} else {
		next();
	}
});

// sends index.html
app.use('*', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

// stripe payment
app.post('payment', cors(), async (req, res, next) => {
	let { amount, id } = req.body;
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: 'USD',
			description: 'Mockbuster',
			payment_method: id,
			confirm: true,
		});

		console.log('Payment', payment);
		res.json({
			message: 'Payment Successful',
			success: true,
		});
	} catch (err) {
		console.log('Payment Server Error', err);
		res.json({
			message: 'Payment Failure',
			success: false,
		});
	}
});

// error handling endware
app.use((err, req, res, next) => {
	console.error(err);
	console.error(err.stack);
	res.status(err.status || 500).send(err.message || 'Internal server error.');
});
