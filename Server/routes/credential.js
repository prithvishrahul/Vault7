const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");

const Credential = require("../model/Credential");

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
  "/store",
  [
  ],
  async (req, res) => {
    console.log(req.body);

    const { type, email, password,username } = req.body;
    try {

      let credential = new Credential({
        type,
        email,
        password,
        username
      });
      await credential.save();

      const payload = {
        credential: {
          id: credential.id
        }
      };
      res.status(200).json({ok:true});
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

router.post(
  "/retrive",
  [
  ],
  async (req, res) => {
    const { username } = req.body;
    try {
      let credentials = await Credential.find({
        username
      });
      if (credentials.length===0)
        return res.status(200).json({
          message: " No Credential Exist"
        });

      const payload = {credentials}
      res.status(200).json({payload})
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

module.exports = router;
