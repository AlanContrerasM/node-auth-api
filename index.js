const cors = require('cors');
const express = require('express');
const {success, error} = require('consola');
const {connect} = require('mongoose');

//bring in app constant
const {DB, PORT} = require('./config');

//intialize app
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const startApp = async () => {

    try{
        //connection with db
        await connect(DB);

        success({
            message: `successfully connected to DB \n ${DB}`, 
            badge: true
        })
        
        //now listen for the server on PORT
        app.listen(PORT, ()=>{
            success({message: `server started on PORT ${PORT}`, badge: true})
        })

    } catch (err){
        startApp();
        error({
            message: `unable to connect to DB \n ${err}`, 
            badge: true
        })
    }
    
};

startApp();