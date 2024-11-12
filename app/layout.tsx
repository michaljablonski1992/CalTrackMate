import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import ConvexClientProvider from '@/providers/ConvexClientProvider';
import { ThemeProvider } from '@/components/ui/theme/ThemeProvider';
import SidebarWrapper from '@/components/shared/sidebar/SidebarWrapper';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'CalTrackMate',
  description: 'Nutrition calculator app using Fatsecret API',
  generator: "Next.js",
  manifest: "/manifest.json",
  authors: [{ name: "5lab" }],
  icons: [
    { rel: "apple-touch-icon", url: "icon-192x192.png" },
    { rel: "icon", url: "icon-192x192.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarWrapper>{children}</SidebarWrapper>
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
