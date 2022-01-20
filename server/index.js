const { db } = require('./db');
const PORT = process.env.PORT || 8080;
const app = require('./app');
const seed = require('../script/seed');
const stripe = require('stripe')(
	'pk_test_51KIhdSBUe6p65tjNXtHN5NUIQVk30J1x34GqAuvZZZc4QYJ7m2FHOiEjIbfyIkNGXAT2Km74UYnJ5BYJfZ442nIQ00QqawjRra'
);

// stripe payment
app.post('/create-checkout-session', async (req, res) => {
	const session = await stripe.checkout.sessions.create({
		customer_email: users.email,
		line_items: [
			{
				// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
				// price: orders.items.price,
				quantity: 1,
			},
		],
		mode: 'payment',
		success_url: `${PORT}/?success=true`,
		cancel_url: `${PORT}?canceled=true`,
	});

	res.redirect(303, session.url);
});

const init = async () => {
	try {
		if (process.env.SEED === 'true') {
			await seed();
		} else {
			await db.sync();
		}
		// start listening (and create a 'server' object representing our server)
		app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
	} catch (ex) {
		console.log(ex);
	}
};

init();
