import { ToastContainer } from 'react-toastify';

import AppProvider from '@/components/providers/app-provider';
import DashBoardLayoutProvider from '@/components/providers/dashboard-layout-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import './globals.css';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body>
        <AppProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <DashBoardLayoutProvider>{children}</DashBoardLayoutProvider>
          </ThemeProvider>
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
