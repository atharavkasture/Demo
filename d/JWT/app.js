// IAT: Unix timestamp for when the token was created
const express = require('express')
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("/",function(req,res){
    // let token = jwt.sign({email: "abc@gmail.com"},"secret"); //by default header part is decided in the sign function (by default {algo:HS512, typ:jwt} is present)
    //We can also give the header part explicitly
    let token = jwt.sign(
        { email: "abc@gmail.com" },  // Payload (data)
        "secret",                    // Secret key
        { 
          algorithm: "HS512",        // Custom header options (e.g., different algorithm)
          expiresIn: "1h"            // Expiration time as an additional option
        }
      );
    console.log(token);
    res.cookie("token",token);
    res.send("done");
})

app.get("/read",function(req,res){
    console.log(req.cookies.token);
    let data = jwt.verify(req.cookies.token,"secret"); 
    console.log(data);
    res.send("Done again")
})

app.listen(3000,function(){
    console.log("Server is running on port http://localhost:3000");
});