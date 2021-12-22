# Indeed-Clone

In this project a job board (portal) is developed similar to Indeed. This application enables users to login as employers and allow them to add their company profile information and post job openings in the companies. Also users can login as job seekers who can apply for the jobs posted for the company. The job seekers (or normal users) can also post reviews for the companies and also post pictures of the company they are working at. All these reviews and pictures are not posted directly but are verified through admin of Indeed. The admin can approve/reject the reviews/pictures which are posted by job seekers. Also admin can see analytics information about admin.

## System Architecture
![System Architecture](IndeedSystemDesign.png)

We have designed the application with microservice architecture and divided the whole backend application into the above shown seven services. These services have independent databases and chosen databases (MySql or MongoDB) based on the needs for that particular service. Caching server (Redis) is used for fast retrieval of data
which is requested frequently. Also for scalability and reliability, Kafka is used for accessing databases. All database calls are done by a kafka-backend server which subscribes to various topics for data that is requested by other services. A docker-compose file is provided which builds containers for all services and run the whole application stack.

## Demo Video
[![Indeed Clone Demo](Cover.png)](https://www.youtube.com/watch?v=PFtoADovLRU)


## How to Run
* There is sample config file (config.json) in each service folders which you should edit with proper values. (To run in develop mode no need to edit any file)
* To run the servers and frontend (web) just run `docker-compose up`
* Access the web app at `localhost:3000`
* Following are the API Docs URL for each service
    - Auth: `localhost:7000/api-docs`
    - Company: `localhost:7001/api-docs`
    - User: `localhost:7002/api-docs`
    - Application: `localhost:7003/api-docs`
    - Review: `localhost:7004/api-docs`
    - Photos: `localhost:7005/api-docs`
    - Chat: `localhost:7006/api-docs`
