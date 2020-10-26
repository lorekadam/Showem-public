export const palette = {
  blueberry: "#3f4982",
  carnation: "#fa769d",
  soft_green: "#69c173",
  very_light_blue: "#e4efff",
  super_light_blue: "#828dcb",
  dark_grey_blue: "#403465",
  blue_with_a_hint_of_purple: "#3c57c6",
  pale: "#ffeedb",
  very_light_pink: "#dfdfdf",
  dark_grey_blue_two: "#353a58",
  pastel_blue: "#acb6f0",
  logo_blue: "#1f2c77",
  green: "#34cc45",
  white: "#ffffff",
  black: "#000000",
  facebook: "#4664a0",
};

const button = {
  height: 46,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "l",
  padding: "m",
};

const buttonLabel = {
  letterSpacing: 1.25,
  fontFamily: "robotoMedium",
  fontSize: 14,
};

const regularText = {
  letterSpacing: 0.25,
  fontFamily: "roboto",
  fontSize: 14,
};

const radio = {
  marginRight: "s",
  width: 20,
  height: 20,
  borderRadius: "l",
  borderWidth: 2,
  borderStyle: "solid",
  borderColor: "textDark",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const checkbox = {
  marginRight: "s",
  width: 18,
  height: 18,
  borderRadius: "xxs",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "lightPrimary",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "inputBorder",
};

const theme = {
  colors: {
    black: palette.black,
    white: palette.white,
    lightPrimary: palette.very_light_blue,
    superLightPrimary: palette.super_light_blue,
    inactivePrimary: palette.pastel_blue,
    textLight: palette.white,
    textDark: palette.dark_grey_blue_two,
    textPrimary: palette.blue_with_a_hint_of_purple,
    textError: palette.carnation,
    textSecondary: palette.green,
    secondaryButtonBackground: palette.green,
    primaryButtonBackground: palette.blue_with_a_hint_of_purple,
    secondaryButtonOutline: palette.blue_with_a_hint_of_purple,
    facebookButtonBackground: palette.facebook,
    logo: palette.logo_blue,
    inputBorder: palette.very_light_pink,
    screenBackground: palette.logo_blue,
    red: "#e7507c",
    green: "#61c66d",
    orange: "#fca062",
    blue: "#4b6dea",
    violet: "#b626e2",
    yellow: "#ffd022",
  },
  borderRadii: {
    xxs: 2,
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 80,
    xxxl: 120,
    panel: 35,
  },
  spacing: {
    xxs: 2,
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 80,
    xxxl: 120,
    "-xxs": -2,
    "-xs": -4,
    "-s": -8,
    "-m": -16,
    "-l": -24,
    "-xl": -40,
    "-xxl": -80,
    "-xxxl": -120,
    "10": 10,
    "12": 12,
    "20": 20,
    "28": 28,
    "45": 45,
    "50": 50,
    "0": 0,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  zIndices: {
    "1": 1,
    "100": 100,
  },
  gridVariants: {
    column: {
      display: "flex",
      flexDirection: "column",
    },
    columnCenter: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    row: {
      display: "flex",
      flexDirection: "row",
    },
    rowCenter: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    element: {
      flex: 1,
    },
    elementCenter: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  },
  textVariants: {
    logo: {
      fontFamily: "poppinsBold",
      letterSpacing: 1,
      fontSize: 36,
      color: "logo",
    },
    textLight: {
      ...regularText,
      color: "textLight",
    },
    textDark: {
      ...regularText,
      color: "textDark",
    },
    textPrimary: {
      ...regularText,
      color: "textPrimary",
    },
    textLightPrimary: {
      ...regularText,
      color: "lightPrimary",
    },
    textSuperPrimary: {
      ...regularText,
      color: "superLightPrimary",
    },
    textGray: {
      ...regularText,
      color: "inputBorder",
    },
    textSecondary: {
      ...regularText,
      color: "textSecondary",
    },
    textError: {
      ...regularText,
      color: "textError",
    },
    textErrorSmall: {
      ...regularText,
      fontSize: 12,
      color: "textError",
    },
    textLightSmall: {
      ...regularText,
      color: "textLight",
      fontSize: 12,
    },
    textSecondaryUnderlineSmall: {
      ...regularText,
      fontSize: 12,
      color: "textSecondary",
      textDecorationLine: "underline",
    },
    textDarkUnderlineSmall: {
      ...regularText,
      fontSize: 12,
      color: "textDark",
      textDecorationLine: "underline",
    },
    buttonLabel: {
      ...buttonLabel,
      color: "textLight",
    },
    buttonLabelPrimary: {
      ...buttonLabel,
      color: "textPrimary",
    },
    buttonLabelSecondary: {
      ...buttonLabel,
      color: "textSecondary",
    },
    buttonLabelDark: {
      ...buttonLabel,
      color: "textDark",
    },
    buttonLabelLight: {
      ...buttonLabel,
      color: "textLight",
    },
    modalHeader: {
      fontSize: 20,
      fontFamily: "robotoMedium",
      color: "textPrimary",
    },
    heading: {
      fontSize: 24,
      fontFamily: "roboto",
      color: "textDark",
    },
    subheading: {
      fontSize: 16,
      fontFamily: "roboto",
      color: "textDark",
    },
    headingLight: {
      fontSize: 24,
      fontFamily: "roboto",
      color: "textLight",
    },
    subheadingLight: {
      fontSize: 16,
      fontFamily: "roboto",
      color: "textLight",
    },
  },
  buttonVariants: {
    primary: {
      ...button,
      backgroundColor: "primaryButtonBackground",
    },
    secondary: {
      ...button,
      backgroundColor: "secondaryButtonBackground",
    },
    error: {
      ...button,
      backgroundColor: "red",
    },
    primaryOutline: {
      ...button,
      backgroundColor: "white",
      borderWidth: 2,
      borderStyle: "solid",
      borderColor: "secondaryButtonOutline",
    },
    white: {
      ...button,
      backgroundColor: "white",
    },
    transparent: {
      ...button,
    },
    transparentCircle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "l",
    },
    transparentWrapper: {},
    textPrimary: {
      fontSize: 14,
      color: "textPrimary",
    },
    facebook: {
      ...button,
      backgroundColor: "facebookButtonBackground",
    },
    option: {
      borderWidth: 2,
      borderStyle: "solid",
      borderColor: "inactivePrimary",
      backgroundColor: "white",
      height: 46,
      borderRadius: "l",
    },
    optionActive: {
      borderWidth: 2,
      borderStyle: "solid",
      borderColor: "textPrimary",
      backgroundColor: "textPrimary",
      height: 46,
      borderRadius: "l",
    },
    pill: {
      paddingLeft: "m",
      paddingTop: "xs",
      paddingBottom: "xs",
      paddingRight: "28",
      backgroundColor: "lightPrimary",
      borderRadius: "l",
    },
  },
  iconButtonVariants: {},
  iconVariants: {
    extraSmallSize: {
      fontSize: 10,
      width: 10,
      height: 10,
    },
    smallSize: {
      fontSize: 16,
      width: 16,
      height: 16,
    },
    mediumSize: {
      fontSize: 24,
      width: 24,
      height: 24,
    },
    primary: {
      fontSize: 24,
      width: 24,
      height: 24,
      color: "textPrimary",
    },
    dark: {
      fontSize: 24,
      width: 24,
      height: 24,
      color: "textDark",
    },
    light: {
      fontSize: 24,
      width: 24,
      height: 24,
      color: "textLight",
    },
    checkbox: {
      fontSize: 16,
      width: 16,
      height: 16,
      color: "textLight",
    },
    boughtCheck: {
      fontSize: 16,
      width: 16,
      height: 16,
      color: "textPrimary",
    },
    primaryCircle: {
      fontSize: 16,
      width: 30,
      height: 30,
      backgroundColor: "textPrimary",
      color: "textDark",
    },
  },
  radioVariants: {
    inactive: {
      ...radio,
    },
    primary: {
      ...radio,
      borderColor: "textPrimary",
    },
  },
  checkboxVariants: {
    inactive: {
      ...checkbox,
    },
    primary: {
      ...checkbox,
      borderColor: "textPrimary",
      backgroundColor: "textPrimary",
    },
  },
  inputVariants: {
    default: {
      fontSize: 14,
      fontFamily: "roboto",
      borderRadius: "l",
      color: "textDark",
      backgroundColor: "white",
      height: 46,
      paddingLeft: "m",
      paddingRight: "m",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "inputBorder",
    },
    player: {
      fontSize: 14,
      fontFamily: "roboto",
      borderRadius: "l",
      color: "textDark",
      backgroundColor: "white",
      height: 46,
      paddingLeft: "xl",
      paddingRight: "xl",
      borderWidth: 2,
      borderStyle: "solid",
      borderColor: "textDark",
      textAlign: "center",
    },
  },
};

export type Theme = typeof theme;
export default theme;
