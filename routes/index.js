const express = require('express');
const knex = require("../db");
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {


  res.render('index', { title: 'Express' });

});

router.post("/sign_in", (request, response) => {

  console.log(request.body);

  response.cookie("username", request.body.username );
  response.redirect("/post");
});

router.get('/post', function(req, res, next) {
  knex
    .select("*")
    .from("posts")
    .orderBy("created_at","DESC")
    .then(
      (posts) => {
        console.log(posts)
        res.render("post", {posts: posts, title:'Express'});
      }
    )

});



router.post("/sign_out", (request, response) => {
  response.clearCookie("username");
  response.redirect("/");
});

// Cluck method

router.post("/cluck", (request, response) =>{


  const imgurl= request.body.imgurl
  const contents= request.body.contents
  const username = request.cookies.username

  knex
      .insert({
        username: username,
        image_url: imgurl,
        content: contents
      })
      .into("posts")
      .then(() => {

        response.redirect("/post")
      });
})





module.exports = router;
