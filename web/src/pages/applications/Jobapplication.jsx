/* eslint-disable */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import getUser from '../../api/user/getUser';
import postUser from '../../api/user/postUser';
import '../employee/css/Employeedetails.css';

function Jobapplication({ setGotoNextFlag }) {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [toPostFlag, setToPostFlag] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    getUser(user.user.id).then((response) => {
      if(response){
        setEmail(response.data.emails[0]);
        setName(response.data.name);
        setCity(response.data.city);
        setPhoneNumber(response.data.contactNo);
      }else {
        setToPostFlag(true);
      }
    });
  }, []);

  const questions = (e) => {
    const emails = [];
    emails.push(email);
    e.preventDefault();
    if(toPostFlag){
      const payload = { 
        id: user.user.id,
        emails,
        name,
        city,
        contactNo: phoneNumber,
      };
      console.log(payload);
      postUser(payload).then((response) => {
        if(!response) {
          toast.error('Cannot add user details');
          return;
        }
      });
    }
    setGotoNextFlag(true);
  };
  return (
    <form>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          borderRadius: '1rem',
          marginTop: '2rem',
        }}
      >
        <div
          style={{
            paddingBottom: '1.5rem',
          }}
        >
          <span
            style={{
              fontWeight: '700',
              color: 'rgb(45, 45, 45)',
              fontFamily:
                  '"Noto Sans", "Helvetica Neue", Helvetica, Arial, "Liberation Sans", Roboto, Noto, sans-serif',
              lineHeight: '1.5',
              fontSize: '1.5rem',
            }}
          >
            Add your contact information
          </span>
        </div>
        <div>
          <div className="employeeform">
            <label className="employeeLabel">
              First name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="employeeInput"
            />
          </div>
          <div className="employeeform">
            <label className="employeeLabel">Last name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="employeeInput"
            />
          </div>
          <div className="employeeform">
            <label className="employeeLabel">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="employeeInput"
            />
          </div>
          <div className="employeeform">
            <label className="employeeLabel">
              City
              <span style={{ paddingLeft: '5px', color: '#b3b3b3', fontSize: '12px' }}>(optional)</span>
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="employeeInput"
            />
          </div>
          <div className="employeeform">
            <label className="employeeLabel">
              Phone number
              <span style={{ paddingLeft: '5px', color: '#b3b3b3', fontSize: '12px' }}>(optional)</span>
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="employeeInput"
            />
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          borderRadius: '1rem',
          marginTop: '2rem',
        }}
      >
        <div>
          <button
            className="employeeBack"
            style={{
              border: 'none', width: '200px', fontSize: '16px', backgroundColor: 'white',
            }}
          >
            Return to job search
          </button>
        </div>
        <div>
          <button type="submit" className="employeeButton" style={{ width: '120px' }} onClick={questions}>
            Continue
          </button>
        </div>
      </div>
    </form>
  );
}

export default Jobapplication;
