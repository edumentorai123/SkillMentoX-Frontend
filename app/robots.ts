export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
            },
        ],
        sitemap: "https://skill-mento-x-frontend.vercel.app/sitemap.xml",
    };
}
