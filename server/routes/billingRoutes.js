const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripe.secret);
const pool = require("../database/db");
const requireLogin = require("../middlewares/requireLogins");

module.exports = (app) => {
	app.post("/api/stripe", requireLogin, async (req, res) => {
		const charge = await stripe.charges.create({
			amount: 500,
			currency: "usd",
			description: "$5 for 5 credits",
			source: req.body.id,
		});

		if (charge.status != "succeeded") {
			return res.status(422).send({ error: "Payment failed" });
		}

		req.user.credits += 5;

		const updatedUser = await pool.query(
			"UPDATE users SET credits = $1 WHERE user_id = $2 RETURNING *",
			[req.user.credits, req.user.user_id]
		);

		res.send(updatedUser.rows[0]);
	});
};
