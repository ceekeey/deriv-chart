import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-app-bg px-4 text-text-primary">
            <section className="w-full max-w-md rounded-xl border border-border bg-panel p-8 text-center shadow-lg shadow-slate-950/20">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-text-secondary">404</p>
                <h1 className="mt-3 text-4xl font-bold text-text-primary">Page not found</h1>
                <p className="mt-2 text-sm text-text-secondary">This page does not exist in the current workspace.</p>
                <Link
                    className="mt-6 inline-flex rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
                    to="/dashboard"
                >
                    Back to dashboard
                </Link>
            </section>
        </main>
    )
}

export default NotFound
