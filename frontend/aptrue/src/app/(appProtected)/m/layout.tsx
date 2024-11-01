import AppNav from '@/components/common/navbar/AppNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppNav />
      {children}
    </div>
  );
}
