import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/global/theme-provider"
import QueryProvider from "@/components/global/query-provider";
import { Toaster } from "@/components/ui/toaster"
import localFont from 'next/font/local'
 
const myFont = localFont({
  src: './alliance-regular.otf',
})

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Aerothon',
  description: 'Aerothon',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${myFont.className} h-full`}>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </QueryProvider>
        <Toaster />
      </body>
    </html>
  )
}
