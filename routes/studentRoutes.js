const express = require("express");
const { getAllStudents, getStudentByID, createStudent, updateStudent, deleteStudent } = require("../controllers/studentController");

// router object
const router =  express.Router();

// routes

// GET ALL STUDENT LIST || method: GET
router.get("/getall", getAllStudents); 

// GET STUDENT BY ID 
router.get("/get/:id", getStudentByID);

// CREATE STUDENT
router.post("/create", createStudent);

// UPDATE STUDENT
router.put("/update/:id", updateStudent);

// DELETE  STUDENT
router.delete("/delete/:id",deleteStudent)

module.exports = router;