/*
 const db = require("../db/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require("express");

exports.register = async (req, res) => {
  const { username, email, password1, password2 } = req.body;

  db.db.query(
    "Select username,email from Users where email = ? or username = ?",
    [email, username],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        return res.render("partials/register", {
          message: "Email or username already taken",
        });
      } else if (password1 !== password2) {
        return res.render("partials/register", {
          message: "Passwords do not match",
        });
      }
    }
  );
  let secret_password = await bcrypt.hash(password1, 8);
  db.db.query(
    "Insert into users (username,email,password) values ( ? , ? , ? )",
    [username, email, secret_password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        return res.render("partials/register", {
          message: "User registered",
        });
      }
    }
  );
};

exports.login = async (req, response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return response.render("partials/login", {
        message: "Username and Password must be non empty",
      });
    }

    db.db.query(
      "Select * from users where username = ?",
      [username],
      async (err, res) => {
        if (
          res.length == 0 ||
          !(await bcrypt.compare(password, res[0].password))
        ) {
          return response.status(401).render("partials/login", {
            message: "Username or Password is incorrect",
          });
        } else {
          const id = res[0].id;
          const token = jwt.sign({ id: id }, "secret", {
            expiresIn: 6000000,
          });
          const cookieOptions = {
            maxAge: new Date(Date.now() + 6000 * 1000),
            httpOnly: true,
            expiresIn: 6000000,
          };
          response.cookie("jwt", token, cookieOptions);
          response.status(200).redirect("/");
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.validateCookie = async function (req, res, next) {
  try {
    const token = req.cookies.jwt;
    const verify = await jwt.verify(token, "secret");
    const id = verify.id;
    db.db.query(
      "Select id from users where id = ?",
      [id],
      (err, result) => {
        console.log(err);
        if (err || result.length <= 0) {
          return res.status(401).render("partials/login");
        }
      }
    );
    next();
  } catch (err) {
    console.log(there);
    return res.render("partials/login");
  }
};

exports.logout = async function (req, res, next) {
  try {
    const token = req.cookies.jwt;
    const verify = await jwt.verify(token, "secret");
    db.db.query(
      "Select id from users where id = ?",
      [verify],
      (err, result) => {
        if (err || result.length <= 0) {
          return res.status(401).render("partials/login");
        }
        req.token = token;
      }
    );
    next();
  } catch (err) {
    return res.render("partials/login");
  }
  res.clearCookie("jwt");
  await req.user.save();
  next();
};
// CREATE TABLE users (  id INTEGER auto_increment PRIMARY KEY,  username varchar(45) NOT NULL,  email varchar(45) not null,  password varchar(70) not null,  name varchar(45),  rating INTEGER default 0,  is_superuser boolean default false);
*/