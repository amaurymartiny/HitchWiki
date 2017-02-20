import { StyleSheet } from 'react-native';

const palette = {
  red: '#EB7260',
  blue: '#3A9AD9',
  green: '#29ABA4',
  lightGrey: '#AAAAAA',
  darkGrey: '#354458',
};

const styles = StyleSheet.create({
  textColor: {
    color: palette.darkGrey
  },
  secondaryTextColor: {
    color: palette.lightGrey
  }
});

const ThemeService = {
  ...palette,
  primary: palette.red,
  secondary: palette.green,
  styles,
};

export default ThemeService;
