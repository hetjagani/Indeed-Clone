const whatFilter = [
  { title: 'work from home' },
  { title: 'part time' },
  { title: 'hiring immediately' },
  { title: 'remote' },
  { title: 'full time' },
  { title: 'remote work from home' },
  { title: 'warehouse' },
  { title: 'amazon' },
  { title: 'receptionist' },
  { title: 'walmart' },
];

const whereFilter = [
  { title: 'San Jose, CA' },
  { title: 'San Francisco, CA' },
  { title: 'Sunnyvale, CA' },
  { title: 'Santa Clara, CA' },
  { title: 'Sacramento, CA' },
  { title: 'Fremont, CA' },
  { title: 'Los Angeles, CA' },
  { title: 'Oakland, CA' },
  { title: 'Las Vegas, NV' },
  { title: 'Reno, NV' },
  { title: 'Any location' },
];

const datePostedFilter = [
  { title: 'Last 24 hours' },
  { title: 'Last 3 days' },
  { title: 'Last 7 days' },
  { title: 'Last 14 days' },
  { title: 'Any date' },
];

const jobTypeFilter = [
  { title: 'Full Time' },
  { title: 'Internship' },
  { title: 'Contract' },
];

const industryFilter = [
  { title: 'Business Operations & Management' },
  { title: 'Construction' },
  { title: 'Education' },
  { title: 'Finance & Accounting' },
  { title: 'Food & Beverage' },
  { title: 'Healthcare' },
  { title: 'Manufacturing & Utilities' },
  { title: 'Marketing, Advertising & Public Relations' },
  { title: 'Sales & Retail' },
  { title: 'Technology' },
  { title: 'Transportation' },
];

module.exports = {
  whatFilter, whereFilter, datePostedFilter, jobTypeFilter, industryFilter,
};
