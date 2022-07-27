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
                "50": "#F0F5EF",
                "100": "#D5E4D3",
                "200": "#BAD3B6",
                "300": "#9FC199",
                "400": "#84B07D",
                "500": "#689F60",
                "600": "#547F4D",
                "700": "#3F5F3A",
                "800": "#2A3F27",
                "900": "#152013",
            },
            secondary: {
                main: "#B4CFB0",
                dark: "#94B49F",
            },
            highlight: {
                main: "#91818A",
            },
            background: {
                main: "#F9F7F7",
            },
            //#F18F88
        },
        components: {
            Select: {
                // 6. We can overwrite defaultProps
                defaultProps: {
                    focusBorderColor: "primary.500",
                },
            },
            Input: {
                // 6. We can overwrite defaultProps
                defaultProps: {
                    focusBorderColor: "primary.500",
                },
            },
            NumberInput: {
                // 6. We can overwrite defaultProps
                defaultProps: {
                    focusBorderColor: "primary.500",
                },
            },
            Button: {
                variants: {
                    days: {
                        _hover: {
                            _disabled: {
                                bgColor: "gray.400",
                            },
                            bgColor: "blue.600",
                        },
                        backgroundColor: "gray.400",
                        _active: {
                            bgColor: "blue.500",
                            _disabled: { bgColor: "blue.500" },
                            _hover: { bgColor: "blue.600" },
                        },
                        _disabled: {
                            opacity: 0.8,
                            cursor: "not-allowed",
                        },

                        height: "22px",
                        width: "20px",
                        color: "white",
                    },
                },
            },
        },
    },

    withDefaultColorScheme({
        colorScheme: "primary",
    })
);

export default theme;
