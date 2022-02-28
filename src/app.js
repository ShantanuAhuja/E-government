const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const Register = require("./models/register");
const port = process.env.PORT || 3000;
const { json } = require("express");
require("./db/conn");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// setting up connection to server at port 3000

const static_path = path.join(__dirname, "../public/");
const template_path = path.join(__dirname, "../templates/views");

//partials for calling a component which is to be used many times
const partial_path = path.join(__dirname, "../templates/partials");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));

//setting view engine to handlebars(hbs) file
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path);


app.get("/", (req, res) => {
	res.render("index");
})
app.get("/register", (req, res) => {
	res.render("register");
})


//API for inserting a data when user fills the form

app.post("/register", async (req, res) => {
	try {
		const password = req.body.password;
		const cpassword = req.body.confirmpassword;

		if (password === cpassword) {
			const registration = new Register({

				fname: req.body.fname,
				username: req.body.username,
				aadhar: req.body.aadhar,
				age: req.body.age,
				gender: req.body.gender,
				blood: req.body.blood,
				password: req.body.password,
				confirmpassword: req.body.confirmpassword,
			})
			const registered = await registration.save();
			res.status(201).render("index");
		}
		else {
			res.send("Password are not Matching");
		}
	} catch (error) {
		res.status(400).send(error);
	}
})


//API for when user logins into the form

app.post("/", async (req, res) => {
	try {
		const usernam = req.body.username;
		const password = req.body.password;

		const registerusername = await Register.findOne({ username: usernam });

		const isMatch = await bcrypt.compare(password, registerusername.password);

		if (isMatch) {
			res.status(201).render("option", { name: registerusername.fname });
		}

		else {
			res.send("Incorrect Password");
		}
	} catch (error) {
		res.status(400).send("Invalid Username or Password");
	}
})





app.listen(port, () => {
	console.log(`Server is running at ${port}`);
});

