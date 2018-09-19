import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    post: null,
    posts: [],
    showCreate: false,
    showPosts: true
  };

  componentDidMount() {
    fetch("/api/posts")
      .then(r => r.json())
      .then(json => {
        this.setState({ posts: json.posts });
      });
  }

  createPost = event => {
    event.preventDefault();

    fetch("/api/posts", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: this.title.value,
        subtitle: this.subtitle.value,
        imageUrl: this.imageUrl.value,
        imagePosition: this.imagePosition.value,
        tags: [this.tag.value],
        url: this.url.value,
        added: this.added.value,
        content: this.content.value
      })
    });
  };

  renderPosts() {
    if (!this.state.showPosts) {
      return null;
    }

    return (
      <div>
        <button
          onClick={() => this.setState({ showPosts: false, showCreate: true })}
        >
          Create Post
        </button>
        {this.state.posts.map(post => {
          return (
            <div
              onClick={() =>
                this.setState({
                  post,
                  showPosts: false
                })
              }
            >
              {post.title}
            </div>
          );
        })}
      </div>
    );
  }

  renderPost() {
    if (!this.state.post) {
      return null;
    }

    const {
      title,
      subtitle,
      imageUrl,
      imagePosition,
      tags,
      url,
      added,
      updated,
      content
    } = this.state.post;

    return (
      <div>
        <button
          onClick={() =>
            this.setState({ post: null, showPosts: true, showCreate: false })
          }
        >
          All Posts
        </button>
        <div>{title}</div>
        <div>{subtitle}</div>
        <div>{imageUrl}</div>
        <div>{imagePosition}</div>
        <div>{tags}</div>
        <div>{url}</div>
        <div>{added}</div>
        <div>{updated}</div>
        <div>{content}</div>
      </div>
    );
  }

  renderCreateForm() {
    if (!this.state.showCreate) {
      return null;
    }

    return (
      <form onSubmit={this.createPost}>
        <div>
          <input placeholder="Title" ref={title => (this.title = title)} />
        </div>
        <div>
          <input
            placeholder="Subtitle"
            ref={subtitle => (this.subtitle = subtitle)}
          />
        </div>
        <div>
          <input
            placeholder="Image URL"
            ref={imageUrl => (this.imageUrl = imageUrl)}
          />
        </div>
        <div>
          <input
            placeholder="Image Position"
            ref={imagePosition => (this.imagePosition = imagePosition)}
            defaultValue="79% 50%"
          />
        </div>
        <div>
          <input placeholder="URL" ref={url => (this.url = url)} />
        </div>
        <div>
          <input placeholder="Added Date" ref={added => (this.added = added)} />
        </div>
        <div>
          <input
            placeholder="Content"
            ref={content => (this.content = content)}
          />
        </div>
        {/* <div><input
            placeholder="Updated Date"
            ref={updated => (this.updated = updated)}
          /></div> */}
        <div>
          <input placeholder="Tag" ref={tag => (this.tag = tag)} />
        </div>
        <button>Submit</button>
      </form>
    );
  }

  render() {
    return (
      <div>
        {this.renderPosts()}
        {this.renderPost()}
        {this.renderCreateForm()}
      </div>
    );
  }
}

export default App;
