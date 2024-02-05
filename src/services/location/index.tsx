import {Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export const requestPermission = async (iosPermission, androidPermission) => {
  let permission;

  if (Platform.OS === 'ios') {
    permission = iosPermission;
  } else {
    permission = androidPermission;
  }
  const status = await check(permission);
  if (status === RESULTS.DENIED) {
    const requestStatus = await request(permission);
    return requestStatus === RESULTS.GRANTED;
  }

  return status === RESULTS.GRANTED;
};

export const requestLocationPermission = async () => {
  return requestPermission(
    PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  );
};

export const requestLibraryPermission = async () => {
  return requestPermission(
    PERMISSIONS.IOS.PHOTO_LIBRARY,
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  );
};
