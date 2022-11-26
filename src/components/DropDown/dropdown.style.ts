import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';

export const style = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 16,
  },
  label: {
    position: 'absolute',
    backgroundColor: colors.white,
    left: 30,
    top: 7,
    zIndex: 9999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  focused: {
    color: colors.green,
  },
  textInput: {
    backgroundColor: colors.white,
    borderColor: colors.green,
    borderWidth: 1,
    borderRightWidth: 0,
  },
  rightButtonsContainerStyle: {
    right: 0,
    backgroundColor: colors.white,
    borderColor: colors.green,
    borderWidth: 1,
    borderLeftWidth: 0,
  },
  dropDownItemText: {
    color: colors.black,
    padding: 15,
  },
  chevronIcon: {width: 15, height: 15},
});
