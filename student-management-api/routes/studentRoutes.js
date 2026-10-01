const express = require("express");
const router = express.Router();
let students = require("../data/students");

// GET /students - Fetch all students
router.get("/", (req, res) => {
  res.status(200).json(students);
});

// GET /students/:id - Fetch student by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid student ID format" });
  }

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(student);
});

// POST /students - Create a new student
router.post("/", (req, res) => {
  const { name, age, course } = req.body;

  if (!name || !age || !course) {
    return res.status(400).json({ message: "Please provide name, age, and course" });
  }

  const newStudent = {
    id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
    name,
    age: Number(age),
    course
  };

  students.push(newStudent);
  res.status(201).json({ message: "Student created successfully", student: newStudent });
});

// PUT /students/:id - Update student by ID
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid student ID format" });
  }

  const studentIndex = students.findIndex((s) => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const { name, age, course } = req.body;

  if (!name && !age && !course) {
    return res.status(400).json({ message: "Provide at least one field (name, age, or course) to update" });
  }

  students[studentIndex] = {
    ...students[studentIndex],
    ...(name && { name }),
    ...(age && { age: Number(age) }),
    ...(course && { course })
  };

  res.status(200).json({ message: "Student updated successfully", student: students[studentIndex] });
});

// DELETE /students/:id - Remove student by ID
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid student ID format" });
  }

  const studentIndex = students.findIndex((s) => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deletedStudent = students.splice(studentIndex, 1);
  res.status(200).json({ message: "Student deleted successfully", student: deletedStudent[0] });
});

module.exports = router;