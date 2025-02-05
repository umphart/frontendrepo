import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Container, Alert } from 'reactstrap';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword || !role) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some((user) => user.username === username)) {
      setError('Username already exists');
      return;
    }

    users.push({ username, password, role });
    localStorage.setItem('users', JSON.stringify(users));

    setSuccess(true);
    setTimeout(() => navigate('/login'), 2000); // Redirect after success
  };

  const styles = {
    container: {
      backgroundColor: '#f0f4f8',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '30px',
    },
    formContainer: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      padding: '40px',
      width: '100%',
      maxWidth: '400px',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    },
    title: {
      textAlign: 'center',
      color: '#4f8a8b',
      fontSize: '2rem',
      marginBottom: '20px',
    },
    label: {
      fontWeight: 600,
      color: '#6c757d',
    },
    input: {
      borderRadius: '8px',
      border: '1px solid #ddd',
      padding: '12px',
      marginBottom: '15px',
    },
    button: {
      backgroundColor: 'green',
      color: '#fff',
      fontWeight: 'bold',
      borderRadius: '8px',
      padding: '12px',
      marginTop: '20px',
      width: '100%',
      border: 'none',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#3f6f70',
    },
    link: {
      color: '#4f8a8b',
      fontWeight: 'bold',
      textDecoration: 'none',
      textAlign: 'center',
      marginTop: '20px',
    },
    alert: {
      textAlign: 'center',
      marginBottom: '15px',
    },
  };

  return (
    <Container style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Register</h2>
        <Form onSubmit={handleRegister}>
          <FormGroup>
            <Label for="role" style={styles.label}>Register As</Label>
            <Input
              type="select"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={styles.input}
              required
            >
              <option value="">-- Select a Role --</option>
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
              <option value="Student">Student</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="username" style={styles.label}>Username</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              placeholder="Enter your username"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="password" style={styles.label}>Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Enter your password"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="confirmPassword" style={styles.label}>Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              placeholder="Confirm your password"
              required
            />
          </FormGroup>

          {error && <Alert color="danger" style={styles.alert}>{error}</Alert>}
          {success && <Alert color="success" style={styles.alert}>Registration successful! Redirecting...</Alert>}

          <Button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Register
          </Button>

          <Button
            color="link"
            onClick={() => navigate('/login')}
            style={styles.link}
          >
            Already have an account? Login here
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default RegisterPage;
