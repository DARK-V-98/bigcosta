import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/auth-provider';

export const metadata: Metadata = {
  title: 'BIGCOSTA CONSTRUCTION (PRIVATE) LIMITED - QUALITY & PROFESSIONALISM',
  description: 'BIGCOSTA CONSTRUCTION OFFERS TOP-TIER RESIDENTIAL, COMMERCIAL, AND RENOVATION SERVICES. CONTACT US FOR A QUOTE TODAY.',
  keywords: 'CONSTRUCTION, RESIDENTIAL, COMMERCIAL, RENOVATION, BUILDING, CONTRACTOR, GENERAL CONTRACTOR',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark !scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
