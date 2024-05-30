# Messaging System Api

## Setup
### Clone the Repository:
git clone <repository_url>

### Install Dependencies:
Navigate to the project directory and install dependencies using npm:

cd <project_directory>

npm install

Set Environment Variables:

Create a .env file in the root directory and set up environment variables as per the provided .env.example.

### Run the Server:

Start the server using npm:

npm start


### API Endpoints

Send Message

Endpoint: POST /api/conversations/send/:conversationId

#### Description: Send a message in a conversation.

Headers: Authorization token

Parameters:

conversationId: ID of the conversation

Body:

json


{
  "message": "Text message content"
}

#### Add Participant

Endpoint: POST /api/conversations/:conversationId/participants

Description: Add a participant to a conversation.

Headers: Authorization token

Parameters:

conversationId: ID of the conversation

Body:

json

{
  "userId": "ID of the user to add"
}


#### Remove Participant

Endpoint: DELETE /api/conversations/:conversationId/participants/:participantId

Description: Remove a participant from a conversation.

Headers: Authorization token

Parameters:

conversationId: ID of the conversation

participantId: ID of the participant to remove


#### Get Messages

Endpoint: GET /api/conversations/:conversationId/messages

Description: Get messages in a conversation.

Headers: Authorization token

##### Parameters:

conversationId: ID of the conversation

##### Query Parameters:

page (optional): Page number for pagination (default: 1)

pageSize (optional): Number of messages per page (default: 10)

### Testing with Postman
Install Postman:

***If you haven't already, download and install Postman.
#### Import Collection:
Import the provided Postman collection (Conversation_API.postman_collection.json) into Postman.

#### Set Environment Variables:
Create a new environment in Postman.

Add a variable named baseUrl and set its value to your server's base URL (e.g., http://localhost:3000).

#### Authenticate:
Send a POST request to /api/signup with the required user details to create a new account.

Send a POST request to /api/login with the user credentials to obtain an authentication token.

#### Access Endpoints:
Use the obtained token as the Authorization header for accessing protected endpoints.

Send requests to the various endpoints in the collection, providing necessary parameters and payloads.


#### Error Handling
Errors are handled centrally and returned in a consistent format. Details of errors are provided in the response body along with appropriate status codes.

### Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.







