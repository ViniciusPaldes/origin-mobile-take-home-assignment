# Financial App - Tech Challenge - Vinícius Paldês

Hello, the goal of this app is to present my skills using React Native. The requirements are available in the original repo, this is a forked one from:

https://github.com/OriginFinancial/origin-mobile-take-home-assignment

## Presenting Video
Youtube URL with a Screen Record presenting the app (No Audio Included)
https://www.youtube.com/watch?v=nrQVZ5tANwg

## How to install and run

Please use Java Version 17.
- Clone the project `git@github.com:ViniciusPaldes/origin-mobile-take-home-assignment.git`
- Install dependencies `npm install`
- Install iOS pods `cd ios` then `pod install`
- Create a `.env` with the following format:
 

>  API_URL=https://tque3jpn1e.execute-api.us-east-1.amazonaws.com/mobile-tha
>     
> FIREBASE_API_KEY= 
>
> FIREBASE_AUTH_DOMAIN= 
>
> FIREBASE_PROJECT_ID=
>
> FIREBASE_STORAGE_BUCKET= 
>
> FIREBASE_MESSAGING_SENDER_ID=
>
> FIREBASE_APP_ID=
> 
> GOOGLE_MAPS_API_KEY=

## App Folder Structure

    .
    ├── ...                 # Same structure of any react-native-cli init
    ├── assets              # Assets folder for local images
    ├── src                 # Source
    │   ├── components      # Components that can be reused
    │   ├── context         # Context Provider to share data among the app
    │   └── database        # Realm database configuration
    │       └── model       # Models for database entity
    │   ├── navigation      # Navigation configuration
    │   ├── screens         # Screens (used in navigation)
    │   ├── services        # API Calls, Hooks and Specific Business Tasks

## Stack used
- Styling: **styled-components**
- Local database: **Realm**
- API integration: **fetch**
- Auth: **Firebase Authentication**
- Image Storage (For Receipt Images): **Firebase Storage**
- Maps: **react-native-maps** (With Google Cloud Service Provider)
- Navigation: **react-navigation**

## App Navigation

![App Screens](https://i.ibb.co/FVq1Y0q/Screenshot-2024-02-06-at-17-16-54.png)

## Offline mode

That's how I planned and developed the offline mode, using Realm as my local database

![Offline mode](https://i.ibb.co/F7ftNZb/Screenshot-2024-02-06-at-17-16-47.png)

## Attaching an Image as a Receipt for a transaction

![Flow for uploading an image as ](https://i.ibb.co/RYND5Cj/Screenshot-2024-02-06-at-17-16-40.png)

## Pending work

- Centralize spacing and colors in a single file to be reused;
- Complete SignUp form with Name and Selfie Picture (For Selfie Picture we can use the same logic that uploads the ReceiptImage)
- Forgot Password link received on the Email not working (Must check Firebase setup)


