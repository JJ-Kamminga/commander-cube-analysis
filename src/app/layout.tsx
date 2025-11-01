import { Providers } from "@/components/Providers/Providers";
import { Nav } from "@/components/Nav/Nav";
import { Footer } from "@/components/Footer/Footer";

export { metadata } from "./metadata";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main>
            <Nav />
            {children}
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
