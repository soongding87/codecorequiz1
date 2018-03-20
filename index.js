const path = require("path")
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const index = require("./routes/index");

const app = express();
app.set("view engine", "ejs");

app.use(morgan("dev"));


// Cookie Parser
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
// Body Parser
app.use(bodyParser.urlencoded({extended: true}));

// Custom Middleware

app.use((request, response, next) => {
  // To read cookies, use `request.cookies`.
  // This is added by "cookie-parser". It contains
  // an object with cookie names as keys and their values.
  const username = request.cookies.username;
  console.log(request.cookies);

  response.locals.username = null;

  if (username) {
    // All properties of the `response.locals` object are
    // available as variables inside all templates that
    // our app renders.
    response.locals.username = username;
  }
  // When creating middleware, you must call next() when
  // your middleware has finished. This tells Express to call
  // the next middleware. If next() is never called, the client
  // will load forever, because Express will never send a response.
  next();
});


app.use("/", index);



const DOMAIN = "localhost";
const PORT = 3002;

app.listen(PORT, DOMAIN, () => {
  console.log(`ð» Server listenning on http://${DOMAIN}:${PORT}`);
});
