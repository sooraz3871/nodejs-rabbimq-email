# Rabbitmq-socket.io-Nodejs-Reactjs


## About the application Architecture
It simulates a system that hanldes a large number of email requests. It has a Nodejs publisher which sends the email data  to the queue. Rabbitmq is implemented as a message queue here. Another Nodejs backend is implemented as a subscriber which subscribes from the queue. The email is sent with the template provided and and details are stored in the mongodb database.
Reactjs acts as a client.



### To run the app
1. Clone the repo on your local machine - master branch </br> 
2. Make sure your local machine has the Docker running.
3. On your root folder Run docker-compose up </br> 
4. Check the terminal logs until  rabbitmq is connected and authorized for guest. 
5. Goto http://localhost:15673
6. Login with username and password - guest 
7. Create a new exchange  'send_email_exchange'
8. Create a new queue 'email_queue'
9. Bind the exchange with the queue with the routing key 'AA2023'
10.Check http://localhost:4000/api/api-docs for API documentation
11.Create a POST request at http://localhost:4000/v1/api/send
12. You should see the published messages in the queue after some time in the rabbitmq management ui
13. Login to https://ethereal.email with the followin creds
        user - cecil.koss@ethereal.email
        pass - kjAbGrM8HkTcWTNfAu
14. You can view the sent emails on the Emails Tab




## Performing health checks 

1. for publisher check http://localhost:4000/v1/api/health-check </br>
2. for subscriber check http://localhost:4001/v1/api/health-check
