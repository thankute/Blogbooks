const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/User");
const {
  registerValidation,
  loginValidation,
} = require("../middleware/validation");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login", { layout: "login", message: req.session.message });
});

router.get("/register", (req, res) => {
  res.render("register", { layout: "login", message: req.session.message });
});

// [POST] /auth/login
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    console.log("Khong tim thay tai khoan, hay dang ki!");
    return res.redirect("/auth/login");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.redirect("/auth/login");
  }
  req.session.user = user
  req.session.isAuth = true;
  res.redirect("/");
  console.log(req.session.user)
  req.session.save();
});

// [POST] /auth/register
router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    //return res.status(400).send(error.details[0].message);
    req.session.message = error.details[0].message;
    return res.redirect("back");
  }

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("Email already exist!");
  }
  try {
    req.session.username = req.body.name;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res.redirect("/");
  } catch (err) {
    res.status(400).send({ err: err });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/auth/login");
  });
});

module.exports = router;
