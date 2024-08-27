// implemented crud operations on student.txt file
// first intialize the node js using `npm init -y` command
// then install node_modules using command `npm i express body-parser`
// contains methods like : add, get, update
// run the file using `node server.js` command
// it starts on localhost:3000 port
// test the api calls using postman or thunder cliend
// get all students - url : http://localhost:3000/get-student method : GET
// get student with name - url : http://localhost:3000/get-student?name=Max method : GET
// add student - url : http://localhost:3000/add-student method : POST with some json data similar to the below one
// {
//     "name": "Bruce",
//     "rollNo": 1,
//     "mid1": {
//       "telugu": 88,
//       "hindi": 82,
//       "english": 78
//     },
//     "mid2": {
//       "history": 80,
//       "geography": 90,
//       "civics": 80
//     },
//     "mid3": {
//       "physics": 85,
//       "chemistry": 90,
//       "biology": 85
//     }

// Update student details using url : http://localhost:3000/update-student method : PUT with some json data similar to the below one
// {
//     "name": "Max",
//     "rollNo": 558,
//     "marks": {
//         "maths": 60,
//         "physics": 70,
//         "chemistry": 54
//     }
// }

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(bodyParser.json());

function readStudents() {
  if (fs.existsSync("students.txt")) {
    const data = fs.readFileSync("students.txt", "utf8");
    console.log(JSON.parse(data));
    return JSON.parse(data);
  }
  return [];
}

function writeStudents(students) {
  fs.writeFileSync("students.txt", JSON.stringify(students, null, 2));
}

app.post("/add-student", (req, res) => {
  const students = readStudents();
  console.log(req.body);
  const student = req.body;

  const exists = students.some((s) => s.rollNo === student.rollNo);
  console.log(exists);
  if (exists) {
    return res.json({
      success: false,
      message: "Student with this roll number already exists",
    });
  }

  students.push(student);
  writeStudents(students);

  res.json({
    success: true,
    message: "Student added successfully",
    data: [student],
  });
});

app.get("/get-student", (req, res) => {
  const students = readStudents();
  const { name } = req.query;
  console.log(name);

  const student = students.find((s) => s.name === name);
  if (!student) {
    return res.json({
      success: false,
      message: `Student with name ${name} not found`,
    });
  }

  res.json({
    success: true,
    message: `${name} details fetched successfully`,
    data: student,
  });
});

app.put("/update-student", (req, res) => {
  const students = readStudents();
  const updatedStudent = req.body;
  console.log(req.body);

  const index = students.findIndex((s) => s.rollNo === updatedStudent.rollNo);
  if (index === -1) {
    return res.json({
      success: false,
      message: `Student with roll number ${updatedStudent.rollNo} not found`,
    });
  }

  students[index].marks = updatedStudent.marks;
  writeStudents(students);

  res.json({
    success: true,
    message: `${updatedStudent.name} details updated successfully`,
    data: students[index],
  });
});

app.get("/get-all-students", (req, res) => {
  const students = readStudents();
  console.log(readStudents());
  res.json({
    success: true,
    message: "All students fetched successfully",
    data: students,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
