import React from 'react';
import { Card, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import Navbar from '../common/Navbar';

function LandingPage() {
  return (
    <div className={styles.container} style={{backgroundImage: `url(/tableimage.jpg)` }}>
      <Navbar/>
      <div className={styles.cardContainer}>
        <Link to="/customers/" className={styles.cardLink}>
          <Card className={styles.card}>
            <div className={styles.cardContent}>
              <Typography variant="h5">Customer</Typography>
              <Typography variant="body2">
                Click here to view Customer information.
              </Typography>
            </div>
          </Card>
        </Link>
        <Link to="/orders/" className={styles.cardLink}>
          <Card className={styles.card}>
            <div className={styles.cardContent}>
              <Typography variant="h5">Order</Typography>
              <Typography variant="body2">
                Click here to view Order details.
              </Typography>
            </div>
          </Card>
        </Link>
        <Link to="/rewards/" className={styles.cardLink}>
          <Card className={styles.card}>
            <div className={styles.cardContent}>
              <Typography variant="h5">Rewards</Typography>
              <Typography variant="body2">
                Click here to check Rewards status.
              </Typography>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
