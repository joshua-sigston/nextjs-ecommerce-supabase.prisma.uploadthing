import Navigation from '@/components/navigation';

export default function StoreLayout({
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
