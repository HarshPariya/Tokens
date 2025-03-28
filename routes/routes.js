const route = require("express").Router()
const {login,register,home,dashboard}= require("../controllers/Api")

route.get('/home',home);
route.get('/dashboard',dashboard);
route.post('/register',register);
route.post('/login',login);

module.exports = route;