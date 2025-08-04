import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import Toast from './components/Toast/Toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import PermissionInitialize from './components/Guard/PermissionInitialize.tsx'
import RootProvider from './components/RootProvider/RootProvider'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RootProvider>
        <PermissionInitialize />
        <RouterProvider router={router} />
        <Toast />
        <ReactQueryDevtools initialIsOpen={false} />
      </RootProvider>
    </QueryClientProvider>
  </StrictMode>
)
