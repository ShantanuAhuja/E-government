const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/UserInformation", {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => console.log("successful")).
	catch((err) => console.log(err));


