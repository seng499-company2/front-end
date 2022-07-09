module.exports = {
    output: "standalone",
    async redirects() {
        return [
            {
                source: "/",
                destination: "/professors",
                basePath: false,
                permanent: false,
            },
        ];
    },
};
