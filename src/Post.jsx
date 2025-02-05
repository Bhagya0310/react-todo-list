import React, { useState } from 'react';
// import marked from 'marked';

function Post() {
  const [title, setTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      const updatedPosts = posts.map((post) => {
        if (post.id === editing.id) { // Compare by ID
          return { ...editing, title, postBody };
        }
        return post;
      });
      setPosts(updatedPosts);
      setEditing(null);
    } else {
      const newPost = { id: Date.now(), title, postBody };
      setPosts([...posts, newPost]);
    }
    setTitle('');
    setPostBody('');
  };

  const handleDelete = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id); // Filter by ID
    setPosts(updatedPosts);
  };

  const handleEdit = (post) => {
    setEditing(post);
    setTitle(post.title);
    setPostBody(post.postBody);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          placeholder="Post body (Markdown)"
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post.id}> {/* Use post.id as key */}
            <h2>{post.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: marked(post.postBody) }} />
            <button onClick={() => handleEdit(post)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button> {/* Use post.id */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Post;


