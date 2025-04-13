import "./globals.css";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body data-theme="light">
        {children}
      </body>
    </html>
  );
}
