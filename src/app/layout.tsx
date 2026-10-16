import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PKM Math League · MCL & MRL FMIPA UNHAS',
  description: 'Sistem Klasemen & Turnamen Resmi Cerdas Cermat Matematika PKM FMIPA Universitas Hasanuddin 2026.',
  icons: {
    icon: '/assets/favicon.png',
    apple: '/assets/favicon.png'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" type="image/png" href="/assets/favicon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
