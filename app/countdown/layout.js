import { ColorProvider } from './context/ColorContext';

export const metadata = {
  title: 'Minimalist Countdown Timer'
};

export default function CountdownLayout({ children }) {
  return (
    <ColorProvider>
      <section className="flex flex-col items-center justify-center min-h-screen">
        {children}
      </section>
    </ColorProvider>
  );
}
