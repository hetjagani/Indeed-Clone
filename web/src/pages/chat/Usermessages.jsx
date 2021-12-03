/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import toast from 'react-hot-toast';
import Button from '../../components/Button';
import sendMessage from '../../api/chat/sendMessage';
import getMessages from '../../api/chat/getMessages';
import getChatInfo from '../../api/chat/getChatInfo';
import CompanyDefaultLogo from '../../assets/img/companyLogo.jpg';
import UserIcon from '../../assets/img/usericon.jpg';

function Usermessages({ openChat }) {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInfo, setChatInfo] = useState(null);

  const messageSend = async () => {
    if (!message.length) {
      toast.error('Message cannot be empty');
      return;
    }
    if (!openChat.employer) {
      toast.error('Please select whom to send message to!');
      return;
    }
    const payload = {
      to: openChat.employer._id,
      content: message,
    };
    const response = await sendMessage(payload, openChat._id);
    if (!response) {
      return;
    }
    setMessage('');
    getChatMessages();
  };

  const getChatMessages = async () => {
    const params = {
      page: 1,
      limit: 100,
    };
    const response = await getMessages(openChat._id, params);
    if (!response) {
      return;
    }
    setChatMessages(response.data.nodes);
  };

  const getChatInformation = async () => {
    const response = await getChatInfo(openChat._id);
    if (!response) {
      return;
    }
    setChatInfo(response.data);
  };

  useEffect(() => {
    if (openChat && openChat._id) {
      getChatInformation();
      getChatMessages();
    }
  }, [openChat]);

  console.log(openChat);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem ',
        marginRight: '1rem',
        width: '70%',
        backgroundColor: 'white',
        border: '1px solid #cccccc',
        borderRadius: '1rem',
      }}
    >
      {' '}
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            borderBottom: '1px solid #cccccc',
            paddingBottom: '1.5rem',
            padding: '0.5rem',
          }}
        >
          <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>
            {openChat && openChat.user ? openChat.user.name : ''}
          </span>
          <span style={{ color: '#666666' }}>
            {openChat ? openChat.subject : ''}
          </span>
        </div>
        <div
          style={{
            height: '80%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '10px',
              justifyContent: 'column-reverse',
            }}
          >
            {chatInfo &&
              chatMessages.map((option) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      display: 'flex',
                      padding: '15px',
                    }}
                  >
                    {option.to === chatInfo.user._id ? (
                      <img
                        width="45px"
                        src={
                          chatInfo &&
                          chatInfo.employee.company &&
                          chatInfo.employee.company.length > 0 &&
                          chatInfo.employee.company[0].logo.url
                            ? chatInfo.employee.company[0].logo.url
                            : CompanyDefaultLogo
                        }
                        alt="Company"
                      />
                    ) : (
                      <img width="45px" src={UserIcon} alt="Company" />
                    )}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '15px',
                    }}
                  >
                    {option.from === chatInfo.user._id ? (
                      <>
                        <span style={{ fontSize: '12px', color: 'grey' }}>
                          <span
                            style={{ fontWeight: 'bold', fontSize: '15px' }}
                          >
                            You
                          </span>{' '}
                          {new Date(option.createdAt).toUTCString()}
                        </span>
                        <span>{option.content}</span>
                      </>
                    ) : (
                      <>
                        <span style={{ fontSize: '12px', color: 'grey' }}>
                          <span
                            style={{ fontWeight: 'bold', fontSize: '15px' }}
                          >
                            {chatInfo &&
                            chatInfo.employee.company &&
                            chatInfo.employee.company.length > 0 &&
                            chatInfo.employee.company[0].name
                              ? chatInfo.employee.company[0].name
                              : 'Company'}
                          </span>{' '}
                          {new Date(option.createdAt).toUTCString()}
                        </span>
                        <span>{option.content}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div
          style={{
            height: '20%',
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid black',
            padding: '0.5rem',
            alignItems: 'right',
          }}
        >
          <TextField
            rows={3}
            multiline
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your messages"
            style={{ border: 'none' }}
          />
          <Button
            label="Send"
            style={{ width: '70px', height: '40px' }}
            onClick={messageSend}
          />
        </div>
      </div>
    </div>
  );
}

export default Usermessages;
