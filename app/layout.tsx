import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Language School",
  description: "Курси іноземних мов: англійська, іспанська та інші. Групові та індивідуальні заняття.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <Header/>
        <main>{children}</main>

        <footer>
          <p>
            Created <time dateTime='2026'>2026</time>
          </p>
        </footer>

      </body>
    </html>
  );
}
