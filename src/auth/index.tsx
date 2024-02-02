import auth from '@react-native-firebase/auth';

export const signUp = async (email: string, password: string) => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    console.log('User signed up!');
  } catch (error) {
    console.error('Error signing up:', error);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    console.log('User signed in!');
  } catch (error) {
    console.error('Error signing in:', error);
  }
};

export const signOut = async () => {
  try {
    await auth().signOut();
    console.log('User signed out!');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};
