'use client'
import { useEffect, createContext, useContext, useState, Dispatch, SetStateAction, Context, ServerContext, ServerContextJSONValue } from "react";
import { useRouter } from 'next/navigation'
interface ContextInterface {
  isFullScreen: boolean;
  setIsFullScreen: Dispatch<SetStateAction<boolean>>;
  isPublish: boolean;
  setIsPublish: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>
  share: string;
  setShare: Dispatch<SetStateAction<string>>
}
let AppContext = createContext<ContextInterface>(null!)

export function TopbarWrapper({ children }: {
  children: React.ReactNode
}) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPublish, setIsPublish] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [share, setShare] = useState('');
  const contextValue = { isFullScreen, setIsFullScreen, isPublish, setIsPublish, isEdit, setIsEdit, share, setShare }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}
export function useTopbarContext() {
  if (!AppContext) {
    throw new Error(
      "TopbarContext has to be used within <TopbarContext.Provider>"
    );
  }
  return useContext(AppContext);
}