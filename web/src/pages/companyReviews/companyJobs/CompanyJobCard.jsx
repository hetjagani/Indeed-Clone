import React from 'react';
import {
  Card, CardActions, CardContent, Typography,
} from '@mui/material';

function CompanyJobCard() {
  return (
    <Card
      sx={{ width: '400px', height: '180px' }}
      variant="outlined"
      className="jobCardHover"
    >
      <CardContent>
        <p style={{ fontWeight: 'bold' }}>Customer Service Representative</p>
        <p style={{ fontSize: '13px', marginTop: '-10px', color: '#525252' }}>Dallas, TX</p>
        <div
          style={{
            display: 'flex',
            marginLeft: '-5px',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: '20px',
            fontSize: '0.875rem',
            fontWeight: '700 !important',
            color: '#595959',
          }}
        >
          <span style={{
            marginLeft: '5px', fontWeight: 'bold', backgroundColor: '#CCCCCC', padding: '5px',
          }}
          >
            $ 10000
            {' '}
            a year
          </span>
        </div>
      </CardContent>
      <CardActions sx={{ marginTop: '-20px' }}>
        <Typography
          sx={{
            fontSize: 12, color: '#6f6f6f', marginLeft: '10px', marginTop: '10px',
          }}
          color="text.secondary"
          gutterBottom
        >
          16 days ago
        </Typography>
      </CardActions>
    </Card>
  );
}

export default CompanyJobCard;
