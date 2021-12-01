import React from 'react';
import {
  Card, CardActions, CardContent, Typography,
} from '@mui/material';

function CompanyJobCard({ job, selectedJobFlag }) {
  const date1 = new Date(job.postedOn);
  const date2 = new Date();
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return (
    <Card
      sx={{ width: '400px', height: '180px', borderColor: selectedJobFlag ? '#2557A6' : '' }}
      variant="outlined"
      className="jobCardHover"
    >
      <CardContent>
        <p style={{ fontWeight: 'bold' }}>{job ? job.title : ''}</p>
        <p style={{ fontSize: '13px', marginTop: '-10px', color: '#525252' }}>
          {job ? job.city : ''}
          ,
          {' '}
          {job ? job.state : ''}
        </p>
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
            $
            {' '}
            {job ? job.salary.toLocaleString() : ''}
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
          {diffDays}
          {' '}
          days ago
        </Typography>
      </CardActions>
    </Card>
  );
}

export default CompanyJobCard;
