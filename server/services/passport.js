const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");

const pool = require("../database/db");

passport.serializeUser((user, done) => {
	done(null, user.user_id);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.google.clientID,
			clientSecret: keys.google.clientSecret,
			callbackURL: "/auth/google/callback",
		},
		async (accessToken, refreshToken, profile, done) => {
			console.log(`Profile ID: ${profile.id}`);

			const user = await pool.query(
				"SELECT * FROM users WHERE google_id = $1",
				[profile.id]
			);

			if (user.rows.length > 0) {
				console.log("User exists");
				done(null, user);
			} else {
				let newUser = await pool.query(
					"INSERT INTO users (google_id) VALUES ($1) RETURNING *",
					[profile.id]
				);

				console.log("New User");
				console.log(newUser.rows[0]);
				done(null, newUser);
			}
		}
	)
);
