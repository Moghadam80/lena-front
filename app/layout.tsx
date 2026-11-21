import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "لنا سنتر — طراحی مستقل",
  description: "طراحی متمایز و ملزومات روزمره.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}
        <Toaster
          position="bottom-left"
          toastOptions={{
            duration: 2500,
            style: {
              background: "#111",
              color: "#fff",
              borderRadius: "6px",
              fontSize: "13px",
              padding: "14px 18px",
            },
            success: {
              iconTheme: {
                primary: "#16a34a",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}