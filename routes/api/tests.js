const express = require("express");
const router = express.Router();

const Test = require("../../models/Test");

router.post("/create_test", (req, res) => {
  Test.findOne({ test_name: req.body.test_name }).then(test => {
    if (test) {
      return res.json({ status: "Quiz Name already exist", test: test });
    }
    const newTest = new Test({
      test_name: req.body.test_name,
      owner_email: req.body.owner_email
    });
    newTest
      .save()
      .then(test => res.json({ status: "Success", test: test }))
      .catch(() => res.json({ status: "Failed" }));
  });
});

router.post("/list_by_email", (req, res) => {
  Test.find({ owner_email: req.body.owner_email }).then(tests => {
    if (tests) {
      return res.json({ list_by_email: tests });
    }
  });
});

router.get("/list_tests", (req, res) => {
  Test.find({}).then(tests => {
    if (tests) {
      return res.json({ tests: tests });
    }
  });
});

router.get("/test/:name", (req, res) => {
  Test.findOne({ test_name: req.params.name }).then(test => {
    if (test) {
      return res.json({ test: test });
    }
  });
});

router.post("/add_question", (req, res) => {
  var options = [
    req.body.option_1,
    req.body.option_2,
    req.body.option_3,
    req.body.option_4
  ];
  var answer = req.body.answer.replace(" ", "").split(",");
  const newQuestion = {
    question_body: req.body.question_body,
    options: options,
    answers: answer
  };
  var insert_question;
  Test.findOne({ test_name: req.body.test_name }).then(test => {
    insert_question = test.questions;
    insert_question.push(newQuestion);
    console.log(insert_question);
    Test.findOneAndUpdate(
      { test_name: req.body.test_name },
      { $set: { questions: insert_question } },
      { useFindAndModify: false }
    ).then(test => {
      return res.json({ status: "Success" });
    });
  });
});

module.exports = router;
