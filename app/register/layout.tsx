export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-screen">
        <main className="flex justify-center items-center">
          {children}
        </main>
      </div>
    </>
  );
}
