// Separate root layout for the embedded Sanity Studio so it does not inherit the
// website's global CSS, scripts (analytics, theme, fonts) or page chrome.
export default function StudioLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body style={{margin: 0}}>{children}</body>
    </html>
  )
}
