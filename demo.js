const express= require("express");
const app=express();
const mysql=require ("mysql");
const port=2001;

const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"murvezunnisa",
    database:"demo_db"
})
connection.connect((err)=>{
    if(err){
        console.log("error ",err);
    }
    else
        console.log("connected to 2001")
})    


app.get("/",(req,res)=>{
    res.send("sample")
})
app.get("/showdata",(req,res)=>{
    connection.query(`SELECT * from employee`,(err,result)=>{
        if(err)
           return res.send(err)
        else 
           return res.json(result)
    })
})
app.get("/adddata",(req,res)=>{
    const{name,job}=req.query;
    const insert=`insert into employee(name,job) values("${name}","${job}")`
    connection.query(insert,(err,result)=>{
        if(err)
           return res.send(err)
        else
           return res.send("added successfully")   
    })
})
app.get("/deletedata",(req,res)=>{
    const {id}=req.query;
    connection.query(`delete from employee where id=${id}`,(err,result)=>{
        if(err)
          return res.send(err)
        else
          return res.send("deleted successfully")  
    })
})


//UPDATE table_name SET column1 = value1 WHERE condition;

app.put("/updatedata",(req,res)=>{
    const {id,name}=req.query;
    const update=`update employee set name="${name}" where id=${id}`;
    connection.query(update,(err,result)=>{
        if(err)
           return res.send(err)
        else
           return res.send("updated successfully")   
    })
})



app.listen(port,()=>console.log("server is running...."))