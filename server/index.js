const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://heroku_xh6ll6gg:t3osessavn6r7dqhjeeis0p810@ds163382.mlab.com:63382/heroku_xh6ll6gg" ||
    process.env.MONGODB_URI,
  { useNewUrlParser: true }
);

const PORT = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json());

var postSchema = new mongoose.Schema({
  uid: String,
  title: String,
  subtitle: String,
  imageUrl: String,
  imagePosition: String,
  tags: Array,
  url: String,
  added: String,
  updated: String,
  content: String
});

var Post = mongoose.model("Post", postSchema);

// var post = new Post({
//   title: "What is the Gospel?",
//   subtitle: "Learn the basics of the Bible, God, sin, Jesus, and salvation",
//   imageUrl: "../../static/cover-gospel.jpeg",
//   imagePosition: "79% 50%",
//   tags: ["gospel"],
//   url: "/gospel",
//   added: "9/15/18",
//   content: "Hello world"
// });

app.use(express.static(path.resolve(__dirname, "../react-ui/public")));

app.get("/api/posts", cors(), function(req, res) {
  Post.find({}, (err, posts) => {
    res.send({
      posts
    });
  });
});

app.get("/api/posts/:uid", cors(), function(req, res) {
  Post.findOne({ uid: req.params.uid }, (err, post) => {
    res.send({
      post
    });
  });
});

app.post("/api/posts", function(req, res) {
  const post = new Post(req.body);
  post.save(() => {
    res.send({ post });
  });
});

app.patch("/api/posts/:id", function(req, res) {
  Post.update({ _id: req.params.id }, req.body, () => {
    res.send({ success: true });
  });
});

app.delete("/api/post/:id", function(req, res) {
  Post.deleteOne({ _id: req.params.id }, () => {
    res.send({ success: true });
  });
});

app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "../react-ui/build", "index.html"));
});

app.listen(PORT, function() {
  console.error(`Server listening on port ${PORT}`);
});
