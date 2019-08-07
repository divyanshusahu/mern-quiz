const express = require("express");
const router = express.Router();

const Test = require("../../models/Test");

router.post("/create_test", (req, res) => {
  Test.findOne({ test_name: req.body.test_name }).then(test => {
    if (test) {
      return res.json({ status: "Quiz Name already exist" });
    }
    const newTest = new Test({
      test_name: req.body.test_name,
      owner_email: req.body.owner_email
    });
    newTest
      .save()
      .then((test) => res.json({ status: "Success", t: test }))
      .catch(() => res.json({ status: "Failed" }));
  });
});

module.exports = router;
