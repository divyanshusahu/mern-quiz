const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path")

const users = require("./routes/api/users");

const app = express();

app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose.connect(
	db,
	{ useNewUrlParser: true}
).then(() => console.log("Connected to Mongo Database")).catch((err) => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('frontend/build'));

	app.get("*", (req, res) => {
		req.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
