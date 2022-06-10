import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
    sm: "40em",
    md: "52em",
    lg: "64em",
    xl: "80em",
});

const theme = extendTheme(
    {
        fonts,
        breakpoints,
        colors: {
            primary: {
                "50": "#f6f8f8",
                "100": "#dae2e2",
                "200": "#bac8c9",
                "300": "#95aaab",
                "400": "#7f999b",
                "500": "#6a8183",
                "600": "#596d6e",
                "700": "#475759",
                "800": "#3c4a4b",
                "900": "#2b3536"
            },
            secondary: {
                main: "#B4CFB0",
                dark: "#94B49F"
            },
            highlight: {
                main: '#91818A'
            },
            background: {
                main: "#F9F7F7",
            },
            //#F18F88
        },
    },

    withDefaultColorScheme({
        colorScheme: "primary",
    })
);

export default theme;
