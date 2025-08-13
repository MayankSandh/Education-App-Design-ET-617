# Game Theory Learning App

This is a learning website built with React and Firebase, focusing on interactive content for Game Theory, including text, videos, and quizzes. It also tracks user activity (clickstream data) using Firestore.

## Features

*   User registration and login using Firebase Authentication.
*   Interactive Game Theory content page with text and an embedded YouTube video.
*   Simple multiple-choice quiz on Game Theory.
*   Clickstream tracking of user activities (page views, navigation clicks, login/registration events, quiz attempts/answers/completions) to Firestore.
*   Deployment to Firebase Hosting.

## Technologies Used

*   **Frontend:** React.js (with Vite)
*   **Authentication & Database:** Firebase (Authentication, Firestore)
*   **Routing:** React Router DOM
*   **Deployment:** Firebase Hosting

## Setup and Installation

### Prerequisites

*   Node.js (LTS version recommended)
*   npm (Node Package Manager)
*   Firebase CLI (Command Line Interface)

### Steps

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd Education-App-Design-ET-617/frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Firebase Project Setup:**
    a.  Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project (e.g., "GameTheoryLearningApp").
    b.  **Enable Authentication:** In the Firebase console, navigate to **Build > Authentication > Get started > Sign-in method** and enable **Email/Password**.
    c.  **Enable Firestore Database:** Navigate to **Build > Firestore Database > Create database**. Choose "Start in production mode" and select your preferred region (e.g., `us-central1`).
    d.  **Get your Firebase Configuration:** In **Project settings** (gear icon), scroll down to "Your apps" and add a new web app (</> icon). Copy the `firebaseConfig` object.

4.  **Update Firebase Configuration in your app:**
    Open `frontend/src/firebase.js` and replace the placeholder `firebaseConfig` object with the one you copied from the Firebase Console.

    ```javascript
    // frontend/src/firebase.js
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getFirestore } from "firebase/firestore";

    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID",
      measurementId: "YOUR_MEASUREMENT_ID" // Optional
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    export { auth, db };
    ```

5.  **Update Firestore Security Rules:**
    Open `frontend/firestore.rules` and ensure it has the following rules to allow authenticated users to write to the `clickstream` collection:

    ```firestore
    // frontend/firestore.rules
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /clickstream/{docId} {
          allow read: if true;
          allow write: if request.auth != null;
        }
        // Allow read access to all other documents (e.g., for general content)
        match /{document=**} {
          allow read: if true;
        }
      }
    }
    ```

## Running the Application Locally

To run the application on your local machine:

```bash
cd frontend
npm run dev
```

The app will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

## Deployment to Firebase Hosting

1.  **Install Firebase CLI (if you haven't already):**
    ```bash
    npm install -g firebase-tools
    ```

2.  **Log in to Firebase:**
    ```bash
    firebase login
    ```

3.  **Initialize Firebase in your project directory:**
    (Make sure you are in the `frontend` directory)
    ```bash
    firebase init
    ```
    *   Select **Firestore** and **Hosting** (use Spacebar to select, Enter to confirm).
    *   Choose your Firebase project.
    *   For Firestore rules: Accept default (`firestore.rules`).
    *   For Firestore indexes: Accept default (`firestore.indexes.json`).
    *   For public directory: Type `dist` and press Enter.
    *   Configure as a single-page app: Type `Y` and press Enter.
    *   Set up automatic builds with GitHub: Type `N` and press Enter.

4.  **Build the React application for production:**
    ```bash
    npm run build
    ```
    This will create a `dist` folder containing your optimized production build.

5.  **Deploy to Firebase Hosting:**
    ```bash
    firebase deploy --only hosting
    ```

    After successful deployment, Firebase will provide you with the Hosting URL.

## Viewing Clickstream Data

Once users interact with your deployed application, you can view the tracked clickstream data in your Firebase Console:

1.  Go to your [Firebase Console](https://console.firebase.google.com/) project.
2.  Navigate to **Build > Firestore Database**.
3.  You will see a collection named `clickstream` containing documents for each tracked event.
