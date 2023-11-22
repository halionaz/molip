import "./reset.css";
import "./globals.css";

export const metadata = {
    title: "mol.ip",
    description: "The most effective way to save ideas",
};

export default function RootLayout({ children }) {
    return (
        <html>
            <body>{children}</body>
        </html>
    );
}
