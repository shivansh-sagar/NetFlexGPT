# Netflex GPT
- Create viteApp
- Configured TailwindCSS
- Header
- Routing of App
- Login Form / SignUp Form
- form validation
- Firebase Setup
- Create SignUp User Account

# Features
- Login/Sign Up
    - SignIn / SignUp form
    - redirect to Browse Page 
- Browse (after authentication)
    - Header
    - Main Movie
        - Tailer in BG
        - Title & Description
        - Movie Suggestion
            - MoviesList + N
- NetflexGPT
    - Search Bar
    - Movie Suggestions

# Firebase Authentication Setup and Deployment

This repository contains the steps to set up Firebase Authentication and deploy your project using Firebase Hosting.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)
- Firebase account

## Setup Instructions

Follow these steps to configure and deploy your project using Firebase.

### 1. Install Firebase CLI

To start, install the Firebase CLI globally on your machine using npm:

```bash
npm install -g firebase-tools
```
### 2.  Log in to Firebase

After installing the Firebase CLI, log in to your Firebase account:
``` bash
firebase login
```
This will open your default browser and prompt you to log in to Firebase. Follow the on-screen instructions.

### 3. Initialize Firebase in Your Project
To set up Firebase in your project, run the following command in the root directory of your project:
```bash
firebase init
```
When prompted, select Hosting and follow the instructions to set up Firebase Hosting.

### 4. Build Your Project
Before deploying, ensure your project is built. If you're using a tool like React, Angular, or Vue, you can usually build your project with:
```bash
npm run build
```
When prompted, select Hosting and follow the instructions to set up Firebase Hosting.

### 5. Deploy to Firebase Hosting
Finally, deploy your project to Firebase Hosting with the following command:
```bash
firebase deploy
```
This command uploads your production files to Firebase, making your project live.

## Additional Information
- For more detailed information, refer to the Firebase Documentation.
- Ensure that your firebase.json and .firebaserc files are correctly configured for your project.