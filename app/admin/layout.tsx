import Navigation from './_components/navigation';

// export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
