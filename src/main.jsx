import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './providers/AuthProvider'
import { router } from './routes/Router'
import { ToastContainer } from 'react-toastify'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <StrictMode>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer/>
      </StrictMode> 
    </AuthProvider>
  </QueryClientProvider>
  ,
)
