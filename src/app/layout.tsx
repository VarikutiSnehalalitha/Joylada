import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';

export const metadata: Metadata = {
  title: 'Velumbra — The Modern Editorial Story Universe',
  description: 'A distinguished social storytelling and reading platform crafted for readers and authors who value high literary immersion.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#faf8f5] text-ink-900 dark:bg-ink-950 dark:text-ink-100 antialiased selection:bg-amber-500/20 selection:text-amber-500">
        <AppProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pb-16 md:pb-0">{children}</main>
            <Footer />
            <MobileNav />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
