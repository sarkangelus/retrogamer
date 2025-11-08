import '../styles/globals.css';

export const metadata = {
    title: 'Login.Now – Instant access to 100+ logins',
    description:
        'Login.Now is the ultra-fast hub for reaching the official login pages for Gmail, Facebook, Netflix, Amazon, and 100+ other popular services in a single tap.'
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.svg" sizes="any" />
            </head>
            <body className="antialiased ln-body">{children}</body>
        </html>
    );
}
