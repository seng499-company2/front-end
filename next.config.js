module.exports = {
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
