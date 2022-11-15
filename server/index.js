const mongoose = require("mongoose");
const app = require("./server.js");

const PORT = process.env.SERVER_PORT || 5000;
const MONGO_URI = process.env.MONGO_ATLAS_URI || "mongodb://localhost:27017/GenieSpeaks"

console.log("Connecting to DB...");

mongoose.connect(
	MONGO_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) return console.log(err);
		console.log("DB connection Success");
		app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`));
	}
);
