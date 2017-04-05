import { StyleSheet } from 'react-native';

const palette = {
  red: '#EB7260',
  yellow: '#D0D900',
  blue: '#3A9AD9',
  green: '#29ABA4',
  iosBackgroundGrey: '#E9E9F0',
  lightGrey: '#EEE',
  darkGrey: '#354458',
};

const styles = StyleSheet.create({
  textColor: {
    color: palette.darkGrey,
  },
  secondaryTextColor: {
    color: palette.lightGrey,
  },
});

const ThemeService = {
  ...palette,
  primary: palette.red,
  secondary: palette.green,
  styles,
};

export default ThemeService;
