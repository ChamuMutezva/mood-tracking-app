module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            backgroundImage: {
                "linear-gradient":
                    "linear-gradient(180deg, #f5f5ff 72.99%, #e0e0ff 100%)",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
