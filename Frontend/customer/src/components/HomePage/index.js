import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Login from '../Login';
import Register from '../Register';
import styles from './styles.module.css';

function HomePage() {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh"  style={{backgroundImage: `url(/loginimage.jpg)` }}>
      <Grid item xs={12} sm={6}>
        <Paper elevation={3} className={styles.paperStyle}>
          <Typography variant="h4" gutterBottom className={styles.headerText}>
            Welcome to HomePage
          </Typography>
          <div className={styles.cardContent}>
            {showLogin ? (
              <>
                <Typography variant="subtitle1" paragraph>
                  Are you an existing user? Login now!
                </Typography>
                <Login />
              </>
            ) : (
              <>
                <Typography variant="subtitle1" paragraph>
                  New User? Register now!
                </Typography>
                <Register />
              </>
            )}
            <Paper elevation={3} className={styles.buttonStyle} onClick={toggleForm}>
              <Typography variant="h6">
                {showLogin ? 'Switch to Register' : 'Switch to Login'}
              </Typography>
            </Paper>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default HomePage;
