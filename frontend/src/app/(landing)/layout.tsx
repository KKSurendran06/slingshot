export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="dark bg-[#0f1115] min-h-screen">
      {children}
    </div>
  );
}
