
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/auth-provider';

export const metadata: Metadata = {
  title: 'Big Costa Construction (Private) Limited - Quality & Professionalism',
  description: 'Big Costa Construction is a top construction company in Sri Lanka, specializing in house construction, commercial buildings, and renovations. Contact the best builders in Sri Lanka for your project.',
  keywords: 'construction companies in Sri Lanka, best construction company in Sri Lanka, house construction Sri Lanka, construction services Sri Lanka, building contractors Sri Lanka, top builders in Sri Lanka, construction firms in Colombo, Sri Lanka construction company, civil construction companies Sri Lanka, big construction companies in Sri Lanka, building companies in Colombo, house builders in Sri Lanka, home construction in Sri Lanka, house building services Sri Lanka, modern house designs Sri Lanka, small house builders Sri Lanka, house renovation Sri Lanka, home improvement services Sri Lanka, low-cost house construction Sri Lanka, eco-friendly homes Sri Lanka, commercial construction Sri Lanka, industrial building contractors Sri Lanka, warehouse construction Sri Lanka, factory construction Sri Lanka, office building contractors Sri Lanka, retail space construction Sri Lanka, architectural design Sri Lanka, house plans Sri Lanka, home design ideas Sri Lanka, 2 story house designs Sri Lanka, construction planning services Sri Lanka, 3D house design Sri Lanka, construction materials Sri Lanka, ready mix concrete suppliers Sri Lanka, roofing contractors Sri Lanka, flooring contractors Sri Lanka, waterproofing services Sri Lanka, plumbing contractors Sri Lanka, electrical installation Sri Lanka, masonry work Sri Lanka, construction companies in Colombo, builders in Gampaha, contractors in Kandy, house construction in Negombo, building companies in Galle, house plans in Kurunegala, top construction companies in Matara, Jaffna construction services, construction in Nuwara Eliya, how much does house construction cost in Sri Lanka, house building steps in Sri Lanka, average construction cost per square foot Sri Lanka, how to build a house in Sri Lanka, best house designs for Sri Lanka weather, government construction regulations Sri Lanka, Big Costa Construction',
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
