import type { Metadata } from "next";
import "./globals.css"

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";


export const metadata: Metadata = {
  title: {
    default: "Deeksha Classes — Best JEE Coaching for 11th & 12th in Laheria Sarai",
    template: "%s | Deeksha Classes",
  },
  description:
    "Deeksha Classes in Bangali Tola, Laheria Sarai offers expert JEE coaching for Class 11th & 12th students. Specialized in Physics, Chemistry, and Maths (PCM). Join now for IIT JEE Mains & Advanced preparation.",

  keywords: [
    "Deeksha Classes",
    "JEE coaching Laheria Sarai",
    "JEE coaching Bangali Tola",
    "IIT JEE coaching Darbhanga",
    "class 11 JEE tuition Laheria Sarai",
    "class 12 JEE tuition Laheria Sarai",
    "PCM coaching Laheria Sarai",
    "Physics tuition Laheria Sarai",
    "Chemistry tuition Laheria Sarai",
    "Maths tuition Laheria Sarai",
    "JEE Mains coaching Bihar",
    "JEE Advanced preparation Laheria Sarai",
    "best coaching institute Laheria Sarai",
    "11th 12th science tuition Darbhanga",
  ],

  icons: {
    icon: "/logo_icon.png",
    shortcut: "/logo_icon.png",
    apple: "/logo_icon.png",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Deeksha Classes",
    title: "Deeksha Classes — Best JEE Coaching for 11th & 12th in Laheria Sarai",
    description:
      "Join Deeksha Classes in Bangali Tola, Laheria Sarai for expert JEE Mains & Advanced coaching. Physics, Chemistry & Maths for Class 11th & 12th. Enroll today!",
    images: [
      {
        url: "/logo_icon.png",
        width: 800,
        height: 800,
        alt: "Deeksha Classes — JEE Coaching Laheria Sarai",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Deeksha Classes — Best JEE Coaching for 11th & 12th in Laheria Sarai",
    description:
      "Join Deeksha Classes in Bangali Tola, Laheria Sarai for expert JEE Mains & Advanced coaching. Physics, Chemistry & Maths for Class 11th & 12th. Enroll today!",
    images: ["/logo_icon.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode;}>) {
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
