/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-return */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Card, CardContent, Paper, Typography,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '../../components/Button';
import updateStatus from '../../api/application/updateStatus';
import { message } from '../../app/actions';
import initateChat from '../../api/chat/initateChat';

const statuses = [
  {
    value: 'RECEIVED',
    label: 'RECEIVED',
  },
  {
    value: 'UNDER_REVIEW',
    label: 'UNDER_REVIEW',
  },
  {
    value: 'ACCEPTED',
    label: 'ACCEPTED',
  },
  {
    value: 'REJECTED',
    label: 'REJECTED',
  },
];

const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid white',
  boxShadow: 24,
  p: 4,
};

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

function ApplicantsDetails({ companyId, details, getJobs }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [status, setStatus] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [selectedApp, setSelectedApp] = React.useState('');

  const handleOpen = (appId) => {
    setOpen(true);
    setSelectedApp(appId);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedApp('');
  };
  const handleOpen2 = (userId) => {
    setOpen2(true);
    dispatch(message(userId));
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  async function changeStatus() {
    const payload = {
      status,
    };
    const response = await updateStatus(payload, companyId, selectedApp);
    if (!response) {
      return;
    }
    setOpen(false);
    setSelectedApp('');
    getJobs();
  }
  async function startChat() {
    const payload = {
      userId: user.message,
      subject,
    };
    console.log(payload);
    const response = await initateChat(payload);
    if (!response) {
      return;
    }
    history.push('/employee/messages');
  }
  return (
    <div>
      {details
        ? details.length > 0
          ? details.map((option) => (
            <Card
              variant="outlined"
              className="fixed"
              sx={{ borderRadius: '12px', marginTop: '40px' }}
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
                      {option ? option.user.name : ''}
                    </p>
                  </div>
                  <Typography
                    variant="subtitle1"
                    style={{ fontSize: '14px', marginTop: '-15px' }}
                  >
                    <EmailIcon fontSize="10px" sx={{ color: '#595959', marginRight: '0.5rem' }} />
                    {option ? option.user.emails[0] : ' '}
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
                    <PhoneIcon fontSize="10px" sx={{ color: '#595959' }} />
                    <p style={{ marginLeft: '0.5rem' }}>{option ? option.user.contactNo : ''}</p>
                  </div>
                  <div>
                    <span><b>Current Status: </b></span>
                    <span>{option ? option.status : 'RECEIVED'}</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button
                      label="Update Status"
                      style={{ width: '150px', marginRight: '1rem' }}
                      onClick={() => handleOpen(option._id)}
                    />
                    <Button label="Intiate Chat" style={{ width: '150px' }} onClick={() => handleOpen2(option.userId)} />
                  </div>
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
                <div
                  style={{
                    marginLeft: '20px',
                    marginRight: '20px',
                    marginBottom: '20px',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                    <span style={{ fontSize: '20px', fontWeight: '700' }}>Questions</span>
                    {Object.keys(option.answers).map((key) => (
                      <>
                        <span
                          style={{ fontSize: '16px', fontWeight: '700', marginTop: '0.5rem' }}
                        >
                          Q.
                          {' '}
                          {key}
                        </span>
                        <span style={{ marginTop: '5px', marginBottom: '1rem' }}>
                          Ans.
                          {' '}
                          {option.answers[key]}
                        </span>
                      </>
                    ))}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <span><b>CoverLetter: </b></span>
                    <a href={option ? option.coverLetter : ''} target="_blank" rel="noreferrer">
                      {option ? option.coverLetter : ''}
                    </a>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginTop: '0.5rem',
                    }}
                  >
                    <span style={{ marginRight: '5px ' }}><b>Resume: </b></span>
                    <a href={option ? option.resume : ''} target="blank">
                      {option ? option.resume : ''}
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          ))
          : 'No applicants for this job'
        : null}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Status
          </Typography>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '10px',
            }}
          >
            <TextField
              select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              SelectProps={{
                native: true,
              }}
            >
              {statuses.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </TextField>
            <Button
              label="Save"
              style={{ width: '100px', marginTop: '20px' }}
              onClick={() => changeStatus()}
            />
          </div>
        </Box>
      </Modal>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Intiate Chat
          </Typography>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '10px',
            }}
          >
            <TextField
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              style={{ border: 'none' }}
            />
            <Button
              label="Send"
              style={{ width: '100px', marginTop: '20px' }}
              onClick={() => startChat()}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ApplicantsDetails;
