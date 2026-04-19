import type { Metadata } from "next";
import "./globals.css"

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";



export const metadata: Metadata = {
  metadataBase: new URL("https://deeksha-classes.vercel.app"),

  title: {
    default: "Deeksha Classes — Best JEE Coaching in Laheria Sarai",
    template: "%s | Deeksha Classes",
  },

  description:
    "Join Deeksha Classes in Laheria Sarai for IIT JEE Mains & Advanced preparation. Expert coaching in Physics, Chemistry & Maths.",

  openGraph: {
    type: "website",
    url: "https://deeksha-classes.vercel.app",
    title: "Deeksha Classes — JEE Coaching Laheria Sarai",
    description:
      "Top JEE coaching institute for Class 11 & 12. PCM experts. Enroll now!",

    siteName: "Deeksha Classes",

    images: [
      {
        url: "/logo_icon.jpg", // IMPORTANT
        width: 1200,
        height: 630,
        alt: "Deeksha Classes JEE Coaching",
      },
    ],

    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "Deeksha Classes — JEE Coaching Laheria Sarai",
    description:
      "Best coaching for IIT JEE Mains & Advanced. Join today!",
    images: ["/logo_icon.jpg"], // SAME IMAGE
  },

  icons: {
    icon: [
      { url: "/logo_icon.jpg", type: "image/jpeg" },
    ],
    shortcut: ["/logo_icon.jpg"],
    apple: [
      { url: "/logo_icon.jpg", sizes: "180x180", type: "image/jpeg" },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        <Navbar />
        {children}

        <Footer />
      </body>
    </html>
  );
}
