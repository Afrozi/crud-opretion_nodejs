const express = require('express');
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8000;
require('./db/connect');
const objdata = require('./model/model');
const path = require('path');
const staticpath = path.join(__dirname,'../template/views');
app.set('views',staticpath);
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.render('signup');
})
const userdata = objdata.find({});
app.post('/empdata',async(req,res)=>{
 try {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const phone = req.body.phone;

    const database = new objdata({
        firstname:firstname,
        lastname:lastname,
        phone:phone,    
    });
    await database.save();
    userdata.exec(function(error, data){
        if (error) {
            console.log(error);
        }
        res.render('index',{record: data});
    })
 } catch (error) {
    res.status(401).send(error);
 }

})

app.get('/update',async(req,res)=>{
    res.render('update');
})

app.post("/updatedata", async(req,res)=>{
    
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const phone = req.body.phone;

    const postupdate = new objdata({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        phone:req.body.phone,
    });
    const getupdate = await objdata.updateMany([{firstname:firstname},{lastname:lastname},{phone:phone}]);
    if (getupdate === fi) {
        res.render('index');
    }else{
        res.send("your data has been not update");
    }
})

app.delete('/delete',async(req,res)=>{
    objdata.findByIdAndDelete((req.body.element.id),function (err,data) {
        if (err) {
            console.log(err);
        }
        else{
            res.send(data);
            console.log(data);
        }
    })
    res.render('index');
})

// app.post('/login',async(req,res)=>{
//     try {
//         const firstname = req.body.firstname;
//         const phone = req.body.phone;
    
//     const getname = await objdata.findOne({firstname:firstname});
//         // console.log(getname);
//         // res.send(getname);
//     //  if (getname.phone === phone) {
//     //        res.render('index');
//     //  }
//     //  else{
//     //      res.send('phone are not matching....');
//     //  }
//     } catch (error) {
//         res.send(error);
//     }
// })
app.listen(port,()=>{
    console.log('conncetd');
})

