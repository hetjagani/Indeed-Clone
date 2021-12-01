/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Markup } from 'interweave';
import CompanyInfoCard from './CompanyInfoCard';
import convertToInternationalCurrency from '../../../utils/convertToInternationalCurrency';

const edjsHTML = require('editorjs-html');

const edjsParser = edjsHTML();

function CompanyAbout(props) {
  let html = '';
  if (props && props.data && props.data.description) {
    try {
      html = edjsParser.parse(props.data.description);
    } catch (err) {
      // console.log('');
      html = null;
    }
  }

  return (
    <>
      <Typography style={{
        marginTop: '15px', fontWeight: 'bold', fontSize: '1.75rem', lineHeight: '1.25', marginBottom: '0.5rem',
      }}
      >
        About the company
      </Typography>

      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px', height: '210px', width: '100%',
      }}
      >
        <div style={{
          display: 'flex', flexDirection: 'column', marginLeft: '20px',
        }}
        >

          <Grid sx={{ flexGrow: 1 }} container spacing={2}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item>
                  <CompanyInfoCard title="CEO" subtitle={(props.data && props.data.ceo) ? props.data.ceo : 'Not reported'} />
                </Grid>
                <Grid item>
                  <CompanyInfoCard title="Founded" subtitle={(props.data && props.data.foundedOn) ? new Date(props.data.foundedOn).getFullYear() : 'YEAR'} />
                </Grid>
                <Grid item>
                  <CompanyInfoCard title="Company size" subtitle={(props.data && props.data.size) ? props.data.size.toLocaleString() : 'NA'} />
                </Grid>
                <Grid item>
                  <CompanyInfoCard title="Revenue" subtitle={(props.data && props.data.revenue) ? `$ ${convertToInternationalCurrency(props.data.revenue)}` : 'NA'} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid sx={{ flexGrow: 1 }} container spacing={2} style={{ marginTop: '10px' }}>
            <Grid item xs={12}>
              <Grid container justifyContent="flex-start" spacing={2}>
                <Grid item>
                  <CompanyInfoCard title="Industry" subtitle={(props.data && props.data.industry && props.data.industry.name) ? props.data.industry.name : 'NA'} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>

      </div>

      <div style={{ marginTop: '2rem', marginLeft: '5rem', marginRight: '5rem' }}>
        <p style={{ fontSize: '1rem', color: 'rgb(89, 89, 89)', lineHeight: '1.5' }}>
          {(props.data && props.data.about) ? props.data.about : 'NA'}
        </p>
      </div>

      <Typography style={{
        marginTop: '15px', fontWeight: 'bold', fontSize: '1.75rem', lineHeight: '1.25', marginBottom: '0.5rem',
      }}
      >
        {(props.data && props.data.name) ? `${props.data.name}'s Mission` : 'Mission'}
      </Typography>

      <div style={{ marginTop: '1rem', marginLeft: '5rem', marginRight: '5rem' }}>
        <p style={{ fontSize: '1rem', color: 'rgb(89, 89, 89)', lineHeight: '1.5' }}>
          {(props.data && props.data.mission) ? props.data.mission : 'NA'}
        </p>
      </div>

      <Typography style={{
        marginTop: '15px', fontWeight: 'bold', fontSize: '1.75rem', lineHeight: '1.25', marginBottom: '0.5rem',
      }}
      >
        Description
      </Typography>

      <div style={{
        marginTop: '1rem', marginLeft: '5rem', marginRight: '5rem', maxWidth: '700px',
      }}
      >
        <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>
          {html ? html.length > 0 ? html.map((ele) => <Markup content={ele} />) : null : null}
        </p>
      </div>

      <p style={{
        marginTop: '30px', color: '#2557a7', fontWeight: 'bold', fontSize: 'large',
      }}
      >
        Learn More
        {' '}
        {' '}
        {' '}
        &#62;
      </p>

    </>
  );
}

export default CompanyAbout;
