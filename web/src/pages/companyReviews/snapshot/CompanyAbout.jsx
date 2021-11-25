/* eslint-disable max-len */
import React from 'react';
import { Grid, Typography } from '@mui/material';
import CompanyInfoCard from './CompanyInfoCard';

function CompanyAbout() {
  return (
    <>
      <Typography style={{
        marginTop: '15px', fontWeight: 'bold', fontSize: '1.75rem', lineHeight: '1.25', marginBottom: '0.5rem',
      }}
      >
        About the company
      </Typography>

      <div style={{
        display: 'flex', justifyContent: 'flex-start', marginTop: '30px', height: '210px',
      }}
      >
        <img
          height="230px"
          style={{
            borderRadius: '0.5rem', margin: 0, boxSizing: 'border-box',
          }}
          src="https://d2q79iu7y748jz.cloudfront.net/s/_ceophoto/f86a8f0f9997c8f3ede45d96b6d77412"
          alt="CEO"
        />

        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>

          <Grid sx={{ flexGrow: 1 }} container spacing={2}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item>
                  <CompanyInfoCard title="CEO" subtitle="Jill Soltau" />
                </Grid>
                <Grid item>
                  <CompanyInfoCard title="Founded" subtitle="1902" />
                </Grid>
                <Grid item>
                  <CompanyInfoCard title="Company size" subtitle="1000000" />
                </Grid>
                <Grid item>
                  <CompanyInfoCard title="Revenue" subtitle="$10B (USD)" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid sx={{ flexGrow: 1 }} container spacing={2} style={{ marginTop: '10px' }}>
            <Grid item xs={12}>
              <Grid container justifyContent="flex-start" spacing={2}>
                <Grid item>
                  <CompanyInfoCard title="Industry" subtitle="Technology" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>

      </div>

      <div style={{ marginTop: '2rem', marginLeft: '5rem', marginRight: '5rem' }}>
        <p style={{ fontSize: '1rem', color: 'rgb(89, 89, 89)', lineHeight: '1.5' }}>
          J. C. Penney Company, Inc. (NYSE:JCP), one of the nations largest apparel and home furnishings retailers, is on a mission to ensure every shopping experience is worth the customers time, money and effort. Whether shopping jcp.com or visiting one of over 850 store locations across the United States and Puerto Rico, customers will discover a broad assortment of products from a leading portfolio of private, exclusive and national brands. Supporting this value proposition is the warrior spirit of over 100,000 JCPenney associates worldwide, who are focused on the Companys three strategic priorities of strengthening private brands, becoming a world-class omni-channel retailer and increasing revenue per customer.
        </p>
        <p style={{ fontSize: '1rem', color: 'rgb(89, 89, 89)', lineHeight: '1.5' }}>
          More than a century ago, James Cash Penney founded our company as an active and responsible member of the community and earned a special place in the hearts of American families. Today, as we invest in the future of our business, we are committed to building on our proud legacy of responsible corporate citizenship by advancing social, environmental and ethical standards across our operations. At JCPenney, we are working to integrate sustainability into everything we do, from our global supply chain to the environmental impact of our stores.
        </p>

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
      </div>

    </>
  );
}

export default CompanyAbout;
