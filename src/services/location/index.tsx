import {Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export const requestLocationPermission = async () => {
  let permission;

  if (Platform.OS === 'ios') {
    permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
  } else {
    permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  }
  const status = await check(permission);
  if (status === RESULTS.DENIED) {
    const requestStatus = await request(permission);
    return requestStatus === RESULTS.GRANTED;
  }

  return status === RESULTS.GRANTED;
};
