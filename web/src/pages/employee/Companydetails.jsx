/* eslint-disable no-underscore-dangle */
/* eslint-disable object-shorthand */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useHistory } from 'react-router';
// import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import EmployerNavBeforeRegister from '../employers/components/EmployerNavBeforeRegister';

import CompanySVG from '../../components/svg/CompanySVG';
import './css/Employeedetails.css';

import { compamny } from '../../app/actions';
import changeDateFormat from '../../utils/changeDateFormat';

const industries = [
  {
    value: 'Business Operations & Management',
    label: 'Business Operations & Management',
  },
  {
    value: 'Construction',
    label: 'Construction',
  },
  {
    value: 'Education',
    label: 'Education',
  },
  {
    value: 'Finance & Accounting',
    label: 'Finance & Accounting',
  },
  {
    value: 'Food & Beverage',
    label: 'Food & Beverage',
  },
  {
    value: 'Healthcare',
    label: 'Healthcare',
  },
  {
    value: 'Manufacturing & Utilities',
    label: 'Manufacturing & Utilities',
  },
  {
    value: 'Marketing, Advertising & Public Relations',
    label: 'Marketing, Advertising & Public Relations',
  },
  {
    value: 'Sales & Retail',
    label: 'Sales & Retail',
  },
  {
    value: 'Technology',
    label: 'Technology',
  },
  {
    value: 'Transportation',
    label: 'Transportation',
  },
];

const sizes = [
  {
    value: 49,
    label: '1 to 49',
  },
  {
    value: 249,
    label: '50 to 249',
  },
  {
    value: 499,
    label: '250 to 499',
  },
  {
    value: 749,
    label: '500 to 749',
  },
  {
    value: 999,
    label: '750 to 999',
  },
  {
    value: 2000,
    label: '1000+',
  },
];
const Companydetails = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);
  const [ceo, setCeo] = useState('');
  const [industry, setIndustry] = useState('Business Operations & Management');
  const [headquarters, setHeadquarters] = useState('');
  const [foundedOn, setFoundedOn] = useState('');
  const [revenue, setRevenue] = useState('');
  const [size, setSize] = useState(49);
  const [website, setWebsite] = useState('');
  const [companyName, setCompanyName] = useState('');

  const saveDetails = async (e) => {
    e.preventDefault();
    const formattedDOB = String(changeDateFormat(foundedOn));
    const body = {
      name: companyName,
      ceo: ceo,
      headquarters: headquarters,
      revenue: revenue,
      website: website,
      foundedOn: formattedDOB,
      industry: { name: industry },
      size: size,
    };
    dispatch(compamny(body));
    history.push('/employee/companyValues');
  };

  return (
    <>
      <EmployerNavBeforeRegister />
      <form onSubmit={saveDetails}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f2f2f2',
            minHeight: '100vh',
            paddingTop: '30px',
            paddingBottom: '50px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: '1rem',
              maxWidth: '50%',
            }}
          >
            <div style={{ minWidth: '0px', width: '100%', paddingLeft: '40px' }}>
              <span
                style={{
                  fontWeight: '700',
                  color: 'rgb(45, 45, 45)',
                  fontFamily:
                '"Noto Sans", "Helvetica Neue", Helvetica, Arial, "Liberation Sans", Roboto, Noto, sans-serif',
                  lineHeight: '1.25',
                  fontSize: '1.75rem',
                }}
              >
                Include Company details
              </span>
            </div>
            <div style={{ width: '350px', height: '180px', paddingBottom: '20px' }}>
              <CompanySVG style={{ width: '350px', height: '180px' }} />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'white',
              borderRadius: '1rem',
              marginTop: '2rem',
              maxWidth: '50%',
            }}
          >
            <div
              style={{
                paddingLeft: '3rem',
                paddingRight: '3rem',
                paddingTop: '3rem',
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
                  fontSize: '1.25rem',
                }}
              >
                You haven&apos;t posted a job before, please tell about your company.
              </span>
            </div>
            <div
              style={{
                paddingLeft: '3rem',
                paddingRight: '3rem',
                paddingBottom: '1rem',
              }}
            >
              <div className="employeeform">
                <label className="employeeLabel">
                  Company name
                  <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  className="employeeInput"
                />
              </div>
              <div className="employeeform">
                <label className="employeeLabel">
                  CEO
                  <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  value={ceo}
                  onChange={(e) => setCeo(e.target.value)}
                  required
                  className="employeeInput"
                />
              </div>
              <div className="employeeform">
                <label className="employeeLabel">
                  Founded On
                  <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
                </label>
                <input
                  type="date"
                  value={foundedOn}
                  onChange={(e) => setFoundedOn(e.target.value)}
                  required
                  className="employeeInput"
                />
              </div>
              <div className="employeeform">
                <label className="employeeLabel">Headquarters</label>
                <input
                  type="text"
                  value={headquarters}
                  onChange={(e) => setHeadquarters(e.target.value)}
                  required
                  className="employeeInput"
                />
              </div>
              <div className="employeeform">
                <label className="employeeLabel">
                  Industry
                  <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
                </label>
                <select
                  className="employeeInput"
                  select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  style={{
                    height: '48px',
                    border: '1px solid black',
                    fontSize: '16px',
                  }}
                >
                  {industries.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="employeeform">
                <label className="employeeLabel">
                  Revenue
                  <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
                </label>
                <input
                  type="Number"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  required
                  className="employeeInput"
                />
              </div>
              <div className="employeeform">
                <label className="employeeLabel">
                  Size of company
                  <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
                </label>
                <select
                  className="employeeInput"
                  select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  style={{
                    height: '48px',
                    border: '1px solid black',
                    fontSize: '16px',
                  }}
                >
                  {sizes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="employeeform">
                <label className="employeeLabel">
                  Website
                  <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
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
              backgroundColor: 'white',
              borderRadius: '1rem',
              width: '37%',
              padding: '3rem',
              marginTop: '2rem',
            }}
          >
            <div>
              <button type="submit" className="employeeButton">
                Save & continue
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Companydetails;
