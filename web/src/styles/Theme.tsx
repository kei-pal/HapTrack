import { PaletteMode } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: '#325892',
          },
          secondary: {
            main: '#fdbf39',
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#90caf9'
          },
          secondary: {
            main: '#fdbf39',
          },
        }),
  },
});