/* eslint-disable no-useless-return */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import getPhotos from '../../../api/media/getPhotos';
import updatePhotoStatus from '../../../api/media/updatePhotoStatus';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: '5px',
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid white',
  borderRadius: '0.5rem',
  boxShadow: 24,
  p: 4,
};

function CompanyphotosAdmin({ compId, companyName }) {
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState('');

  const getUploadedPhotos = async () => {
    const response = await getPhotos(compId, true);
    if (!response) {
      return;
    }
    setPhotos(response.data.nodes);
  };

  useEffect(() => {
    getUploadedPhotos();
  }, []);

  const updateStatus = async (payload, approval) => {
    const response = await updatePhotoStatus(approval, payload);
    if (!response || response.length === 0) return;
    await getUploadedPhotos();
  };

  return (
    <div style={{ width: '80%' }}>
      <div style={{ margin: '2rem' }}>
        <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>{companyName}</span>
      </div>
      <div style={{ padding: '1rem', paddingTop: '2rem' }}>
        <Box sx={{ width: '100%' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            { photos.map((option) => (
              <Grid item xs={3} style={{ padding: '5px' }}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={option ? option.url : ''}
                    alt="Paella dish"
                  />
                  <center>
                    {option.status}
                    <div style={{ marginTop: '10px', justifyContent: 'space-between' }}>
                      <FormControl>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                          Approval
                        </InputLabel>
                        <NativeSelect
                          defaultValue={option && option.status ? option.status : ''}
                          inputProps={{
                            name: 'Approval',
                            id: 'uncontrolled-native',
                          }}
                          onChange={async (e) => {
                            setStatus(e.target.value);
                            updateStatus(option, e.target.value);
                          }}
                        >
                          <option value="APPROVED">APPROVED</option>
                          <option value="REJECTED"> REJECTED</option>
                          <option value="PENDING">PENDING</option>
                        </NativeSelect>
                      </FormControl>
                    </div>
                  </center>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default CompanyphotosAdmin;
