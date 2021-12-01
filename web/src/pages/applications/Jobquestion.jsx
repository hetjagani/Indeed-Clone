/* eslint-disable no-undef */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import postApplication from '../../api/application/postApplication';
import question from '../../api/application/question';
import upload from '../../api/media/upload';
import '../employee/css/Employeedetails.css';

async function postImages({ image }) {
  const formData = new FormData();
  formData.append('imageData', image);
  const response = await upload(formData);
  return response;
}

function Jobquestion({ compId, _id, setOpen }) {
  const user = useSelector((state) => state.user);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [resume, setResume] = useState('');
  const [cover, setCover] = useState('');

  useEffect(() => {
    const comanyId = {
      compId,
      id: _id,
    };
    question(comanyId).then((response) => {
      if (!response) {
        return;
      }
      setQuestions(response.data.questions);
    });
  }, []);

  const uploadResume = async (event) => {
    event.preventDefault();
    const fil = event.target.files[0];
    const result = await postImages({ image: fil });
    if (!result) {
      toast.error('Could not upload file!');
      return;
    }
    setResume(result.data.url);
  };
  const uploadCover = async (event) => {
    event.preventDefault();
    const fil = event.target.files[0];
    const result = await postImages({ image: fil });
    if (!result) {
      toast.error('Could not upload file!');
      return;
    }
    setCover(result.data.url);
  };
  const apply = (e) => {
    e.preventDefault();
    const payload = {
      resume,
      coverLetter: cover,
      jobId: _id,
      answers,
    };
    postApplication(payload, user.user.id).then((response) => {
      if (!response) {
        return;
      }
      if (response.status === 201) {
        toast.success('Application Submitted');
        setOpen(false);
      }
    });
  };
  const handleAnswers = (e, que) => {
    const answer = e.target.value;
    const ansObj = answers;
    ansObj[que] = answer;
    setAnswers(ansObj);
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
            Additional information
          </span>
        </div>
        <div>
          {questions.map((option) => (
            <div className="employeeform">
              <label className="employeeLabel">{option}</label>
              <input
                type="text"
                required
                onChange={(e) => handleAnswers(e, option)}
                className="employeeInput"
              />
            </div>
          ))}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label className="employeeLabel">
                Online Resume
                <div>
                  <input
                    onChange={uploadResume}
                    type="file"
                    accept="image/*"
                    className="profile_browse"
                  />
                </div>
              </label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label className="employeeLabel">
                Cover Letter
                <div>
                  <input
                    onChange={uploadCover}
                    type="file"
                    accept="image/*"
                    className="profile_browse"
                  />
                </div>
              </label>
            </div>
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
              border: 'none',
              width: '200px',
              fontSize: '16px',
              backgroundColor: 'white',
            }}
          >
            Return to job search
          </button>
        </div>
        <div>
          <button
            type="submit"
            className="employeeButton"
            style={{ width: '230px' }}
            onClick={apply}
          >
            Submit your application
          </button>
        </div>
      </div>
    </form>
  );
}

export default Jobquestion;
