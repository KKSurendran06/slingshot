export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="dark bg-[#0a0a0b] min-h-screen">
      {children}
    </div>
  );
}
