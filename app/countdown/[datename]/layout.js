export function generateMetadata({ params }) {
    const name = decodeURIComponent(params.datename);
    return { title: `${name} Countdown` };
}

export default function DatenameLayout({ children }) {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen">
            {children}
        </section>
    );
}
