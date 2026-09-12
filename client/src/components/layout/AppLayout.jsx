import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

function AppLayout() {
  return (
    <div className="min-h-screen bg-app-bg text-text-primary">
      <Header />
      <div className="flex min-h-[calc(100vh-73px)] flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AppLayout
