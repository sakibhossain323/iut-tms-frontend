import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    daisyui: {
        themes: [
            "light",
            "dark",
            {
                mytheme: {
                    primary: "#1B4D3E",
                    secondary: "#317159",
                    accent: "#4A9F7E",
                    neutral: "#2C3E50",
                    "base-100": "#F5F2EA",
                    info: "#2094f3",
                    success: "#4A9F7E",
                    warning: "#ff9900",
                    error: "#ff5724",
                },
            },
        ],
    },
    plugins: [require("daisyui")],
};
export default config;
