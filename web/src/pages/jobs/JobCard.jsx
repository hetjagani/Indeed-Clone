/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Paper,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { ReactComponent as SendSVG } from '../../assets/svg/send.svg';
import MoneySVG from '../../components/svg/MoneySVG';
import './css/JobCard.css';

function JobCard({ job, selectedJobFlag }) {
  const date1 = new Date(job.postedOn);
  const date2 = new Date();
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return (
    <Card
      variant="outlined"
      className="jobCardHover"
      sx={{ borderRadius: '12px', borderColor: selectedJobFlag ? '#2557A6' : '' }}
    >
      <CardContent>
        <div
          style={{
            marginTop: '-18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p
            id="jobTitle"
            style={{
              fontSize: 'large',
              fontWeight: 'bold',
            }}
          >
            {job ? job.title : ''}
          </p>
          <MoreVertIcon />
        </div>
        <Typography variant="subtitle1" style={{ marginTop: '-15px' }}>
          {job ? job.company ? job.company.name : '' : ''}
        </Typography>
        <Typography variant="subtitle1" style={{ marginTop: '-1px' }}>
          {job ? job.address : ''}
        </Typography>
        <div style={{ display: 'inline-block', marginTop: '5px' }}>
          <Paper
            sx={{ backgroundColor: '#F3F2F1', padding: '5px' }}
            elevation={0}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: '20px',
                fontSize: '0.875rem',
                fontWeight: '700 !important',
                color: '#595959',
              }}
            >
              <MoneySVG
                width="1rem"
                maxHeight="1.25rem"
                margin="0 .25rem 0 0"
              />
              <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>
                $
                {job ? job.salary.toLocaleString() : ''}
                {' '}
                a year
              </span>
            </div>
          </Paper>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginTop: '2px',
            alignItems: 'center',
          }}
        >
          <SendSVG />
          <p style={{ marginLeft: '10px' }}>Apply with your indeed resume</p>
        </div>

        <ul className="bulletList" style={{ maxHeight: '20px' }}>
          {job ? job.summary ? job.summary.length > 0 ? job.summary.map((bullet) => (
            <li className="bullet" style={{ listStyleType: 'circle' }}>
              {bullet}
            </li>
          )) : null : null : null}
        </ul>
      </CardContent>
      <CardActions sx={{ marginTop: '2px', padding: '0 0 0 0', backgroundColor: 'white' }}>
        <div style={{
          width: '100%', backgroundColor: 'white', zIndex: 99, margin: 0, padding: '12px',
        }}
        >
          <Typography
            sx={{
              fontSize: 12, color: '#6f6f6f', marginLeft: '10px',
            }}
            color="text.secondary"
            gutterBottom
          >
            {diffDays}
            {' '}
            days ago
          </Typography>
        </div>
      </CardActions>
    </Card>
  );
}

export default JobCard;
