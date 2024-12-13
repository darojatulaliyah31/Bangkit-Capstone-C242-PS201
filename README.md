# Teknisiku App - Cloud Computing
## Bangkit Capstone Project 2024 Batch 2

Bangkit Capstone Team ID : C23 - PS321 <br>
Here is our repository for the Bangkit 2024 Batch 2 Capstone project - Cloud Computing.

## DESCRIPTION
Cloud Computing have responsible for creating and managing APIs, databases and servers. We also provide services needed by the Mobile Development and Machine Learning divisions, so that the features we have designed in this mobile application, the data and information entered by users can be properly used, stored and maintained.

## Cloud Development Schedule
|  Task  |     Week 1     |       Week 2        |            Week 3          |           Week 4          |
| :----: | :------------: | :-----------------: | :------------------------: |:------------------------: |
| Task 1 | Research services that needed for app features   | Setup Cloud Services      | Connect APIs to Firebase and GCP  | Testing and Evaluation API  |
| Task 2 | Design Cloud Architecture for App | Build API |        Debugging APIs program on localhost       | Deploy APIs in App Engine             |

## TOOLS
- JavaScript
- Node js
- Framework : Express js
- Google Cloud Platform
- Firebase
- Postman

## CLOUD ARCHITECTURE
![ObengCloudArchitecture](https://storage.googleapis.com/foto-tempat-service/logo/Google%20Cloud%20Architecture%20Diagram%20(1).jpg)

## API Description
The API is built using node js and express js as our API framework, we use Firebase Authentication for registration and login functions, and also use Firestore Database to store user data and utilize Google Cloud Storage to store images. We deploy and implement this API and Machine Learning model with App Engine.
<br>
## API URL
[Teknisiku URL](https://api-native-444210.et.r.appspot.com)<br>

## SECURITY
To access our APIs which stores data and images in our databases, we keep serviceAccountKey.json that  authenticate and authorize access to Google Cloud Platform (GCP) services through Firebase only for admins.

## <a name="docum"></a>TEKNISIKU DOCUMENTATION API
### Teknisiku Endpoint Documentation 
[Teknisiku Endpoint Documentation](https://www.postman.com/capstone-teknisiku-api/capstone-teknisiku-api-workspace/documentation/c3kdyak/teknisiku)

## How to run this code
* To use this code, need to connect your app with Firebase project first
* After connect your app with Firebase project, you need to setting Firestore database
* Download this repository, and open IDE app, we use VS Code to make this APIs
* Open the folder in VSCode and then open VSCode terminal
* Download the "package.json", thentype ```npm i``` and hit enter to intall all dependencies
* Then type ```npm start``` to start the server
* It will run on http://localhost:8080

## How to use the endpoint
* To use this endpoint, need to use a serviceAccountKey.json that our team provided
* After getting the serviceAccountKey.json, cut and paste that file into Cloud Computing folder 
* Open Postman app, enter URL request bar with https://api-native-444210.et.r.appspot.com
* Select method GET then Send the request
* If success, there will announce "Service Recommendation API is Running 🚀" on tab

![UseEndpoint](https://storage.googleapis.com/foto-tempat-service/logo/Screenshot%202024-12-13%20081740.png)

### For complete Documentation, please visit [Obeng Endpoint Documentation](#docum) above.
