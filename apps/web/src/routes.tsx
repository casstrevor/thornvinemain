import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import App from './App'
import { AppShell } from './layout'
import { RequireAuth, RequireRole } from './lib/auth'
import { DESIGN_SYSTEM_ROLES } from './lib/roles'
import { LoginPage } from './pages/LoginPage'
import { AccountPage } from './pages/AccountPage'
import { ClientPortalPage } from './pages/ClientPortalPage'
import { NewClientPage } from './features/new-client/NewClientPage'
import { StaffReviewPage } from './features/new-client/StaffReviewPage'

const DesignSystemPage = lazy(() =>
  import('./pages/design-system/DesignSystemPage').then((m) => ({ default: m.DesignSystemPage })),
)

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/account"
          element={
            <RequireAuth>
              <AccountPage />
            </RequireAuth>
          }
        />
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
        <Route path="/newclient" element={<NewClientPage />} />
        <Route path="/newclient/review" element={<StaffReviewPage />} />
        <Route path="/newclient/review/:intakeId" element={<StaffReviewPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
