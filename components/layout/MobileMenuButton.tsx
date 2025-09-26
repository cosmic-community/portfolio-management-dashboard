interface MobileMenuButtonProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function MobileMenuButton({ sidebarOpen, setSidebarOpen }: MobileMenuButtonProps) {
  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>
      
      <div className="flex-1 px-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-900">Portfolio Dashboard</h1>
      </div>
    </div>
  )
}