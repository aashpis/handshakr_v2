'use client';

import { logoutUserRequest } from '@/_lib/auth';
import { useTransition, useState } from 'react';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  const [hasError, setHasError] = useState(false);

// In your LogoutButton component
const handleLogout = async () => {
  setHasError(false);
  
  const { success, error } = await logoutUserRequest();
  
  if (success) {
    // Clear sessionStorage
    sessionStorage.clear();
    // Clear cookies with past exp date
    document.cookie.split(';').forEach(c => {
      document.cookie = c.trim().split('=')[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
    });
    
    window.location.href = '/';
  } else {
    setHasError(true);
    console.error('Logout failed:', error);
  }
};

  return (
    <div className="w-full">
      <button
        onClick={handleLogout}
        disabled={isPending}
        className="w-full h-auto items-center bg-primary text-white font-bold text-sm hover:bg-warning hover:text-white md:justify-start md:p-2 md:px-3 disabled:opacity-50"
      >
        <div className="flex items-center justify-center gap-2">
          <LogOut className="w-4 h-4" />
          <div className="w-full text-center">
            {isPending ? 'Logging out...' : 'Log Out'}
          </div>
        </div>
      </button>

      {hasError && (
        <p className="text-warning text-sm text-center mt-2">
          Logout failed. Please try again.
        </p>
      )}
    </div>
  );
}
