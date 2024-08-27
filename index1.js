const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Student = require("./Usermodels");
const Marks = require("./MarksModal");

const app = express();

app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/student")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

app.post("/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).send(students);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/students/:rollNo", async (req, res) => {
  try {
    const student = await Student.findOne({ rollNo: req.params.rollNo });
    if (!student) {
      return res.status(404).send({ error: "Student not found" });
    }
    res.status(200).send(student);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.patch("/students/:rollNo", async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { rollNo: req.params.rollNo },
      req.body,
      { new: true, runValidators: true }
    );
    if (!student) {
      return res.status(404).send({ error: "Student not found" });
    }
    res.status(200).send(student);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.delete("/students/:rollNo", async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({
      rollNo: req.params.rollNo,
    });
    if (!student) {
      return res.status(404).send({ error: "Student not found" });
    }
    res.status(200).send({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// CRUD Operations for Marks

app.post("/marks", async (req, res) => {
  try {
    const marks = new Marks(req.body);
    await marks.save();
    res.status(201).send(marks);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.get("/marks", async (req, res) => {
  try {
    const marks = await Marks.find();
    res.status(200).send(marks);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/marks/:rollNo", async (req, res) => {
  try {
    const marks = await Marks.findOne({ rollNo: req.params.rollNo });
    if (!marks) {
      return res.status(404).send({ error: "Marks not found" });
    }
    res.status(200).send(marks);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.patch("/marks/:rollNo", async (req, res) => {
  try {
    const marks = await Marks.findOneAndUpdate(
      { rollNo: req.params.rollNo },
      req.body,
      { new: true, runValidators: true }
    );
    if (!marks) {
      return res.status(404).send({ error: "Marks not found" });
    }
    res.status(200).send(marks);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.delete("/marks/:rollNo", async (req, res) => {
  try {
    const marks = await Marks.findOneAndDelete({ rollNo: req.params.rollNo });
    if (!marks) {
      return res.status(404).send({ error: "Marks not found" });
    }
    res.status(200).send({ message: "Marks deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
