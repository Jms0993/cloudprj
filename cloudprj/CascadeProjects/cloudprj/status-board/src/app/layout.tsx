import "../styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Team Status Board",
  description: "팀원 현황 대시보드",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        {children}
      </body>
    </html>
  );
}
