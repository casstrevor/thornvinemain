import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import App from './App'
import { RequireAuth, RequireRole } from './lib/auth'
import { DESIGN_SYSTEM_ROLES } from './lib/roles'
import { LoginPage } from './pages/LoginPage'
import { ClientPortalPage } from './pages/ClientPortalPage'

const DesignSystemPage = lazy(() =>
  import('./pages/design-system/DesignSystemPage').then((m) => ({ default: m.DesignSystemPage })),
)

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/clientportal"
        element={
          <RequireAuth>
            <ClientPortalPage />
          </RequireAuth>
        }
      />
      <Route
        path="/design-system/:entryId?"
        element={
          <RequireAuth>
            <RequireRole roles={DESIGN_SYSTEM_ROLES}>
              <Suspense fallback={null}>
                <DesignSystemPage />
              </Suspense>
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route path="/portal" element={<Navigate to="/clientportal" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
