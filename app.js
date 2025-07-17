const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session= require("express-session");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const flash=require("connect-flash");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions={
  secret:"MySecret",
  resave:false,
  saveUninitialized:true
}


const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(400, errMsg);
  }
  next();
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
  req.locals.success=req.flash("success");
  next();
});

const listingRoute = require("./routes/listings.js");
const reviewRoute = require("./routes/reviews.js");

app.use("/listings", listingRoute);
app.use("/listings/:id/reviews", reviewRoute);
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});
app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("error.ejs", { err });
});

app.listen(3000, () => {
  console.log("server is listening to port 3000");
});
