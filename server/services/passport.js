const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");

const pool = require("../database/db");

passport.serializeUser((user, done) => {
	done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await pool.query(
			"SELECT * FROM users WHERE user_id = $1",
			[id]
		);
		done(null, user.rows[0]);
	} catch (error) {
		console.error(`Deserialize error: ${error.message}`);
	}
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.google.clientID,
			clientSecret: keys.google.clientSecret,
			callbackURL: "/auth/google/callback",
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const user = await pool.query(
					"SELECT * FROM users WHERE google_id = $1",
					[profile.id]
				);

				if (user.rows.length > 0) {
					console.log("User exists");
					done(null, user.rows[0]);
				} else {
					let newUser = await pool.query(
						"INSERT INTO users (google_id) VALUES ($1) RETURNING *",
						[profile.id]
					);

					done(null, newUser.rows[0]);
				}
			} catch (err) {
				console.error(`Error in GoogleStrategy: ${err.message}`);
			}
		}
	)
);
