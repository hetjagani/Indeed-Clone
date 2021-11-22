require('./config');
var connection = new require('./kafka/connection');
const createUser = require('./services/user/create');
const updateUser = require('./services/user/update');
const updateSalary = require('./services/salary/update');
const deleteUser = require('./services/user/delete');
const createSalary = require('./services/salary/create');
const deleteSalary = require('./services/salary/delete');
const createEmployer = require('./services/employer/create');
const updateEmployer = require('./services/employer/update');
const deleteEmployer = require('./services/employer/delete');
const createCompany = require('./services/company/create');
const updateCompany = require('./services/company/update');
const deleteCompany = require('./services/company/delete');
const createJob = require('./services/job/create');
const updateJob = require('./services/job/update');
const deleteJob = require('./services/job/delete');
const createReview = require('./services/review/create');
const updateReview = require('./services/review/update');
const deleteReview = require('./services/review/delete');
const createApplication = require('./services/application/create');
const updateApplication = require('./services/application/update');
const deleteApplication = require('./services/application/delete');

function handleTopicRequest(topic_name, fname) {
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log('server is running ');
  consumer.on('message', (message) => {
    console.log('MESSAGE RECEIVED FOR ' + topic_name);
    console.log(message.value);
    try {
      var data = JSON.parse(message.value);

      fname(data.data, (err, res) => {
        var payloads = [
          {
            topic: 'response_topic',
            messages: JSON.stringify({
              correlationId: data.correlationId,
              data: res,
            }),
            partition: 0,
          },
        ];
        if (!res && err) {
          payloads[0].messages = JSON.stringify({
            correlationId: data.correlationId,
            data: err,
          });
        }

        producer.send(payloads, function (err, data) {
          console.log('SENT DATA FROM KAFKA BACKEND: ');
          console.log(res);
          console.log(data);
        });
        return;
      });
    } catch (e) {
      console.error(e);
    }
  });
}

// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest('user.create', createUser);
handleTopicRequest('salary.create', createSalary);
handleTopicRequest('salary.update', updateSalary);
handleTopicRequest('salary.delete', deleteSalary);
handleTopicRequest('user.update', updateUser);
handleTopicRequest('user.delete', deleteUser);
handleTopicRequest('employer.create', createEmployer);
handleTopicRequest('employer.update', updateEmployer);
handleTopicRequest('employer.delete', deleteEmployer);
handleTopicRequest('company.create', createCompany);
handleTopicRequest('company.update', updateCompany);
handleTopicRequest('company.delete', deleteCompany);
handleTopicRequest('job.create', createJob);
handleTopicRequest('job.update', updateJob);
handleTopicRequest('job.delete', deleteJob);
handleTopicRequest('review.create', createReview);
handleTopicRequest('review.update', updateReview);
handleTopicRequest('review.delete', deleteReview);
handleTopicRequest('application.create', createApplication);
handleTopicRequest('application.update', updateApplication);
handleTopicRequest('application.delete', deleteApplication);