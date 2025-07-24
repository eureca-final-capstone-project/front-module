import { Outlet } from 'react-router-dom'
import Sidebar from '../pages/AdminPage/components/Sidebar'
import Container from '../components/Container/Container'

const AdminLayout = () => {
  return (
    <Container className="bg-background flex min-h-screen max-w-[1280px] gap-11 pr-11 xl:p-0">
      <Sidebar />
      <div className="flex-1 py-13">
        <Outlet />
      </div>
    </Container>
  )
}

export default AdminLayout
