import React from "react";
import "../../app/globals.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="max-w-screen-2xl mx-auto">{children}</main>;
      </body>
    </html>
  );
}
