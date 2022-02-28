const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// defining schema of the collection
const userRegistration = new mongoose.Schema({

	fname: {
		type: String,
		required: true
	},
	aadhar: {
		type: Number,
		required: true,
		unique: true,
		minlength: 12
	},
	gender: {
		type: String,
		required: true
	},
	blood: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	confirmpassword: {
		type: String,
		required: true
	}


});

// securing database password using bcrypt hashing for the purpose of hacking

userRegistration.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 10);
		this.confirmpassword = undefined;
	}
	next();
});


//create collection
const Register = new mongoose.model("Details", userRegistration);

module.exports = Register;


