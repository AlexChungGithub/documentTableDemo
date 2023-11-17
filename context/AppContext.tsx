'use client'
import { useEffect, createContext, useContext, useMemo } from "react";
import { useRouter } from 'next/navigation'

let AppContext = createContext({});

export function AppWrapper({ children }: {
  children: React.ReactNode
}) {
  const router = useRouter()
  useEffect(() => {
    if (sessionStorage.getItem('isLogin') !== 'true') {
      // router.push('/login')
    }
  }, [router])
  const contextValue = {}
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}