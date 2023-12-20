import { ThemeProvider, TypographyVariantsOptions, createTheme } from "@mui/material/styles";
import { PropsWithChildren } from "react";


const typography: TypographyVariantsOptions = {
  fontFamily: [
    "Bubblegum Sans",
    "-apple-system",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
};



const overriddenLightTheme = createTheme({
//   ...RefineThemes.Magenta,
  typography: {
    ...typography,
  },
});

export const ThemeContextProvider: React.FC<PropsWithChildren> = ({
    children,
  }) => {
  
    return (
        <ThemeProvider
        
          // you can change the theme colors here. example: ...RefineThemes.Magenta,
          theme={overriddenLightTheme}
        >
          {children}
        </ThemeProvider>
    );
  };

