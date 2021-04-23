//Where the server will run with express
//creating express server

const express = require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const app = express();
const mysql = require('mysql');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res)=>{
    const sqlinsert="DELETE FROM users WHERE id=3";
    db.query(sqlinsert,(err,result)=>{
        res.send("did it!");
    })
})

app.post('/register', (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const sqlinsert="INSERT INTO users (username, password) VALUES (?,?)";
    db.query(sqlinsert,[username,password],(err,result)=>{
        console.log(err);
    })
})

app.post('/login', (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const sqlinsert="SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(sqlinsert,[username,password],(err,result)=>{
        if(err) {
            res.send({err: err}) //if it sends an error its not going to the next if statment
        } 
         if(result.length>0) {
            res.send(result)
        } else {
            res.send({message: "Wrong username/password"})
        }
    })
})

const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sean0342591', //Importent to pay attention to that!!!
    database:  'loginsystem'
});



app.listen(3001, () => {
    console.log('running on port 3001');
});