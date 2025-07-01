import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { ToastContainer } from 'react-toastify'
import router from './route/Routes.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
import AOS from 'aos';
import 'aos/dist/aos.css';


AOS.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <ToastContainer />
  </StrictMode>,
)