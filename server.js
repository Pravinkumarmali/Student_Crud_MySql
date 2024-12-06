const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mysql_pool = require("./config/db");
const { use } = require("./routes/studentRoutes");

// configure dotenv
// dotenv.config({path:})
dotenv.config();

// rest object
const app = express();

// middleware
app.use(express.json()); // json data ko recive karne ke liye.
app.use(morgan("dev"));

// routes
app.use("/api/v1/student", require("./routes/studentRoutes"));

app.get("/test", (req,res)=>{
    res.status(200).send("<h1>Nodejs Mysql Crud App.</h1>")
});

// port
// const PORT = 8080;
// const PORT = process.env.PORT;
const PORT = process.env.PORT || 8000;


// conditionaly listen
mysql_pool.query('SELECT 1').then(()=>{

    console.log("MYSQL DB is connected.");
    
// listen
    app.listen(PORT, ()=>{
        // console.log("SERVER IS RUNNING.")
        console.log(`Server is Running on port ${process.env.PORT}`);
    
    });
}).catch((error)=>{
    console.log(error);
    
});


// listen
// app.listen(PORT, ()=>{
//     // console.log("SERVER IS RUNNING.")
//     console.log(`Server is Running on port ${process.env.PORT}`);
    
// })
