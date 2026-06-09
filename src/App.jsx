import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './components/LandingPage.jsx'
import MobileLandingPage from './components/MobileLandingPage.jsx'
import Login from './components/Login.jsx'
import Dashboard from './components/Dashboard.jsx'
import GenerateDM from './components/GenerateDM.jsx'
import History from './components/History.jsx'
import BulkMode from './components/BulkMode.jsx'
import ChromeExtension from './components/ChromeExtension.jsx'
import Settings from './components/Settings.jsx'
import HelpCenter from './components/HelpCenter.jsx'
import UpgradeToPro from './components/UpgradeToPro.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/" 
        element={isMobile ? <MobileLandingPage /> : <LandingPage />} 
      />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/generator" 
        element={
          <ProtectedRoute>
            <GenerateDM />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/history" 
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/bulk" 
        element={
          <ProtectedRoute>
            <BulkMode />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/extension" 
        element={
          <ProtectedRoute>
            <ChromeExtension />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/help" 
        element={
          <ProtectedRoute>
            <HelpCenter />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/upgrade" 
        element={
          <ProtectedRoute>
            <UpgradeToPro />
          </ProtectedRoute>
        } 
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
