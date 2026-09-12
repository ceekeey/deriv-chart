import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

function Register() {
    const navigate = useNavigate()
    const register = useAuthStore((state) => state.register)
    const error = useAuthStore((state) => state.error)
    const isLoading = useAuthStore((state) => state.isLoading)
    const clearError = useAuthStore((state) => state.clearError)
    const [formData, setFormData] = useState({ username: '', email: '', password: '' })
    const [fieldErrors, setFieldErrors] = useState({})

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((current) => ({ ...current, [name]: value }))
        setFieldErrors((current) => ({ ...current, [name]: '' }))
        if (error) clearError()
    }

    const validateForm = () => {
        const nextErrors = {}

        if (!formData.username.trim()) {
            nextErrors.username = 'Username is required.'
        } else if (formData.username.trim().length < 3) {
            nextErrors.username = 'Username must be at least 3 characters.'
        }

        if (!formData.email.trim()) {
            nextErrors.email = 'Email is required.'
        }

        if (!formData.password) {
            nextErrors.password = 'Password is required.'
        } else if (formData.password.length < 6) {
            nextErrors.password = 'Password must be at least 6 characters.'
        }

        setFieldErrors(nextErrors)
        return Object.keys(nextErrors).length === 0
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!validateForm()) {
            return
        }

        try {
            await register({
                username: formData.username.trim(),
                email: formData.email.trim(),
                password: formData.password,
            })
            navigate('/dashboard', { replace: true })
        } catch {
            // The store handles and surfaces the error message.
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-app-bg px-4 py-10 text-text-primary">
            <section className="w-full max-w-md rounded-xl border border-border bg-panel p-6 shadow-lg shadow-slate-950/20 sm:p-8">
                <div className="mb-7 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-lg font-bold text-white">
                        C
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">Chart</p>
                    <h1 className="mt-3 text-3xl font-semibold text-text-primary">Create your account</h1>
                    <p className="mt-2 text-sm text-text-secondary">Start building your trading workspace.</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-text-primary" htmlFor="register-username">
                            Username
                        </label>
                        <input
                            id="register-username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60"
                            placeholder="TradingAlpha"
                            disabled={isLoading}
                        />
                        {fieldErrors.username && <p className="text-sm text-danger">{fieldErrors.username}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-text-primary" htmlFor="register-email">
                            Email
                        </label>
                        <input
                            id="register-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60"
                            placeholder="name@example.com"
                            disabled={isLoading}
                        />
                        {fieldErrors.email && <p className="text-sm text-danger">{fieldErrors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-text-primary" htmlFor="register-password">
                            Password
                        </label>
                        <input
                            id="register-password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60"
                            placeholder="Minimum 6 characters"
                            disabled={isLoading}
                        />
                        {fieldErrors.password && <p className="text-sm text-danger">{fieldErrors.password}</p>}
                    </div>

                    {error && (
                        <div className="rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-primary px-4 py-2.5 font-medium text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-primary/60"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-text-secondary">
                    Already have an account?{' '}
                    <Link className="font-medium text-primary hover:text-primary-hover" to="/login">
                        Login
                    </Link>
                </p>
            </section>
        </main>
    )
}

export default Register
