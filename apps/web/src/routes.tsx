import { Navigate, Route, Routes } from 'react-router-dom'
import App from './App'
import { RequireAuth } from './lib/auth'
import { LoginPage } from './pages/LoginPage'
import { ClientPortalPage } from './pages/ClientPortalPage'
import { NewClientPage } from './features/new-client/NewClientPage'
import { StaffReviewPage } from './features/new-client/StaffReviewPage'

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
      <Route path="/portal" element={<Navigate to="/clientportal" replace />} />
      <Route path="/newclient" element={<NewClientPage />} />
      <Route path="/newclient/review" element={<StaffReviewPage />} />
      <Route path="/newclient/review/:intakeId" element={<StaffReviewPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
