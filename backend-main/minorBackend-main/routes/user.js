const express = require("express");
const zod = require("zod");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

const { User } = require("../db/db");
const { authMiddleware } = require("../middlewares/authMiddleware");


const signupSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
  phone: zod.number(),
});


router.post("/verify-token", async (req, res) => {
  const authHeader = req.headers.authorization;


  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    res.json({ message: "Token verified",name: user.firstname });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});

// ✅ User Details Route
router.get("/details", authMiddleware, async (req, res) => {
  try {
    console.log("Finding the user");
    const user = await User.findById(req.userId);
    if (user) {
      return res.json({
        name: user.firstname,
        email: user.email,
      });
    } else {
      return res.json({
        message: "User not found",
      });
    }
  } catch (error) {
    return res.json({
      message: "Error while fetching the user",
    });
  }
});

// ✅ Signup Route
router.post("/signup", async (req, res) => {
  const body = req.body;
  const data = signupSchema.safeParse(body);

  if (!data.success) {
    return res.status(400).json({ message: "Email already taken/Incorrect inputs" });
  }

  const user = await User.findOne({ email: body.email });

  if (user) {
    return res.status(400).json({ message: "Email already taken" });
  }

  try {
    const hashedPassword = await bcrypt.hash(body.password, 8);
    body.password = hashedPassword;

    const dbUser = await User.create(body);
    const token = jwt.sign({ userId: dbUser._id }, JWT_SECRET, { expiresIn: "7d" });

    return res.status(201).json({ message: "User created successfully", token, name: dbUser.firstname });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Signin Route
const signinBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.status(411).json({
      message: "User not found",
    });
  }

  const passwordCheck = await bcrypt.compare(req.body.password, user.password);
  if (passwordCheck) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      name: user.firstname,
    });
    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

// ✅ Update User Route
const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/update", authMiddleware, async (req, res) => {
  console.log(req.body);
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully",
  });
});

module.exports = router;
