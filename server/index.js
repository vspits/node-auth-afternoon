
// // // IMPORTS // // // 

const express = require('express')
require('dotenv').config()
const session = require('express-session')
const massive = require('massive')
const {json} = require('body-parser')
const auth_ctrl = require('./controllers/auth_controller')

const app = express()
const {CONNECTION_STRING, SESSION_SECRET} = process.env


// // // MIDDLEWARE // // //

app.use(json())
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
}))
massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
})


// // // ENDPOINTS // // //

app.post(`/auth/login`, auth_ctrl.login)
app.post('/auth/register', auth_ctrl.register)
app.get('/auth/logout', auth_ctrl.logout)



// // // SERVER MAGIC // // //

const port = 4000
app.listen(port, ()=> console.log(`${port} is werking hard`))
