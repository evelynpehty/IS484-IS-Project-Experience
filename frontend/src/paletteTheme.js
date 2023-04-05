import { createTheme } from "@mui/material";

// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

export const appTheme = createTheme({
    palette: {
        primary: {
            main: "#E60000",
            light: "#E69F9F"
        },

        secondary: {
            main: "#4B4948",
            light: "#BFBFBF",
            dark: "#1E1B1B",
        },

        neutral: {
            main: "#FFFFFF",
            gray: "#918C8A"
        },

        other: {
            lightBlue: "#A4B6D2",
            mainBlue: "#0085FF",
            lightOrange: "#DBBB9E",
            mainOrange: "#FF7D1F",
            lightPurple: "#B5A4D2",
            mainPurple: "#5C42FF",
            lightGreen: "#8AB8B2",
            mainGreen: "#109878",
            lightRed: "#F7E6E6",
            success: "#109878"
        }
    },

    typography: {
        fontFamily: ["Roboto", "Arial"].join(","),
    }
});

export default appTheme;