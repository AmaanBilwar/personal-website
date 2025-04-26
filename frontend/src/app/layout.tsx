import { metadata } from './metadata';
import ClientLayout from './client-layout';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'], weight: ['500']})

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
          <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
