const express = require("express");
const router = express.Router();

const Test = require("../../models/Test");

router.post("/list_by_email", (req, res) => {
  Test.find({owner_email: req.body.owner_email}).then((tests) => {
    if (tests) {
      return res.json({ list_by_email: tests });
    }
  });
});

router.get("/list_tests", (req, res) => {
  Test.find({}).then((tests) => {
    if (tests) {
      return res.json({ tests: tests });
    }
  });
});

module.exports = router;