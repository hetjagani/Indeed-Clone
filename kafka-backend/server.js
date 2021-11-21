require('./config');
var connection = new require('./kafka/connection');
const createUser = require('./services/user/create');
const updateUser = require('./services/user/update');
const updateSalary = require('./services/user/updateSalary');
const deleteUser = require('./services/user/delete');
const createSalary = require('./services/user/createSalary');
const deleteSalary = require('./services/user/deleteSalary');
const createEmployer = require('./services/employer/create');
const updateEmployer = require('./services/employer/update');
const deleteEmployer = require('./services/employer/delete');
const createCompany = require('./services/company/create');
const updateCompany = require('./services/company/update');
const deleteCompany = require('./services/company/delete');

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
        });
        return;
      });
    } catch (e) {
      console.error(e);
    }
  });
}

//Add your TOPICs here
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
