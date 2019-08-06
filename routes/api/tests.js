const express = require("express");
const router = express.Router();

const Test = require("../../models/Test");

router.post("/create_test", (req, res) => {
  const newTest = new Test({
    test_name: req.body.test_name,
    owner_email: req.body.email,
    questions: req.body.questions
  });

  newTest.save().then(req => res.json({ status: "Success" }));
});

module.exports = router;
