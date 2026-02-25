import type {Metadata} from 'next';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';
import { Chatbot } from '@/components/brand/chatbot';

export const metadata: Metadata = {
  title: 'Network Bulls - Professional Resume & Cover Letter Builder',
  description: 'Build professional, ATS-optimized resumes and cover letters with Network Bulls.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22><path d=%22M12 2C12 2 12 7 9 10C7.5 11.5 6 13.5 6 16C6 19.31 8.69 22 12 22C15.31 22 18 19.31 18 16C18 12 15 10 15 10C15 10 14 9 14 7C14 5 12 2 12 2Z%22 fill=%22%23EF593E%22/></svg>',
  },
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Montserrat:wght@400;600;700;800&family=Poppins:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&family=Lato:wght@300;400;700&family=Open+Sans:wght@300;400;600;700&family=Raleway:wght@300;400;500;600;700&family=Merriweather:wght@300;400;700&family=EB+Garamond:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;0,700;1,400&family=Playfair+Display:wght@700;900&family=PT+Serif:ital,wght@0,400;0,700;1,400&family=Source+Code+Pro:wght@400;600&family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased min-h-screen bg-white text-slate-900">
        <FirebaseClientProvider>
          {children}
          <Toaster />
          <Chatbot />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}