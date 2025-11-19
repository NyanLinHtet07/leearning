// frontend/app/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from '../components/ui/sonner';
import { AuthProvider } from '@/context/AuthContext';
import { RouteGuard } from './(middleware)/route-guard';
import ReactQueryProvider from '@/providers/ReactQueryProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TheCrystalLearningHub',
  description: 'Lorem ipsum dolor sit amet',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReactQueryProvider>
          <AuthProvider>
            <RouteGuard>
              {children}
              <Toaster richColors closeButton position="top-center" />
            </RouteGuard>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
