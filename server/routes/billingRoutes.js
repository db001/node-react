const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripe.secret);

const pool = require("../database/db");

module.exports = (app) => {
	app.post("/api/stripe", async (req, res) => {
		const charge = await stripe.charges.create({
			amount: 500,
			currency: "usd",
			description: "$5 for 5 credits",
			source: req.body.id,
		});

		req.user.credits += 5;

		const updatedUser = await pool.query(
			"UPDATE users SET credits = $1 WHERE user_id = $2 RETURNING *",
			[req.user.credits, req.user.user_id]
		);

		console.log(updatedUser.rows[0]);
	});
};
