import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    paddingHorizontal: 20,
    alignContent: 'center',
    marginTop: 10,
    backgroundColor: colors.white,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.gray,
  },
  buttonContainer: {
    marginHorizontal: 40,
    marginTop: 10,
    zIndex: 0,
  },
  loadingText: {
    color: colors.black,
    fontSize: 16,
    textAlign: 'center',
  },
  clearAllText: {
    color: colors.green,
  },
});
