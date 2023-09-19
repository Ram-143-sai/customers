import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from './styles.module.css';
import { toast } from 'react-toastify';
import { ArrowBack } from '@mui/icons-material';

function Navbar() {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const goBack = () => {
		navigate(-1);
	}

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    toast.success('Logged out successfully!', {
      position: toast.POSITION.BOTTOM_LEFT
    , autoClose: 900 });
  };

  return (
    <div className={styles.header}>
      <Typography variant="h6" style={{ color: '#fff' }} className={styles.whole}>
      <ArrowBack onClick={goBack} className={styles.left}/>
        <Link to="/homepage" style={{ textDecoration: 'none', color: 'white' }}>
          Customer Management System
        </Link>
      </Typography>
      <Button variant="contained" color="error" onClick={openLogoutModal}>
        <LogoutIcon/>
      </Button>

      <Dialog open={isLogoutModalOpen} onClose={closeLogoutModal}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure that you want to Logout ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeLogoutModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="error">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Navbar;
