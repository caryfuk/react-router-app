import type { ReactElement, ReactNode } from 'react'
import { useEffect } from 'react'
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'
import { Workbox } from 'workbox-window'

import type { Route } from './+types/root'
import './app.css'

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
]

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps): ReactElement {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App(): ReactElement {
  useEffect(() => {
    // Register service worker and handle updates (only in production)
    if ('serviceWorker' in navigator && !import.meta.env.DEV) {
      const wb = new Workbox('/sw.js')

      wb.addEventListener('controlling', () => {
        // Service worker is controlling the page
        console.log('Service worker is controlling the page')
      })

      wb.addEventListener('waiting', () => {
        // A new service worker is waiting to activate
        console.log('A new service worker is waiting to activate')

        // Optionally show update notification to user
        if (
          confirm(
            'A new version of the app is available. Would you like to update now?',
          )
        ) {
          wb.addEventListener('controlling', () => {
            window.location.reload()
          })
          wb.messageSkipWaiting()
        }
      })

      wb.register().catch((error) => {
        console.error('Service worker registration failed:', error)
      })
    }
  }, [])

  return <Outlet />
}

export function ErrorBoundary({
  error,
}: Route.ErrorBoundaryProps): ReactElement {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
