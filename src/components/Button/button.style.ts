import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';

export const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.deepBlue,
    borderColor: colors.deepBlue,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
  },
  text: {
    color: colors.white,
    fontSize: 24,
  },
  buttonDisabled: {
    backgroundColor: colors.gray,
    borderColor: colors.gray,
  },
});
