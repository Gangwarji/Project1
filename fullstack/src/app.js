const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn");
const Register = require("./modules/registers");
const register = require("./modules/registers");

const port = process.env.PORT || 3000;

//----path of directory
const static_path = path.join(__dirname, "../public");
const image_path = path.join(__dirname, "../image");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

// app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.use(express.static(image_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

app.get ("/" ,(req,res) => {
    res.render("index");
});

app.get("/about", (req,res) => {
    res.render("about");
});

app.get ("/register" ,(req,res) => {
    res.render("register");
});

// creating a new database 

app.post ("/register" , async (req,res) => {
    try{
       
        // res.send(req.body);
        const registereData = new register(req.body);
        await registereData.save();
        res.status(201).render("index");

    } catch(error) {
        res.status(400).send(error);
    }
});

//----listen at port no
app.listen( port, () => {
    console.log('the server is connected at ' + port);
});