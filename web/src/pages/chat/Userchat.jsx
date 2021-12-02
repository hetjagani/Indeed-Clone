import React from 'react';
import MessageSVG from '../../components/svg/MessageSVG';

function Userchat() {
  return (
    <div style={{
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
      <div style={{
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
        <span style={{
          fontSize: '1.5rem', color: 'rgb(45, 45, 45)', fontWeight: '700', textAlign: 'left',
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
          }}
        />
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem ',
        alignItems: 'center',
        marginRight: '1rem',
        width: '70%',
        backgroundColor: 'white',
        border: '1px solid #cccccc',
        borderRadius: '1rem',
      }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{
            width: '350px', height: '180px', marginTop: '10rem', marginLeft: '7rem',
          }}
          >
            <MessageSVG style={{ width: '350px', height: '180px' }} />
          </div>
          <div style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '80%', marginLeft: '5rem',
          }}
          >
            <span style={{
              fontSize: '1.5rem', fontWeight: '700', padding: '5rem', paddingBottom: '1rem', paddingTop: '1rem',
            }}
            >
              Welcome to Messages
            </span>
            <span style={{
              padding: '5rem', paddingTop: '0rem', color: '#666666',
            }}
            >
              When an employer contacts you,
              you will see messages here.

            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userchat;
