export function generateMetadata({ params }) {
    const raw = decodeURIComponent(params.customFestival);
    const name = raw.includes('&') ? raw.split('&')[0] : raw;
    return { title: `${name} Countdown` };
}

export default function CustomFestivalLayout({ children }) {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen">
            {children}
        </section>
    );
}
