import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Container, Alert, Spinner } from 'reactstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const LoginPage = ({ onLogin }) => {
  const defaultUsername = 'admin';
  const defaultPassword = '12345';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [forgotPassword, setForgotPassword] = useState(false); // State for forgot password view
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById('username').focus();
    document.body.style.backgroundColor = styles.container.backgroundColor;
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(async () => {
      if (!username || !password) {
        setError('Both fields are required.');
        setLoading(false);
        setTimeout(() => setError(''), 2000);
        return;
      }

      if (username === defaultUsername && password === defaultPassword) {
        const role = 'Admin';
        const token = 'dummy_token_for_admin';

        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('role', role);
        localStorage.setItem('token', token); 

        onLogin(true, role);
        navigate('/admin');
      } else {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);
        try {
          const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });

          if (!response.ok) {
            const data = await response.json();
            setError(data.message || 'Invalid username or password');
            setLoading(false);
            setTimeout(() => setError(''), 2000);
            return;
          }

          const { role, staffID, studentID, name, section, class: studentClass, dob, guidanceName, guidanceContact, profilePhoto, email, phone, department, gender } = await response.json();

          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('role', role);
          localStorage.setItem('staffID', staffID || '');
          localStorage.setItem('studentID', studentID || '');
          localStorage.setItem('name', name);
          localStorage.setItem('section', section);
          localStorage.setItem('class', studentClass);
          localStorage.setItem('dob', dob);
          localStorage.setItem('guidanceName', guidanceName);
          localStorage.setItem('guidanceContact', guidanceContact);
          localStorage.setItem('profilePhoto', profilePhoto);
          localStorage.setItem('email', email);
          localStorage.setItem('phone', phone);
          localStorage.setItem('department', department);
          localStorage.setItem('gender', gender);
          localStorage.setItem('token', 'dummy_token_for_user');

          onLogin(true, role);

          switch (role) {
            case 'Admin':
              navigate('/admin');
              break;
            case 'Staff':
              navigate('/staff');
              break;
            case 'Student':
              navigate('/student');
              break;
            default:
              setError('Invalid user role.');
              setLoading(false);
          }
        } catch (err) {
          setError('Invalid ID or password');
          setLoading(false);
          setTimeout(() => setError(''), 2000);
        }
      }
    }, 1200);
  };

  const handleForgotPassword = () => {
    setForgotPassword(true); // Switch to the forgot password form
  };

  const handlePasswordResetRequest = async (e) => {
    e.preventDefault();
    // Handle sending a password reset request to the backend here
    // Example: send a request to an endpoint like /api/forgot-password

    // Show success message or error
    alert('Password reset request sent!');
    setForgotPassword(false); // After sending the reset request, go back to login form
  };

  const handleBackToLogin = () => {
    setForgotPassword(false); // Go back to login form
  };

  const styles = {
    container: {
      backgroundColor: '#3347B0',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
    },
    formContainer: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      padding: '30px',
      width: '100%',
      maxWidth: '400px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
      color: '#3347B0',
      fontSize: '2rem',
      textAlign: 'center',
      marginBottom: '30px',
    },
    label: {
      fontWeight: 'bold',
      color: '#333',
    },
    input: {
      borderRadius: '10px',
      padding: '10px',
      marginBottom: '15px',
      border: '1px solid #ddd',
    },
    button: {
      backgroundColor: 'green',
      color: '#fff',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '10px',
      padding: '10px',
      marginTop: '20px',
      width: '100%',
    },
    buttonHover: {
      backgroundColor: '#2c9d2c',
    },
    alert: {
      textAlign: 'center',
    },
    spinner: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '20px',
    },
    passwordIcon: {
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      color: '#aaa',
      marginTop: '15px',
    },
    forgotPasswordText: {
      textAlign: 'center',
      marginTop: '10px',
      color: '#333',
      cursor: 'pointer',
      textDecoration: 'underline',
    },
    backToLogin: {
      textAlign: 'center',
      marginTop: '10px',
      cursor: 'pointer',
      textDecoration: 'underline',
    }
  };

  return (
    <Container style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>U-PHAOUQ INT COL.</h2>
        {forgotPassword ? (
          // Forgot Password Form
          <Form onSubmit={handlePasswordResetRequest}>
            <FormGroup>
              <Label for="email" style={styles.label}>Enter your email address</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                style={styles.input}
                required
              />
            </FormGroup>
            <Button
              type="submit"
              style={styles.button}
            >
              Send Password Reset Link
            </Button>
            <div style={styles.backToLogin} onClick={handleBackToLogin}>
              Back to Login
            </div>
          </Form>
        ) : (
          // Login Form
          <Form onSubmit={handleLogin}>
            <FormGroup>
              <Label for="username" style={styles.label}>Username</Label>
              <Input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                style={styles.input}
                required
              />
            </FormGroup>
            <FormGroup style={{ position: 'relative' }}>
              <Label for="password" style={styles.label}>Password</Label>
              <Input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={styles.input}
                required
              />
              <div
                style={styles.passwordIcon}
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
            </FormGroup>

            {error && <Alert color="danger" style={styles.alert}>{error}</Alert>}

            {loading ? (
              <div style={styles.spinner}>
                <Spinner animation="border" color="primary" />
              </div>
            ) : (
              <Button
                type="submit"
                style={styles.button}
                onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
              >
                Login
              </Button>
            )}

            <div style={styles.forgotPasswordText} onClick={handleForgotPassword}>
              Forgot Password?
            </div>
          </Form>
        )}
      </div>
    </Container>
  );
};

export default LoginPage;
