/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import getChats from '../../api/chat/getChats';
import CompanyDefaultLogo from '../../assets/img/companyLogo.jpg';
import Usermessages from './Usermessages';

function UserChat() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState([]);
  const getUserChats = async () => {
    const response = await getChats();
    if (!response) {
      return;
    }
    setChats(response.data.nodes);
  };
  useEffect(() => {
    getUserChats();
  }, []);

  console.log(chats);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          minHeight: '100vh',
          width: '100%',
          paddingTop: '1rem',
          paddingRight: '1rem',
          paddingLeft: '1rem',
          backgroundColor: '#f2f2f2',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem ',
            marginLeft: '1rem',
            marginRight: '1rem',
            width: '20%',
            backgroundColor: 'white',
            border: '1px solid #cccccc',
            borderRadius: '1rem',
          }}
        >
          <div
            style={{
              width: '100%',
              borderBottom: '1px solid #666666',
              paddingBottom: '2rem',
            }}
          >
            <span
              style={{
                fontSize: '1.5rem',
                color: 'rgb(45, 45, 45)',
                fontWeight: '700',
                textAlign: 'left',
              }}
            >
              Messages
            </span>
            <input
              placeholder="Inbox"
              style={{
                height: '35px',
                borderRadius: '0.5rem',
                marginTop: '1.5rem',
                border: '1px solid #a6a6a6',
                padding: '8px',
                fontSize: '18px',
                width: '90%',
              }}
            />
          </div>
          {chats.map((option) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                padding: '1rem ',
                borderBottom: '1px solid #666666',
              }}
            >
              <div>
                <img
                  src={
                    option
                    && option.employer
                    && option.employer.company
                    && option.employer.company.length
                    && option.employer.company[0].logo
                      ? option.employer.company[0].logo.url
                      : CompanyDefaultLogo
                  }
                  alt="company"
                  style={{ width: '55px' }}
                />
              </div>
              <div
                style={{ display: 'flex', flexDirection: 'column' }}
                onClick={() => setSelectedChat(option)}
              >
                <span style={{ marginLeft: '30px', marginTop: '10px' }}>
                  {option
                  && option.employer
                  && option.employer.company
                  && option.employer.company.length
                    ? option.employer.company[0].name
                    : ''}
                </span>
                <span style={{ marginLeft: '30px', marginTop: '1px' }}>
                  {new Date(option.createdAt).toUTCString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Usermessages openChat={selectedChat} />
      </div>
    </>
  );
}

export default UserChat;
