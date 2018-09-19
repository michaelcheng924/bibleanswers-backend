const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost/bibleanswers",
  { useNewUrlParser: true }
);

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());

var postSchema = new mongoose.Schema({
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

app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

app.get("/api/posts", function(req, res) {
  res.set("Content-Type", "application/json");

  Post.find({}, (err, posts) => {
    res.send({
      posts
    });
  });
});

app.post("/api/posts", function(req, res) {
  const post = new Post(req.body);
  post.save(() => {
    res.send({ post });
  });
});

app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "../react-ui/build", "index.html"));
});

app.listen(PORT, function() {
  console.error(`Server listening on port ${PORT}`);
});
