const express = require("express");
const passportConfig = require("../passport/passportConfig")
const {getUser} = require("../controllers/usersControllers")
const multer  = require('multer')
const upload = multer({ dest: 'public/avatars/' })

const app = express();
const { Router } = express;
const router = new Router();

//GET LOGIN
router.get("/", getUser);

//POST LOGIN
router.post("/", passportConfig.authenticate("local-login",{
  successRedirect:"/index.html",
  failureRedirect:"/loginError.html"
}))

//PUT LOGOUT
router.put("/", (req, res) => {
    req.logout();
    res.redirect('/')
  });

  //POST REGISTER LOCALSIGNUP
router.post("/new/", upload.single('avatar'), passportConfig.authenticate("local-signup",{
    successRedirect:"/login.html",
    failureRedirect:"/registerError.html"
}))
  
//EXPORT MODULO ROUTER
module.exports = router;
