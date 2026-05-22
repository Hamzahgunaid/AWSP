import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aden Water Sector Plan — AWSP",
  description:
    "The AWSP Programme Website for the Aden Water Sector Plan, Ministry of Water and Environment / LWSCA – Aden, Yemen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
