'use client';

import { logoutUserRequest } from '@/_lib/auth';
import { useTransition, useState } from 'react';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  const [hasError, setHasError] = useState(false);

  const handleLogout = async () => {
    setHasError(false);

    try {
      await logoutUserRequest(); 
      sessionStorage.clear();
      startTransition(() => {
        window.location.href = '/'; // force middleware to run
      });

    } catch (err) {
      console.error('[logout-button] Logout error log:', err);
      setHasError(true);
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
