import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Form, Spinner, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PostTable = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/posts");
      setPosts(Array.isArray(res.data) ? res.data : res.data.data || []);
 // safeguard if data is undefined
    } catch (err) {
      setError("Failed to fetch posts.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = posts.filter(
    (p) =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.author?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>User Posts</h2>

      <Form.Control
        type="text"
        placeholder="Search by title or author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="my-3"
      />

      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
         <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Content</th>
              <th>Author</th>
              <th>User Id</th>
              <th>Published</th>
              <th>Created At</th>
              <th>Updated At</th>

            
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.title}</td>
                  <td>{p.content}</td>
                  <td>{p.author}</td>
                  <td>{p.user_id}</td>
                 <td>{p.is_published ? "✅ Yes" : "❌ No"}</td>
                 <td>{new Date(p.created_at).toLocaleString()}</td>
                  <td>{new Date(p.updated_at).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default PostTable;
