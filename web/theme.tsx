import { extendTheme } from "@chakra-ui/core";

// const breakpoints = ["576px", "768px", "992px", "1200px"];

const Button = {
  baseStyle: {
    letterSpacing: 2,
    fontWeight: 500,
  },
  defaultProps: {
    colorScheme: "primary",
  },
};

const theme = extendTheme({
  fonts: {
    body: "roboto",
    heading: "roboto",
  },
  colors: {
    black: "#16161D",
    pageBackground: "#acb6f0",
    InputBorderColor: "#cdd5e0",
    primary: {
      50: "#e7eeff",
      100: "#c2ccf3",
      200: "#9baae5",
      300: "#7488d8",
      400: "#4d66cb",
      500: "#344cb2",
      600: "#273b8b",
      700: "#1b2a65",
      800: "#0d193f",
      900: "#03071b",
    },
    logo: "#1f2c77",
  },
  radii: {
    xs: "0.5rem",
    md: "1.5rem",
    lg: "2.5rem",
  },
  sizes: {
    "10": "3rem",
  },
  components: {
    Button,
  },
});

export default theme;
