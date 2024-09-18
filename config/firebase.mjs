import * as dotenv from "dotenv";
dotenv.config();

export default {
  firebaseConfig: {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId,
  },
};

// export const uploadImageToFirebase = async (
//   fileBuffer,
//   originalName,
//   mimetype
// ) => {
//   const dateTime = new Date().toISOString().replace(/[:.]/g, "-"); // Tạo timestamp cho tên file
//   const storageRef = ref(storage, `files/${originalName}-${dateTime}`);

//   const metadata = {
//     contentType: mimetype,
//   };

//   try {
//     const snapshot = await uploadBytesResumable(
//       storageRef,
//       fileBuffer,
//       metadata
//     );
//     const downloadURL = await getDownloadURL(snapshot.ref);
//     return downloadURL;
//   } catch (error) {
//     throw new Error(`Error uploading file to Firebase: ${error.message}`);
//   }
// };
