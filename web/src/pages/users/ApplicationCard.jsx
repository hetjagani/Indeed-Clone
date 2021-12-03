import React from 'react';
import { Card, CardContent } from '@mui/material';
import ApplicationSVG from '../../components/svg/ApplicationSVG';

const ApplicationCard = ({ application }) => {
  const date1 = new Date(application.date);
  const date2 = new Date();
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <>
      <Card sx={{ minWidth: 275, marginTop: '20px' }}>
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <ApplicationSVG />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: '20px',
                  marginTop: '-15px',
                }}
              >
                <span style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '20px' }}>
                  {application.title}
                </span>
                <span>Google</span>
                <span style={{ marginTop: '10px' }}>
                  {application.job ? application.job.city : ''}
                  ,
                  {' '}
                  {application.job ? application.job.state : ''}
                </span>
                <span>{`${diffDays} days ago`}</span>
              </div>
            </div>
            <div>
              <span style={{ fontWeight: 'bolder' }}>Application status:</span>
              {' '}
              {application.status}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ApplicationCard;
