/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Card, CardContent, Paper, Typography,
} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Button from '../../../components/Button';
import CompanyJobCard from './CompanyJobCard';

// import SearchIcon from '@mui/icons-material/Search';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import {
//   Autocomplete,
//   Card,
//   CardActions,
//   CardContent,
//   InputAdornment,
//   Paper,
//   TextField,
//   Typography,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// import Button from '../../../components/Button';
// import { whatFilter, whereFilter } from '../../../utils/staticData';

Array.range = (start, end) => Array.from({ length: end - start }, (v, k) => k + start);

function CompanyJobsMain() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: '1400px',
          justifyContent: 'center',
          margin: '0 auto',
          marginTop: '10px',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
        className="wrapper"
      >
        <div style={{ width: '75%' }}>
          <div style={{ marginTop: '15px' }}>
            <CompanyJobCard />
          </div>
          <div style={{ marginTop: '15px' }}>
            <CompanyJobCard />
          </div>
          <div style={{ marginTop: '15px' }}>
            <CompanyJobCard />
          </div>
          <div style={{ marginTop: '15px' }}>
            <CompanyJobCard />
          </div>
          <div style={{ marginTop: '15px' }}>
            <CompanyJobCard />
          </div>
          <div style={{ marginTop: '15px' }}>
            <CompanyJobCard />
          </div>
          <div style={{ marginTop: '15px' }}>
            <CompanyJobCard />
          </div>
          <div style={{ marginTop: '15px' }}>
            <CompanyJobCard />
          </div>
        </div>

        <div style={{ marginLeft: '25px', width: '100%' }}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: '12px', position: 'sticky', top: '100px', margin: 0, marginTop: '15px',
            }}
          >
            <Paper elevation={3}>
              <CardContent>
                <div
                  style={{
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
                    jobtitle
                  </p>
                  <CloseIcon fontSize="10px" />
                </div>
                <Typography
                  variant="subtitle1"
                  style={{ fontSize: '14px', marginTop: '-15px' }}
                >
                  <a href="#">
                    companyname
                  </a>
                </Typography>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginLeft: '-2px',
                    marginTop: '-10px',
                    fontSize: '14px',
                  }}
                >
                  <p>
                    bruh
                  </p>
                </div>
                <Button label="Apple now" style={{ width: '140px', borderRadius: '20px' }} />
              </CardContent>
            </Paper>
            <div style={{ maxHeight: '75vh', overflow: 'auto' }}>

              <div style={{ marginLeft: '20px' }}>
                <p
                  id="jobTitle"
                  style={{
                    fontSize: 'large',
                    fontWeight: 'bold',
                  }}
                >
                  Job details
                </p>
                <p style={{ fontWeight: 'bold', fontSize: '14px' }}>Salary</p>
                $12 - $50 an hour
              </div>
              <hr style={{
                borderTop: '1px solid #faf9f9', display: 'flex', justifyContent: 'center',
              }}
              />
              <div style={{ marginLeft: '20px', marginRight: '20px' }}>
                <p
                  id="jobTitle"
                  style={{
                    fontSize: 'large',
                    fontWeight: 'bold',
                  }}
                >
                  Full job description
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default CompanyJobsMain;
