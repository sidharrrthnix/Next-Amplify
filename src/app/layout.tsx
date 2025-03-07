
import Navbar from "../components/Navbar";
import Notifications from "../components/Notifications";
import { Providers } from "../components/Providers";
import "./globals.css";

export const metadata = {
  title: "Next-Amplify",
  description: "Deploy Next.js applications seamlessly with AWS Amplify.",
  icons: {
    icon: "/amplify-logo.png",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Notifications />
        </Providers>
      </body>
    </html>
  );
}
