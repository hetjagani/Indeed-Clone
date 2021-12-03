/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { Checkbox, FormControlLabel } from '@mui/material';
import { createReactEditorJS } from 'react-editor-js';
import List from '@editorjs/list';
import Header from '@editorjs/header';
import toast from 'react-hot-toast';

import changeDateFormat from '../../../utils/changeDateFormat';
import CompanySVG from '../../../components/svg/CompanySVG';
import '../../employee/css/Employeedetails.css';

import companyUpload from '../../../api/media/companyUpload';
import getCompanyData from '../../../api/company/getCompanyData';
import putCompanyDetails from '../../../api/company/putCompanyDetails';

const ReactEditorJS = createReactEditorJS();

const EDITOR_JS_TOOLS = {
  list: List,
  header: Header,
};

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

// const DEFAULT_INITIAL_DATA = () => ({
//   time: new Date().getTime(),
//   blocks: [
//     {
//       type: 'header',
//       data: {
//         text: 'Company Description',
//         level: 1,
//       },
//     },
//   ],
// });

async function postImages({ image }) {
  // eslint-disable-next-line no-undef
  const formData = new FormData();
  formData.append('imageData', image);
  const response = await companyUpload(formData);
  return response;
}

function UpdateCompanyDetails() {
  // const dispatch = useDispatch();
  const company = useSelector((state) => state.user.company);
  const [ceo, setCeo] = useState('');
  const [industry, setIndustry] = useState('Business Operations & Management');
  const [headquarters, setHeadquarters] = useState('');
  const [foundedOn, setFoundedOn] = useState('');
  const [revenue, setRevenue] = useState('');
  const [size, setSize] = useState(49);
  const [website, setWebsite] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [mission, setMission] = useState('');
  const [about, setAbout] = useState('');
  const [photo, setPhoto] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [companyDetails, setCompanyDetails] = useState({});

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
  const [logo, setLogo] = useState({});
  const [description, setDescription] = useState(null);
  const [showFlag, setShowFlag] = useState(false);

  const getCompanyDetails = async () => {
    const companyData = await getCompanyData(company._id);
    if (!companyData) return;
    setCompanyDetails(companyData);
    setCompanyName(companyData.name);
    setCeo(company.ceo);
    setFoundedOn(
      companyData && companyData.foundedOn
        ? companyData.foundedOn.substring(0, 10)
        : null,
    );
    setDescription(companyData ? companyData.description : null);
    setHeadquarters(companyData ? companyData.headquarters : null);
    setIndustry(
      companyData && companyData.industry ? companyData.industry.name : null,
    );
    setRevenue(companyData ? companyData.revenue : null);
    setSize(companyData ? companyData.size : null);
    setWebsite(companyData ? companyData.website : null);
    setMission(companyData ? companyData.mission : null);
    setAbout(companyData ? companyData.about : null);

    if (companyData.values && companyData.values.length > 0) {
      const tempValueObj = {};
      const splitValues = companyData.values.split(',');
      splitValues.forEach((ele) => {
        if (ele !== '' && ele !== ' ') {
          tempValueObj[ele] = true;
        }
      });
      setValue(tempValueObj);
    }
    if (companyData && companyData.workCulture.length > 0) {
      const tempWorkCultureObj = {};
      const splitValues = companyData.workCulture.split(',');
      splitValues.forEach((ele) => {
        if (ele !== ' ' && ele !== '') {
          tempWorkCultureObj[ele] = true;
        }
      });

      setWorkCulture(tempWorkCultureObj);
    }
    setShowFlag(true);
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
    e.preventDefault();
    const formattedFoundedOn = String(changeDateFormat(foundedOn));
    const workKeys = Object.keys(workCulture);
    const filteredWorkKeys = workKeys.filter((key) => workCulture[key]);
    const work = filteredWorkKeys.toString();

    const valuesKeys = Object.keys(value);
    const filteredValuesKeys = valuesKeys.filter((key) => value[key]);
    const val = filteredValuesKeys.toString();

    const media = [];
    media.push(photo.url);
    const descriptionObj = await handleSave();

    const body = {
      name: companyName,
      ceo,
      headquarters,
      revenue,
      website,
      foundedOn: formattedFoundedOn,
      industry: { name: industry },
      size,
      description: descriptionObj,
      about,
      workCulture: work,
      mission,
      values: val,
      media,
      logo: logo.url,
    };
    const res = await putCompanyDetails(body, company._id);
    if (!res) {
      return;
    }
    toast.success('Details updated!');
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

  useEffect(() => {
    getCompanyDetails();
  }, []);

  return (
    <div>
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
              style={{ minWidth: '0px', width: '100%', paddingLeft: '40px' }}
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
                Include Company details
              </span>
            </div>
            <div
              style={{ width: '350px', height: '180px', paddingBottom: '20px' }}
            >
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
                You haven&apos;t posted a job before, please tell about your
                company.
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
                  onChange={(e) => {
                    setFoundedOn(e.target.value);
                  }}
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
                {typeof (description) === 'object' && showFlag ? (
                  <ReactEditorJS
                    defaultValue={description}
                    onInitialize={handleInitialize}
                    tools={EDITOR_JS_TOOLS}
                  />
                ) : null}
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
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '1rem ',
                    }}
                  >
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Loyalty"
                        checked={value && value.Loyalty ? value.Loyalty : null}
                        onChange={(event) => setValue({
                          ...value,
                          Loyalty: event.target.checked,
                        })}
                      />
                    </div>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Honesty"
                        checked={value && value.Honesty ? value.Honesty : null}
                        onChange={(event) => setValue({
                          ...value,
                          Honesty: event.target.checked,
                        })}
                      />
                    </div>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Trust"
                        checked={value && value.Trust ? value.Trust : null}
                        onChange={(event) => setValue({
                          ...value,
                          Trust: event.target.checked,
                        })}
                      />
                    </div>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Ingenuity"
                        checked={
                          value && value.Ingenuity ? value.Ingenuity : null
                        }
                        onChange={(event) => setValue({
                          ...value,
                          Ingenuity: event.target.checked,
                        })}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '1rem',
                    }}
                  >
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        defaultChecked={value.Accountability}
                        label="Accountability"
                        checked={
                          value && value.Accountability
                            ? value.Accountability
                            : null
                        }
                        onChange={(event) => setValue({
                          ...value,
                          Accountability: event.target.checked,
                        })}
                      />
                    </div>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Simplicity"
                        checked={
                          value && value.Simplicity ? value.Simplicity : null
                        }
                        onChange={(event) => setValue({
                          ...value,
                          Simplicity: event.target.checked,
                        })}
                      />
                    </div>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Respect"
                        checked={value && value.Respect ? value.Respect : null}
                        onChange={(event) => setValue({
                          ...value,
                          Respect: event.target.checked,
                        })}
                      />
                    </div>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Value-centricity"
                        checked={
                          value && value.ValueCentricity
                            ? value.ValueCentricity
                            : null
                        }
                        onChange={(event) => setValue({
                          ...value,
                          ValueCentricity: event.target.checked,
                        })}
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
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '1rem ',
                    }}
                  >
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Learning"
                        checked={
                          workCulture && workCulture.Learning
                            ? workCulture.Learning
                            : null
                        }
                        onChange={(event) => setWorkCulture({
                          ...workCulture,
                          Learning: event.target.checked,
                        })}
                      />
                    </div>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Caring"
                        checked={
                          workCulture && workCulture.Caring
                            ? workCulture.Caring
                            : null
                        }
                        onChange={(event) => setWorkCulture({
                          ...workCulture,
                          Caring: event.target.checked,
                        })}
                      />
                    </div>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        checked={
                          workCulture && workCulture.Purpose
                            ? workCulture.Purpose
                            : null
                        }
                        label="Purpose"
                        onChange={(event) => setWorkCulture({
                          ...workCulture,
                          Purpose: event.target.checked,
                        })}
                      />
                    </div>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        checked={
                          workCulture && workCulture.Enjoyment
                            ? workCulture.Enjoyment
                            : null
                        }
                        label="Enjoyment"
                        onChange={(event) => setWorkCulture({
                          ...workCulture,
                          Enjoyment: event.target.checked,
                        })}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '1rem',
                    }}
                  >
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        checked={
                          workCulture && workCulture.Results
                            ? workCulture.Results
                            : null
                        }
                        label="Results"
                        onChange={(event) => setWorkCulture({
                          ...workCulture,
                          Results: event.target.checked,
                        })}
                      />
                    </div>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Authority"
                        checked={
                          workCulture && workCulture.Authority
                            ? workCulture.Authority
                            : null
                        }
                        onChange={(event) => setWorkCulture({
                          ...workCulture,
                          Authority: event.target.checked,
                        })}
                      />
                    </div>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Respect"
                        checked={
                          workCulture && workCulture.Respect
                            ? workCulture.Respect
                            : null
                        }
                        onChange={(event) => setWorkCulture({
                          ...workCulture,
                          Respect: event.target.checked,
                        })}
                      />
                    </div>
                    <div className="companyradiodiv">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Safety"
                        checked={
                          workCulture && workCulture.Safety
                            ? workCulture.Safety
                            : null
                        }
                        onChange={(event) => setWorkCulture({
                          ...workCulture,
                          Safety: event.target.checked,
                        })}
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
              width: '37%',
              padding: '3rem',
              marginTop: '2rem',
            }}
          >
            <div
              style={{
                paddingBottom: '1rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span className="employeeLabel">Add Photo</span>
              <span
                style={{
                  paddingTop: '0.5rem',
                  color: 'rgb(89, 89, 89)',
                  fontSize: '14px',
                }}
              >
                Give an inside look at working at your company by adding photos
                to your post
              </span>
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
                Update Details
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateCompanyDetails;
