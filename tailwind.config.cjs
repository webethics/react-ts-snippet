/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{html,js,jsx,ts,tsx}",
        "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    ],
    theme: {
        screens: {
            /* Custom breakpoints with minimum width */
            esm: "480px",
            vsm: "575px",
            /* Custom breakpoints with maximum width */
            chota: { max: "640px" },
            mobile: { max: "767px" },
            tablet: { max: "1024px" },
            laptop: { max: "1280px" },
        },

        borderRadius: {
            none: "0",
            1: "1px",
            DEFAULT: "2px",
            3: "3px",
            4: "4px",
            8: "8px",
            sm: "0.125rem",
            md: "0.375rem",
            lg: "0.5rem",
            full: "9999px",
            large: "12px",
        },
        extend: {
            spacing: {
                five: "0.313rem",
                15: "0.938rem",
            },
            /* Theme Colors */
            colors: {
                white: "rgb(var(--color-white) / 1)",
                black: "rgb(var(--color-black) / 1)",
                primary: "rgb(var(--color-primary) / 1)",
                hover: "rgb(var(--color-hover) / 1)",
                fieldBg: "rgb(var(--color-fieldBg) / 1)",
                fieldOutline: "rgb(var(--color-fieldOutline) / 1)",
                disabled: "rgb(var(--color-disabled) / 1)",
                secondary: "rgb(var(--color-secondary) / 1)",
                active: "rgb(var(--color-active) / 1)",
                error: "rgb(var(--color-error) / 1)",
                placeholder: "rgb(var(--color-placeholder) / 1)",
                fieldNoFocus: "rgb(var(--color-fieldNoFocus) / 1)",
                status: "rgb(var(--color-status) / 1)",
                gray: "rgb(var(--color-gray) / 1)",
            },
            /* Default breakpoints with minimum width */
            screens: {
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1290px",
                "2xl": "1366px",
            },
            /* Theme Font Sizes */
            fontSize: {
                10: [
                    "0.625rem",
                    "0.938rem",
                ] /* Font Size: 12px, Line Height:15px */,
                base: [
                    "0.75rem",
                    "0.938rem",
                ] /* Font Size: 12px, Line Height:15px */,
                13: [
                    "0.813rem",
                    "1.375rem",
                ] /* Font Size: 14px, Line Height:20px */,
                14: [
                    "0.875rem",
                    "1.25rem",
                ] /* Font Size: 14px, Line Height:20px */,
                15: [
                    "0.938rem",
                    "1.125rem",
                ] /* Font Size: 14px, Line Height:20px */,
                16: [
                    "1rem",
                    "1.188rem",
                ] /* Font Size: 16px, Line Height:19px */,
                18: [
                    "1.125rem",
                    "1.313rem",
                ] /* Font Size: 16px, Line Height:19px */,
                24: [
                    "1.5rem",
                    "1.813rem",
                ] /* Font Size: 16px, Line Height:19px */,
                28: [
                    "1.75rem",
                    "2.125rem",
                ] /* Font Size: 16px, Line Height:34px */,
                32: [
                    "2rem",
                    "2.375rem",
                ] /* Font Size: 32px, Line Height:38px */,
            },
            lineHeight: {
                14: "0.875rem",
                15: "0.938rem",
                16: "1rem",
                17: "1.063rem",
                19: "1.188rem",
                20: "1.25rem",
                21: "1.313rem",
                33: "2.063rem",
            },
            maxWidth: {
                "small-container": "400px",
                "medium-container": "900px",
                "max-container": "96%",
            },
            minWidth: {
                "tooltip-container": "300px",
            },
            height: {
                51: "51px",
            },
            boxShadow: {
                tooltip: "0px 4px 8px rgb(var(--color-black)/0.25)",
                tab: "0px 3px 8px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.04)",
                toggleSwitch:
                    "0px 0.1px 0.3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.2)",
            },
            letterSpacing: {
                subHeading: "-0.3px",
            },
            padding: {
                18: "72px",
            },

            backgroundImage: {
                "custom-dashed-border":
                    "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23DFE9EE' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e\")",
            },
        },
    },
    plugins: [],
};
