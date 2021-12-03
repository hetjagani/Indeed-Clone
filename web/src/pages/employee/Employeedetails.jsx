/* eslint-disable no-underscore-dangle */
/* eslint-disable object-shorthand */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { useSelector } from 'react-redux';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import toast from 'react-hot-toast';
import postEmployers from '../../api/company/postEmployeeDetails';
// import getCompanyData from '../../api/company/getCompanyData';
import getCompanies from '../../api/company/get';
import EmployeSVG from '../../components/svg/EmployeSVG';

import './css/Employeedetails.css';
import CustomAutocomplete from '../../components/CustomAutocomplete';
import companyUpload from '../../api/media/companyUpload';
import EmployerNavBeforeRegister from '../employers/components/EmployerNavBeforeRegister';

const roles = [
  {
    title: 'Human Resoures Generalist',
  },
  {
    title: 'Assistan or Office Manager',
  },
  {
    title: 'Owner or CEO',
  },
  {
    title: 'Recruiter',
  },
  {
    title: 'Other',
  },
];
async function postImages({ image }) {
  // eslint-disable-next-line no-undef
  const formData = new FormData();
  formData.append('imageData', image);
  const response = await companyUpload(formData);
  return response;
}

const Employeedetails = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [otherRole, setOtherRole] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyNameOptions, setCompanyNameOptions] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [photo, setPhoto] = useState({});

  const getCompanyNames = async () => {
    const queryParams = { page: 1, limit: 10 };
    const response = await getCompanies(queryParams);
    if (!response) {
      return;
    }
    const companyNames = [];
    response.data.nodes.forEach((company) => {
      companyNames.push({ title: company.name, id: company._id });
    });
    setCompanyNameOptions(companyNames);
  };

  useEffect(() => {
    getCompanyNames();
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
  }, []);

  const changeDateFormat = (inputDate) => { // expects Y-m-d
    const splitDate = inputDate.split('-');
    if (splitDate.count === 0) {
      return null;
    }

    const year = splitDate[0];
    const month = splitDate[1];
    const day = splitDate[2];

    return `${month}/${day}/${year}`;
  };

  const saveDetails = async (e) => {
    e.preventDefault();
    const formattedDOB = String(changeDateFormat(dob));
    if (companyName === '') {
      const body = {
        id: user.user.id,
        name: name,
        role: role,
        address: address,
        dateOfBirth: formattedDOB,
        medium: photo.url,
      };
      console.log(body);
      await postEmployers(body);
      history.push('/employee/company');
    } else {
      // const queryParams = { page: 1, limit: 20 };
      let companyID = null;
      companyNameOptions.forEach((company) => {
        if (company.title === companyName) {
          companyID = company.id;
        }
      });
      if (companyID === null) {
        toast.error('Please select valid company or keep empty to create new company!');
        return;
      }
      const body = {
        id: user.user.id,
        name: name,
        role: role,
        address: address,
        dateOfBirth: formattedDOB,
        companyId: companyID,
        medium: photo.url,
      };
      console.log(body);
      const response = await postEmployers(body);
      console.log('reponse employee', response);
      if (!response) {
        return;
      }
      history.push('/employee/companyValues');
    }
  };

  const uploadPhoto = async (event) => {
    event.preventDefault();
    const fil = event.target.files[0];
    const result = await postImages({ image: fil });
    if (!result) {
      return;
    }
    setPhoto({ url: result.data });
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
            <div
              style={{
                minWidth: '0px',
                width: '100%',
                paddingRight: '3.8rem',
                paddingLeft: '3.8rem',
              }}
            >
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
                Create an employer account
              </span>
            </div>
            <div
              style={{ width: '350px', height: '180px', paddingBottom: '20px' }}
            >
              <EmployeSVG style={{ width: '350px', height: '180px' }} />
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
                You haven&apos;t posted a job before, so you&apos;ll need to
                create an employer account.
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
                  Your first and last name
                  <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
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
                <label className="employeeLabel">
                  Your role in hiring process
                </label>
                <CustomAutocomplete
                  className="employeeInput"
                  sx={{
                    width: '100%',
                    marginTop: '10px',
                  }}
                  placeholder="Select an option"
                  value={role}
                  setValue={setRole}
                  options={roles}
                  endAdornmentIcon={(
                    <div style={{ marginRight: '15px', marginTop: '-10px' }}>
                      <ArrowDropDownIcon fontSize="10px" />
                    </div>
                )}
                />
              </div>
              {role === 'Other' ? (
                <div className="employeeform">
                  <input
                    placeholder="Enter role"
                    type="text"
                    value={otherRole}
                    onChange={(e) => setOtherRole(e.target.value)}
                    required
                    className="employeeInput"
                  />
                </div>
              ) : null}
              <div className="employeeform">
                <label className="employeeLabel">Your address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="employeeInput"
                />
              </div>
              <div className="employeeform">
                <label className="employeeLabel">
                  Your Date of Birth
                  <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
                </label>
                <input
                  style={{ paddingLeft: '10px', paddingRight: '10px' }}
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                  className="employeeInput"
                />
              </div>
              <div className="employeeform">
                <label className="employeeLabel">
                  Select company or keep empty if creating new company
                </label>
                <CustomAutocomplete
                  className="employeeInput"
                  sx={{
                    width: '100%',
                    marginTop: '10px',
                  }}
                  placeholder="Company"
                  value={companyName}
                  setValue={setCompanyName}
                  options={companyNameOptions}
                  endAdornmentIcon={(
                    <div style={{ marginRight: '15px', marginTop: '-10px' }}>
                      <ArrowDropDownIcon fontSize="10px" />
                    </div>
            )}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'left',
              backgroundColor: 'white',
              borderRadius: '1rem',
              width: '43%',
              padding: '3.75rem',
              marginTop: '2rem',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label className="employeeLabel">
                Add photo
                <div>
                  <input
                    onChange={uploadPhoto}
                    type="file"
                    accept="image/*"
                    style={{ paddingTop: '10px' }}
                  />
                </div>
              </label>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: 'white',
              borderRadius: '1rem',
              width: '43%',
              padding: '3.75rem',
              marginTop: '2rem',
            }}
          >
            <div>
              <button onClick={() => history.push('/login')} className="employeeBack">
                Back to login
              </button>
            </div>
            <div>
              <button type="submit" className="employeeButton" onClick={saveDetails}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Employeedetails;
