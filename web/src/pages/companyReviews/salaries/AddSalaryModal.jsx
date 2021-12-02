/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Typography } from '@mui/material';
// import LocationOnIcon from '@mui/icons-material/LocationOn';

import '../css/AddReviewModal.css';
import ModalDetailsPage1 from './ModalDetailsPage1';
import ModalDetailsPage2 from './ModalDetailsPage2';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height: '90%',
  overflowY: 'scroll',
  overflowX: 'hidden',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

Array.range = (start, end) => Array.from({ length: end - start }, (v, k) => k + start);

export default function AddSalaryModal({
  handleClose, isOpen, compId,
}) {
  const [gotoNextFlag, setGotoNextFlag] = useState(false);
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>
            <div>
              <Typography
                style={{
                  marginTop: '15px',
                  fontSize: '0.87em',
                  lineHeight: '1.25',
                  marginBottom: '0.5rem',
                }}
              >
                {!gotoNextFlag ? (
                  <span style={{ fontWeight: 'bold' }}>1</span>
                ) : (
                  <span style={{ fontWeight: 'bold' }}>2</span>
                )}
                {' '}
                of 2
              </Typography>
              {!gotoNextFlag ? (
                <ModalDetailsPage1 gotoNextFlag={gotoNextFlag} setGotoNextFlag={setGotoNextFlag} />
              ) : (
                <ModalDetailsPage2
                  compId={compId}
                  handleClose={handleClose}
                />
              )}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
