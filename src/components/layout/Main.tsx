import GlobalScrollReveal from '@/components/effects/GlobalScrollReveal';

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full">
      <GlobalScrollReveal />
      {children}
    </main>
  );
}
