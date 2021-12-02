/* eslint-disable no-underscore-dangle */
import { Card, CardContent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import getJobByCompanyID from '../../../api/jobs/getJobByCompanyID';
import getEmployerByID from '../../../api/employer/get';
import { compamny } from '../../../app/actions';

function EmployeeJobs() {
  const [jobs, setJobs] = useState([]);
  const [totalNumberOfJobs, setTotalNumberOfJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  // const [companyID, setCompanyID] = useState('');
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getCompanyJobs = async (id) => {
    setCurrentPage(1);
    const params = { page: 1, limit: 10 };
    const response = await getJobByCompanyID(id, params);
    if (!response) return;
    setJobs(response.data.nodes);
    setTotalNumberOfJobs(response.data.total);
    setTotalPages(Math.ceil(response.data.total / 10));
  };

  const getEmployerDetails = async () => {
    const response = await getEmployerByID(user.user.id);
    if (!response) {
      toast.error('Employer not found. Please login as employer!');
      return;
    }
    dispatch(compamny(response.data.company[0]));
    getCompanyJobs(response.data.company[0]._id);
  };

  useEffect(() => {
    getEmployerDetails();
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
  }, []);

  console.log(jobs);
  console.log(totalNumberOfJobs);
  console.log(totalPages);
  console.log(currentPage);

  return (
    <div style={{ backgroundColor: '#F3F2F1', height: '100%', padding: '20px' }}>
      <Card
        variant="outlined"
        className="jobCardHover"
        sx={{ borderRadius: '12px' }}
      >
        <CardContent>
          bruh2
        </CardContent>
      </Card>
    </div>
  );
}

export default EmployeeJobs;
