import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commander Cube Analysis",
  description: "Get Commander Cube taylored analysis",
  // viewport: "initial-scale=1, width=device-width" todo: https://nextjs.org/docs/app/api-reference/functions/generate-viewport
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
