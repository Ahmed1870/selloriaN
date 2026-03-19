export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{ backgroundColor: '#000', color: '#39FF14', margin: 0, minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  );
}
