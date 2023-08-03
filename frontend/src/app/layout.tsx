import Footer from "@components/Footer";
import Nav from "@components/Nav";
import "@styles/globals.css";

export const metadata = {
  title: "Children's Book",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="main">{/* <div className="gradient" /> */}</div>
        <main>
          <Nav />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
