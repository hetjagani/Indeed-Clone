/* eslint-disable no-underscore-dangle */
/* eslint-disable object-shorthand */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useHistory } from 'react-router';
import toast from 'react-hot-toast';
import { createReactEditorJS } from 'react-editor-js';
import List from '@editorjs/list';
import Header from '@editorjs/header';

import ValuesSVG from '../../components/svg/ValuesSVG';
import companyUpload from '../../api/media/companyUpload';
import './css/Employeedetails.css';
import postCompany from '../../api/company/postCompanydetails';

const ReactEditorJS = createReactEditorJS();

const EDITOR_JS_TOOLS = {
  list: List,
  header: Header,
};

async function postImages({ image }) {
  // eslint-disable-next-line no-undef
  const formData = new FormData();
  formData.append('imageData', image);
  const response = await companyUpload(formData);
  return response;
}

const CompanyValues = () => {
  const history = useHistory();
  const company = useSelector((state) => state.user);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
  }, []);

  const [workCulture, setWorkCulture] = useState({
    Learning: false,
    Caring: false,
    Purpose: false,
    Enjoyment: false,
    Results: false,
    Authority: false,
    Respect: false,
    Safety: false,
  });
  const [value, setValue] = useState({
    Trust: false,
    Loyalty: false,
    Ingenuity: false,
    Honesty: false,
    Accounting: false,
    Simplicity: false,
    Respect: false,
    ValueCentricity: false,
  });
  const [mission, setMission] = useState('');
  const [about, setAbout] = useState('');
  const [photo, setPhoto] = useState('');
  const [logo, setLogo] = useState({});

  const backtoprofile = () => {
    history.push('/employee/company');
  };

  const editorJS = React.useRef(null);
  const handleInitialize = React.useCallback((instance) => {
    editorJS.current = instance;
  }, []);
  const handleSave = async () => {
    const savedData = await editorJS.current.save();
    return savedData;
  };

  const saveDetails = async (e) => {
    const workKeys = Object.keys(workCulture);
    const filteredWorkKeys = workKeys.filter((key) => workCulture[key]);
    const work = filteredWorkKeys.toString();

    const valuesKeys = Object.keys(value);
    const filteredValuesKeys = valuesKeys.filter((key) => value[key]);
    const val = filteredValuesKeys.toString();

    e.preventDefault();
    const media = [];
    media.push(photo.url);
    const descriptionObj = await handleSave();

    const body = {
      name: company.company.name,
      ceo: company.company.ceo,
      headquarters: company.company.headquarters,
      revenue: company.company.revenue,
      website: company.company.website,
      foundedOn: company.company.foundedOn,
      industry: { name: company.company.industry.name },
      size: company.company.size,
      description: descriptionObj,
      about: about,
      workCulture: work,
      mission: mission,
      values: val,
      media,
      logo: logo.url,
    };
    const response = await postCompany(body, company.company.id);
    if (!response) {
      toast.error('Could not update!');
      return;
    }
    history.push('/hire');
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
  const uploadLogo = async (event) => {
    event.preventDefault();
    const fil = event.target.files[0];
    const result = await postImages({ image: fil });
    if (!result) {
      return;
    }
    setLogo({ url: result.data });
  };

  return (
    <>
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
              width: '50%',
            }}
          >
            <div style={{ minWidth: '0px', width: '100%', paddingLeft: '40px' }}>
              <span
                style={{
                  fontWeight: '700',
                  color: 'rgb(45, 45, 45)',
                  fontFamily: '"Noto Sans", "Helvetica Neue", Helvetica, Arial, "Liberation Sans", Roboto, Noto, sans-serif',
                  lineHeight: '1.25',
                  fontSize: '1.75rem',
                }}
              >
                Include Company details
              </span>
            </div>
            <div style={{ width: '350px', height: '180px', paddingBottom: '20px' }}>
              <ValuesSVG style={{ width: '350px', height: '180px' }} />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'white',
              borderRadius: '1rem',
              marginTop: '2rem',
              width: '50%',
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
                  fontFamily: '"Noto Sans", "Helvetica Neue", Helvetica, Arial, "Liberation Sans", Roboto, Noto, sans-serif',
                  lineHeight: '1.5',
                  fontSize: '1.25rem',
                }}
              >
                Your company is now created, please tell about your company...
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
                  Mission
                  <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  value={mission}
                  onChange={(e) => setMission(e.target.value)}
                  required
                  className="employeeInput"
                />
              </div>
              <div className="employeeform">
                <label className="employeeLabel">
                  Description
                  <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
                </label>

                <ReactEditorJS
                  onInitialize={handleInitialize}
                  tools={EDITOR_JS_TOOLS}
                />
              </div>
              <div className="employeeform">
                <label className="employeeLabel">
                  About
                  <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  required
                  className="employeeInput"
                />
              </div>
              <div className="employeeform">
                <label className="employeeLabel">
                  Values
                  <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
                </label>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem ' }}>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Loyalty"
                        onChange={(event) => setValue(
                          {
                            Loyalty: event.target.checked,
                          },
                        )}
                      />
                    </div>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Honesty"
                        onChange={(event) => setValue(
                          {
                            Honesty: event.target.checked,
                          },
                        )}
                      />
                    </div>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Trust"
                        onChange={(event) => setValue(
                          {
                            Trust: event.target.checked,
                          },
                        )}
                      />
                    </div>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Ingenuity"
                        onChange={(event) => setValue(
                          {
                            Ingenuity: event.target.checked,
                          },
                        )}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Accountability"
                        onChange={(event) => setValue(
                          {
                            Accountability: event.target.checked,
                          },
                        )}
                      />
                    </div>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Simplicity"
                        onChange={(event) => setValue(
                          {
                            Simplicity: event.target.checked,
                          },
                        )}
                      />
                    </div>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Respect"
                        onChange={(event) => setValue(
                          {
                            Respect: event.target.checked,
                          },
                        )}
                      />
                    </div>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Value-centricity"
                        onChange={(event) => setValue(
                          {
                            ValueCentricity: event.target.checked,
                          },
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="employeeform">
                <label className="employeeLabel">
                  Work Culture
                  <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
                </label>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem ' }}>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Learning"
                        onChange={(event) => setWorkCulture(
                          {
                            Learning: event.target.checked,
                          },
                        )}
                      />
                    </div>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Caring"
                        onChange={(event) => setWorkCulture(
                          {
                            Caring: event.target.checked,
                          },
                        )}
                      />
                    </div>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Purpose"
                        onChange={(event) => setWorkCulture(
                          {
                            Purpose: event.target.checked,
                          },
                        )}
                      />
                    </div>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Enjoyment"
                        onChange={(event) => setWorkCulture(
                          {
                            Enjoyment: event.target.checked,
                          },
                        )}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Results"
                        onChange={(event) => setWorkCulture(
                          {
                            Results: event.target.checked,
                          },
                        )}
                      />
                    </div>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Authority"
                        onChange={(event) => setWorkCulture(
                          {
                            Authority: event.target.checked,
                          },
                        )}
                      />
                    </div>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Respect"
                        onChange={(event) => setWorkCulture(
                          {
                            Respect: event.target.checked,
                          },
                        )}
                      />
                    </div>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Safety"
                        onChange={(event) => setWorkCulture(
                          {
                            Safety: event.target.checked,
                          },
                        )}
                      />
                    </div>
                  </div>
                </div>
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
              width: '45%',
              padding: '3rem',
              marginTop: '2rem',
            }}
          >
            <div style={{
              paddingBottom: '1rem', display: 'flex', flexDirection: 'column',
            }}
            >
              <span className="employeeLabel">Add Photo</span>
              <span style={{ paddingTop: '0.5rem', color: 'rgb(89, 89, 89)', fontSize: '14px' }}>Give an inside look at working at your company by adding photos to your post</span>
              <div>
                <input
                  onChange={uploadPhoto}
                  type="file"
                  accept="image/*"
                  style={{ paddingTop: '10px' }}
                />
              </div>
              <span className="employeeLabel">Add Logo</span>
              <div>
                <input
                  onChange={uploadLogo}
                  type="file"
                  accept="image/*"
                  style={{ paddingTop: '10px' }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: 'white',
              borderRadius: '1rem',
              width: '45%',
              padding: '3rem',
              marginTop: '2rem',
            }}
          >
            <div>
              <button className="employeeBack" onClick={backtoprofile}>back</button>
            </div>
            <div>
              <button type="submit" className="employeeButton">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </form>

    </>
  );
};

export default CompanyValues;
