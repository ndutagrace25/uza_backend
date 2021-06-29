const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "POST, GET, OPTIONS, DELETE, PUT, PATCH"
            );
    next();
});

app.use(
    bodyParser.urlencoded({
        extended: true,
        limit:"10gb",
    })
);
app.use(
    bodyParser.json({
        limit:"10gb"
    })
);

const {
    businesses,
    requests,
    categories,
    products,
    users
} = require("./routes");

app.use("/businesses", businesses);
app.use("/requests", requests);
app.use("/categories", categories);
app.use("/products", products);
app.use("/users", users);
module.exports = app;