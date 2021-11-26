import React from 'react';
import { Typography } from '@mui/material';
import Button from '../../../components/Button';
import AddReviewModal from './AddReviewModal';

function ReviewsMain() {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <AddReviewModal handleOpen={handleOpen} handleClose={handleClose} isOpen={isOpen} />
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',
      }}
      >
        <Typography style={{
          marginTop: '15px', fontWeight: 'bold', fontSize: '1.75rem', lineHeight: '1.25', marginBottom: '0.5rem',
        }}
        >
          Work happiness
        </Typography>
        <Button
          onClick={handleOpen}
          label="Review this company"
          style={{
            width: '200px', backgroundColor: 'white', color: '#2557a7', border: '1px solid #d4d2d0',
          }}
        />
      </div>
      <div style={{
        width: '100%', backgroundColor: '#F3F2F1', height: '300px', borderRadius: '20px', marginTop: '30px',
      }}
      >
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Sort by</span>
          <div style={{ display: 'flex', marginTop: '20px' }}>
            <button
              className="ceoButtonHover"
              type="button"
              style={{
                borderRadius: '10px', width: '220px', height: '40px', fontSize: 'medium', color: '#2453d3',
              }}
            >
              Helpfulness
            </button>
            <button
              className="ceoButtonHover"
              type="button"
              style={{
                width: '220px', height: '40px', fontSize: 'medium', marginLeft: '-15px', color: '#2453d3',
              }}
            >
              Rating
            </button>
            <button
              className="ceoButtonHover"
              type="button"
              style={{
                borderTopRightRadius: '10px', borderBottomRightRadius: '10px', width: '195px', height: '40px', marginLeft: '-15px', fontSize: 'medium', color: '#2453d3',
              }}
            >
              Date
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewsMain;
