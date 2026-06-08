'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const A = 'Anton, sans-serif'

function AuthContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect') || '/profile'

  const handleLogin = () => {
    // Simulate login by setting a token
    localStorage.setItem('token', 'dummy-jwt-token')
    router.push(redirectUrl)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#101415', color: '#e0e3e5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '48px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', maxWidth: '400px', width: '100%' }}>
        <h1 style={{ fontFamily: A, fontSize: '32px', color: '#fff', marginBottom: '24px' }}>AUTHENTICATION</h1>
        <p style={{ color: '#c6c6cc', marginBottom: '32px' }}>Log in to discover your Football DNA.</p>
        <button
          onClick={handleLogin}
          style={{ width: '100%', backgroundColor: '#e6c364', color: '#000', padding: '16px', fontSize: '16px', fontFamily: A, letterSpacing: '2px', border: 'none', cursor: 'pointer' }}
        >
          SIMULATE LOGIN
        </button>
      </div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: '#101415' }}></div>}>
      <AuthContent />
    </Suspense>
  )
}
