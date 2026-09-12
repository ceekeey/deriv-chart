import useAuthStore from '../store/authStore'

function Profile() {
    const user = useAuthStore((state) => state.user)

    return (
        <section className="space-y-6">
            <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-text-secondary">Profile</p>
                <h1 className="mt-2 text-3xl font-semibold text-text-primary">Account details</h1>
            </div>

            <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
                <p className="text-sm text-text-secondary">Username</p>
                <p className="mt-1 text-xl font-semibold text-text-primary">{user?.username || 'Unknown user'}</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-border bg-panel p-4">
                        <p className="text-sm text-text-secondary">Email</p>
                        <p className="mt-1 font-medium text-text-primary">{user?.email || 'Not available'}</p>
                    </div>
                    <div className="rounded-lg border border-border bg-panel p-4">
                        <p className="text-sm text-text-secondary">Status</p>
                        <p className="mt-1 font-medium text-success">Authenticated</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile
