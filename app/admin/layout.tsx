import Nav from './_components/Nav';

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
        <Nav />
        {children}
      </body>
    </html>
  );
}
