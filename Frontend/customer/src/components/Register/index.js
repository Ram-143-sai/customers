import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    roles: 'ROLE_ADMIN',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/user/add', formData);
      if (response.status === 200) {
        localStorage.setItem('jwt', response?.data?.token);
        localStorage.setItem('name', response?.data?.name);
        navigate('/homepage');
        toast.success('Registered Successfully!', {
          position: toast.POSITION.BOTTOM_LEFT,autoClose: 900
        });
      } 
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.', {
        position: toast.POSITION.BOTTOM_LEFT,autoClose: 900
      });
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4">Register</Typography>
      <form onSubmit={handleRegister}>
        <TextField
          label="Username"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Container>
  );
}

export default Register;
