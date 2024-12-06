// GET ALL STUDENT LIST

const db = require("../config/db");

// GET ALL STUDENTS
const getAllStudents = async (req,res) => {
    try {
        const [data] = await db.query("SELECT * FROM students");
        if(!data){
            return res.status(404).send({
                success: false,
                message: "No Record Found.",
            });
        }
        res.status(200).send({
            success: true,
            message: "All Students Record",
            totalStudents: data.length,
            data,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get All student API.",
            error
        })
        
    }
};

// GET STUDENT BY ID
const getStudentByID = async (req,res) => {
    try {
        const studentId = req.params.id;
        if(!studentId){
            return res.status(404).send({
                success: false,
                message: "Invalid Or Provide Student id",
            })
        }

        // const data = await db.query(`SELECT * FROM students WHERE id=+studentId`);
        const [data] = await db.query(`SELECT * FROM students WHERE id=?`,[studentId]);
        if (!data) {
            return res.status(404).send({
                success: false,
                message: "No Record Found",
            })
        }
        res.status(200).send({
            success: true,
            message: "Student get by id.",
            data,

        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get student by ID API.",
            error,
        })
        
    }
};

// CREATE STUDENT
const createStudent = async (req,res) => {
    try {
        const {name, roll_no, fees, class_, medium} = req.body;
        if(!name || !roll_no || !fees || !class_ || !medium){
            return res.status(500).send({
                success : false,
                message: "Please Provide all fields",
            });
        }

        const data = await db.query(`INSERT INTO students (name, roll_no, fees, class_, medium) VALUES (?, ?, ?, ?, ?)`, [name, roll_no, fees, class_, medium]);
        if(!data){
            return res.send({
                success: false,
                message: "Error In INSERT Query.",
            })
        }

        res.status(201).send({
            success: true,
            message: "New Student Record Created.",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Create student API.",
            error,
        })
    }

};

// UPDATE STUDENT
const updateStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        if(!studentId){
            return res.status(404).send({
                success: false,
                message: "Invaild ID or provide ID",
            })
        }

        const {name, roll_no, fees, class_, medium} = req.body;
        const data = await db.query(`UPDATE students SET name = ?, roll_no = ?, fees = ?, class_ = ?, medium = ? WHERE id = ?`, [name, roll_no, fees, class_, medium, studentId])
        if(!data){
            return res.status(500).send({
                success: false,
                message: "Error In Update Data",
            })
        }
        res.status(200).send({
            success: true,
            message: "Student Details Updated."
        });

    } catch (error) {
        console.log(error);
        res.send({
            success:false,
            message: "Error In Update Student API",
            error,
        })
        
    }
};

// DELETE STUDENT
const deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        if(!studentId){
            return res.status(404).send({
                success: false,
                message: "Please Provide Student ID or Valid Student ID."
            })
        }
        await db.query(`DELETE FROM students WHERE id = ?`, [studentId]);
        res.status(200).send({
            success: true,
            message: "Student Deleted Successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Delete Student API.",
            error,
        })
        
    }
};

module.exports = { getAllStudents, getStudentByID, createStudent, updateStudent, deleteStudent };

