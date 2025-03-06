
import Navbar from "../components/Navbar";
import Notifications from "../components/Notifications";
import { Providers } from "../components/Providers";
import "./globals.css";

export const metadata = {
  title: "AI Aided Consultancy Platform",
  description:
    "Leverage AI-driven insights and consultancy to transform your business. Our platform provides tailored AI solutions and expert analyses to drive growth.",
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
