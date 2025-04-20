import express from 'express';
// const cors = require('cors');
import cors from 'cors';
const app = express();

//const PORT = 3000;
app.use(cors());
app.get('/api',(req,res)=>{
    res.json("this is it");
});


app.post('/api/transaction',(req,res)=>{
    res.json(req.body);
})



app.listen(3000 ,()=>{
   console.log('server is choling')
});

