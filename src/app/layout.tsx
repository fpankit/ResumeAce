import type {Metadata} from 'next';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Network Bulls - AI Resume & ATS Analyzer',
  description: 'Optimize your resume for applicant tracking systems with AI power by Network Bulls.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Lora:ital,wght@0,400;0,700;1,400&family=Playfair+Display:wght@700;900&family=Montserrat:wght@400;600;700;800&family=Poppins:wght@300;400;500;600;700&family=Merriweather:wght@300;400;700&family=EB+Garamond:ital,wght@0,400;0,700;1,400&family=Source+Code+Pro:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased min-h-screen bg-white text-slate-900">
        <FirebaseClientProvider>
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
