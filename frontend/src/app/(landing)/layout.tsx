export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="dark bg-[#1c1c1e] min-h-screen">
      {children}
    </div>
  );
}
