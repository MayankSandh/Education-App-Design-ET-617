import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const trackEvent = async (eventName, properties = {}, userId = null) => {
  try {
    await addDoc(collection(db, 'clickstream'), {
      eventName,
      timestamp: serverTimestamp(),
      userId,
      ...properties,
    });
    console.log(`Event "${eventName}" tracked successfully.`);
  } catch (e) {
    console.error("Error tracking event: ", e);
  }
};

export default trackEvent;
