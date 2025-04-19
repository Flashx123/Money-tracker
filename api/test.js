import express from 'express';
const app = express();

//const PORT = 3000;
app.get('/api',(req,res)=>{
    res.json("this is it");
});


app.post('/api/transaction',(req,res)=>{
    
})



app.listen(3000 ,()=>{
   console.log('server is choling')
});

