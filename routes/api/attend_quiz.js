const express = require("express");
const router = express.Router();

const Test = require("../../models/Test");

router.get("/test/:name", (req, res) => {
  Test.findOne({ test_name: req.params.name }).then((test) => {
    if (test) {
      return res.json({ test: test });
    }
  });
});

module.exports = router;