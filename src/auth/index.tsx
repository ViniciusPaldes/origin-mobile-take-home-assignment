import auth from '@react-native-firebase/auth';

export const signUp = (email: string, password: string) => {
  return auth().createUserWithEmailAndPassword(email, password);
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

export const resetPassword = async (email: string) => {
  try {
    await auth().sendPasswordResetEmail(email);
    console.log('Password reset email sent!');
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};
