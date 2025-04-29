import { Link, Outlet, useLocation } from "react-router-dom";
import "./rootLayout.css";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log(import.meta.env.VITE_CLERK_FRONTEND_API);
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient();

const RootLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Check if we're on the homepage to hide the menu icon
  const isHomepage = location.pathname === "/";
  
  // Determine header class based on current route
  const headerClass = isHomepage ? "homepage-header" : "dashboard-header";

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
        <div className="rootLayout">
          <header className={headerClass}>
            <Link to="/" className="logo">
              <img src="/logo.png" alt=""/>
              <span>NeuroX AI</span>
            </Link>
            <div className="user">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
            
            {/* Removed the menu toggle button from here */}
          </header>

          <main>
            {/* Pass the sidebar state and toggle function as context to child components */}
            <Outlet context={{ isSidebarOpen, toggleSidebar }} />
          </main>
        </div>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default RootLayout;