import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Form, Spinner, Alert } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const SubmissionTable = () => {
  const [submissions, setSubmissions] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/submissions');
      setSubmissions(res.data.data);
    } catch (err) {
      setError('Failed to fetch submissions.');
    } finally {
      setLoading(false);
    }
  };

  const filtered = submissions.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>User Submissions</h2>
      <Form.Control
        type="text"
        placeholder="Search by name or email..."
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
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.message}</td>
                  <td>{new Date(s.created_at).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No results found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default SubmissionTable;