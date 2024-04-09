import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import {dark} from '@clerk/themes'

const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY


function App() {

  return (
    <>
      <ClerkProvider publishableKey={key}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ClerkProvider>
    </>
  )
}

export default App
