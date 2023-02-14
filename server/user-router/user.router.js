const router = require("express").Router();

const Product = require("../models/product.model.js");
const Review = require("../models/review.model.js");
const ECommerce = require("../models/ecommerce.model.js");
const User = require("../models/user.model.js");
const UserAuth = require("./userAuth.js");

router.post("/register", async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({
				error: {
					code: 400,
					error_ref: 9,
					message: "Partial Parameters: Fill all fields.",
				},
			});
		}

		const existingUser = await User.exists({ email: email });

		if (existingUser) {
			return res.status(400).json({
				error: {
					code: 400,
					error_ref: 7,
					message: "Consumed Parameters: Email ID is taken.",
				},
			});
		}

		const salt = await bcrypt.genSalt();
		const hashedpassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			name,
			email,
			hashedpassword,
		});

		await newUser.save();

		res.status(200).json({ message: "Account Creation Success" });
	} catch (e) {
		console.error(e);
		res.status(500).json({
			error: {
				code: 500,
				error_ref: 10,
				message: "Internal Service Error. Failed to create account.",
				trace_back: e,
			},
		});
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				error: {
					code: 400,
					error_ref: 9,
					message: "Fill all fields.",
				},
			});
		}

		const existingUser = await User.findOne({ email: email });

		if (!existingUser) {
			return res.status(401).json({
				error: {
					code: 401,
					error_ref: 8,
					message: "Invalid Email or Password.",
				},
			});
		}

		const isPasswordValid = await bcrypt.compare(
			password,
			existingUser.hashedpassword
		);

		if (!isPasswordValid) {
			return res.status(401).json({
				error: {
					code: 401,
					error_ref: 8,
					message: "Invalid Email or Password.",
				},
			});
		}

		const userToken = jwt.sign(
			{
				_id: existingUser._id,
				name: existingUser.name,
				email: existingUser.email,
			},
			process.env.JWT_SECRET
		);

		return res
			.status(200)
			.cookie("userToken", userToken, { httpOnly: true })
			.json({ message: "Login Success" });
	} catch (e) {
		console.error(e);
		res.status(500).json({
			error: {
				code: 500,
				error_ref: 10,
				message: "Internal Service Error.",
				trace_back: e,
			},
		});
	}
});

router.get("/logout", (req, res) => {
	res
		.cookie("userToken", "", {
			httpOnly: true,
			expires: new Date(0),
		})
		.send();
});

router.get("/verify", UserAuth, (req, res) => {
	const { _id, name, email } = req.userInfo;

	return res
		.json({
			authorized: true,
			message: "Success",
			_id,
			name,
			email,
		})
		.status(200);
});

router.post("/review", UserAuth, async (req, res) => {
	try {
		const { _id, name, email } = req.userInfo;
		const { productID, title, body, proof, review_star } = req.body;

		const GenieSpeaks = await ECommerce.findOne({ name: "GenieSpeaks" });

		const newReview = new Review({
			title,
			description,
			review_star,
			product: productID,
			user: _id,
			ecommerce: GenieSpeaks,
		});

		saved_review = await newReview.save();

		await Product.findByIdAndUpdate(
			{ _id: productID },
			{ $push: { reviews: saved_review } }
		);

		await User.findByIdAndUpdate(
			{ _id: _id },
			{ $push: { reviews: saved_review } }
		);

		res.status(200).json({ message: "Reviewed Saved" });
	} catch (e) {
		console.error(e);
		res.status(500).json({
			error: {
				code: 500,
				error_ref: 10,
				message: "Internal Service Error.",
				trace_back: e,
			},
		});
	}
});

router.get("/suggestions", async (req, res) => {
	try {
		const randomSuggestions = await Product.aggregate([
			{
				$sample: {
					size: 5,
				},
			},
			{
				$addFields: {
					review_count: {
						$size: "$reviews",
					},
					satisfactory_rating: {
						$cond: [
							{
								$eq: [
									{
										$size: "$reviews",
									},
									0,
								],
							},
							0,
							{
								$multiply: [
									{
										$divide: [
											"$rating_sum",
											{
												$multiply: [
													{
														$size: "$reviews",
													},
													5,
												],
											},
										],
									},
									100,
								],
							},
						],
					},
				},
			},
			{
				$lookup: {
					from: "Organization",
					localField: "organization",
					foreignField: "_id",
					as: "organization",
				},
			},
			{
				$set: {
					organization: {
						$arrayElemAt: ["$organization", 0],
					},
				},
			},
			{
				$addFields: {
					min_price: {
						$min: "$ecommerce.curr_price",
					},
				},
			},
			{
				$project: {
					_id: 1,
					title: 1,
					images: 1,
					"organization._id": 1,
					"organization.name": 1,
					review_count: 1,
					satisfactory_rating: 1,
					min_price: 1,
				},
			},
		]);

		res.json({ randomSuggestions: randomSuggestions });
	} catch (e) {
		console.error(e);
		res.status(500).json({
			error: {
				code: 500,
				error_ref: 10,
				message: "Internal Service Error. Failed to generate suggestions",
				trace_back: e,
			},
		});
	}
});

module.exports = router;
