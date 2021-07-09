const express = require("express");
const router = express.Router();
// const authController = require("../controllers/auth")
// const { validateCookie } = require('../controllers/auth');


router.get("/register", (req, res) => {
  res.render("partials/register");
});

// router.post("/register", authController.register)

router.get("/login", (req, res) => {
  res.render("partials/login");
});

// router.post("/login",authController.login);

router.get("/profile", (req, res) => {
  res.render("partials/profile");
});

/*
router.get("/logout", authController.logout, async (req, res) => {
  try{
    console.log(req.token);
    res.clearCookie("jwt");
    res.render("partials/logout");
  }
  catch(err)
  {
    console.log(err);
  }
});
*/
module.exports = router;
