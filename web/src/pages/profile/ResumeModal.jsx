import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import Backdrop from '@mui/material/Backdrop';
import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LaunchIcon from '@mui/icons-material/Launch';
import EditIcon from '@mui/icons-material/Edit';

const style1 = {
  position: 'absolute',
  top: '65%',
  left: '60%',
  transform: 'translate(-50%, -50%)',
  width: '280px',
  height: '393px',
  overflowY: 'scroll',
  overflowX: 'hidden',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

export default function ResumeModal({ handleClose, isOpen }) {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style1}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  fontSize: '0.9rem',
                  fontWeight: '400',
                  border: '0.2px solid #f1ecec',
                  width: '100%',
                  lineHeight: '1em',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <VisibilityIcon
                  style={{
                    marginRight: '8px',
                    marginLeft: '20px',
                    marginTop: ' 15px',
                    marginBottom: '15px',
                  }}
                />
                <div> Public </div>
              </div>

              <div
                style={{
                  fontSize: '0.9rem',
                  fontWeight: '400',
                  border: '0.2px  solid #f1ecec',
                  width: '100%',
                  lineHeight: '1em',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <LaunchIcon
                  style={{
                    marginRight: '8px',
                    marginLeft: '20px',
                    marginTop: ' 15px',
                    marginBottom: '15px',
                  }}
                />
                <div> View </div>
              </div>
              <div
                style={{
                  fontSize: '0.9rem',
                  fontWeight: '400',
                  border: '0.2px  solid #f1ecec',
                  width: '100%',
                  lineHeight: '1em',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <DownloadIcon
                  style={{
                    marginRight: '8px',
                    marginLeft: '20px',
                    marginTop: ' 15px',
                    marginBottom: '15px',
                  }}
                />
                <div> Download </div>
              </div>
              <div
                style={{
                  fontSize: '0.9rem',
                  fontWeight: '400',
                  border: '0.2px  solid #f1ecec',
                  width: '100%',
                  lineHeight: '1em',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <EditIcon
                  style={{
                    marginRight: '8px',
                    marginLeft: '20px',
                    marginTop: ' 15px',
                    marginBottom: '15px',
                  }}
                />
                <div> Update saved information </div>
              </div>
              <div
                style={{
                  fontSize: '0.9rem',
                  fontWeight: '400',
                  border: '0.2px  solid #f1ecec',
                  width: '100%',
                  lineHeight: '1em',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InsertDriveFileIcon
                  style={{
                    marginRight: '8px',
                    marginLeft: '20px',
                    marginTop: ' 15px',
                    marginBottom: '15px',
                  }}
                />
                <div> Convert file </div>
              </div>
              <div
                style={{
                  fontSize: '0.9rem',
                  fontWeight: '400',
                  border: '0.2px solid #f1ecec',
                  width: '100%',
                  lineHeight: '1em',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <FileCopyIcon
                  style={{
                    marginRight: '8px',
                    marginLeft: '20px',
                    marginTop: ' 15px',
                    marginBottom: '15px',
                  }}
                />
                <div> Replace</div>
              </div>
              <div
                style={{
                  fontSize: '0.9rem',
                  fontWeight: '400',
                  border: '0.2px solid #f1ecec',
                  width: '100%',
                  lineHeight: '1em',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <DeleteIcon
                  style={{
                    marginRight: '8px',
                    marginLeft: '20px',
                    marginTop: ' 15px',
                    marginBottom: '15px',
                    color: 'red',
                  }}
                />
                <div> Delete </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
