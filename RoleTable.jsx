import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Form, Spinner, Alert } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const RoleTable = () => {
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/roles');
      setRoles(res.data.data);
    } catch (err) {
      setError('Failed to fetch role.');
    } finally {
      setLoading(false);
    }
  };

  const filtered = roles.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) 
   
  );

  return (
    <div className="container mt-4">
      <h2>User Roles</h2>
      <Form.Control
        type="text"
        placeholder="Search by name ..."
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
               <th>Created At</th>
              <th>Updated At</th>
            
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.name}</td>
                    <td>{new Date(r.created_at).toLocaleString()}</td>
                  <td>{new Date(r.updated_at).toLocaleString()}</td>
                
                  <td>{new Date(r.created_at).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No results found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default RoleTable;