/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Card, CardContent, Paper, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useHistory } from 'react-router';
import { Markup } from 'interweave';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '../../components/Button';
import Jobapplication from '../applications/Jobapplication';
import Jobquestion from '../applications/Jobquestion';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const edjsHTML = require('editorjs-html');

const edjsParser = edjsHTML();

function JobDetails({ job }) {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [gotoNextFlag, setGotoNextFlag] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setGotoNextFlag(false);
  };

  let html = '';
  if (job && job.description) {
    try {
      html = edjsParser.parse(job.description);
    } catch (err) {
      // console.log('');
      html = null;
    }
  }

  return (
    <Card variant="outlined" className="fixed" sx={{ borderRadius: '12px' }}>
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
              {job ? job.title : ''}
            </p>
            <CloseIcon fontSize="10px" />
          </div>
          <Typography
            variant="subtitle1"
            style={{ fontSize: '14px', marginTop: '-15px' }}
          >
            <a onClick={() => history.push(`/cmp/${job.company._id}`)}>
              {job ? (job.company ? job.company.name : '') : ''}
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
            <LocationOnIcon fontSize="10px" sx={{ color: '#595959' }} />
            <p>
              {job ? job.address : ''}
              {' '}
              &bull;
              {' '}
              {job
                ? job.jobLocation === 'remote'
                  ? 'Remote'
                  : 'In Person'
                : ''}
            </p>
          </div>
          <Button label="Apply now" style={{ width: '290px' }} onClick={handleOpen} />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {gotoNextFlag ? <Jobquestion compId={job.company._id} _id={job._id} setOpen={setOpen} /> : <Jobapplication setGotoNextFlag={setGotoNextFlag} /> }
            </Box>
          </Modal>
        </CardContent>
      </Paper>
      <div style={{ maxHeight: '75vh', overflow: 'auto' }}>
        <hr
          style={{
            borderTop: '1px solid #faf9f9',
            display: 'flex',
            justifyContent: 'center',
          }}
        />
        <div style={{ marginLeft: '20px', marginRight: '20px' }}>
          <div>
            {html ? html.length > 0 ? html.map((ele) => <Markup content={ele} />) : null : null}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default JobDetails;
