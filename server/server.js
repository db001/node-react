const express = require("express");
require("./services/passport");

const app = express();

require("./routes/authRoutes")(app);

app.get("/", (req, res) => {
	res.send({ hi: "there" });
});

const port = process.env.SERVERPORT || 5000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
