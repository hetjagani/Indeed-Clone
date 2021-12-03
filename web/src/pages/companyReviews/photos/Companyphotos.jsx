/* eslint-disable no-useless-return */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import toast from 'react-hot-toast';
import getPhotos from '../../../api/media/getPhotos';
import companyPhoto from '../../../api/media/companyPhoto';

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

async function postImages({ image, userId, compId }) {
  // eslint-disable-next-line no-undef
  const formData = new FormData();
  formData.append('imageData', image);
  formData.append('userId', userId);
  formData.append('companyId', compId);
  formData.append('isFeatured', false);
  const response = await companyPhoto(formData, userId);
  return response;
}

function Companyphotos({ compId, companyName }) {
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function getUploadedPhotos() {
      const response = await getPhotos(compId);
      if (!response) {
        return;
      }
      setPhotos(response.data.nodes);
    }
    getUploadedPhotos();
  }, [open]);
  const uploadPhoto = async (event) => {
    event.preventDefault();
    const userId = user.user.id;
    const fil = event.target.files[0];
    const result = await postImages({ image: fil, userId, compId });
    if (!result) {
      toast.error('Error Uploading Photo');
      return;
    }
    setOpen(false);
    toast.success('Photo Uploaded');
  };

  return (
    <div style={{ width: '80%' }}>
      <div style={{ margin: '2rem' }}>
        <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>{companyName}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
        <button
          style={{
            cursor: 'pointer',
            width: '160px',
            height: '40px',
            borderRadius: '1.5rem',
            backgroundColor: '#085ff7',
            border: '1px solid #085ff7',
            fontWeight: '700',
            color: 'white',
          }}
          onClick={handleOpen}
        >
          Upload a photo
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>Upload your company photos</span>
              <span style={{ fontSize: '1rem', padding: '1rem' }}>Workplace or company photos</span>
              <span style={{
                fontSize: '1rem', paddingRight: '1rem', paddingBottom: '1rem', paddingLeft: '1rem',
              }}
              >
                No selfies
              </span>
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={uploadPhoto}
                style={{ paddingTop: '10px' }}
              />
            </div>
            <div style={{ padding: '1rem', paddingTop: '2rem' }}>
              <span style={{ fontSize: '0.875rem', color: '#6f6f6f' }}>
                By uploading this photograph, you represent that
                you are the owner of this photograph and verify that you have the right and required
                permissions to post it to Indeed.
              </span>
            </div>
          </Box>
        </Modal>
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
                </Card>
              </Grid>
            ))}
          </Grid>

        </Box>
      </div>
    </div>
  );
}

export default Companyphotos;
