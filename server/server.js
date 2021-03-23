const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

require("./services/passport");

const app = express();

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookie.key],
	})
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

app.get("/", (req, res) => {
	res.send({ hi: "there" });
});

const port = process.env.SERVERPORT || 5000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
