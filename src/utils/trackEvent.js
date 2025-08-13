import { db, auth } from '../firebase-config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const trackEvent = async (eventType, eventData = {}) => {
  try {
    const user = auth.currentUser;
    const userId = user ? user.uid : 'anonymous';

    await addDoc(collection(db, 'clickstream'), {
      userId: userId,
      eventType: eventType,
      timestamp: serverTimestamp(),
      ...eventData,
    });
    console.log(`Event ${eventType} tracked successfully.`);
  } catch (e) {
    console.error("Error tracking event: ", e);
  }
};

export { trackEvent };
