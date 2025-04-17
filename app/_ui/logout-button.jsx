'use client';

import { logoutUserRequest } from '@/_lib/auth';
import { useTransition, useState } from 'react';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  const [hasError, setHasError] = useState(false);

  const handleLogout = async () => {
    setHasError(false);

    const { success, error } = await logoutUserRequest();

    if (success) {
      sessionStorage.clear();

      document.cookie.split(';').forEach(c => {
        document.cookie = c.trim().split('=')[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
      });

      startTransition(() => {
        window.location.href = '/';
      });
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
        className="w-full flex items-center justify-center md:justify-start gap-2 p-2 text-white bg-primary hover:bg-warning transition-colors text-sm font-semibold disabled:opacity-50"
      >
        <LogOut className="w-4 h-4" />
        <span>{isPending ? 'Logging out...' : 'Log Out'}</span>
      </button>

      {hasError && (
        <p className="text-warning text-sm text-center mt-2">
          Logout failed. Please try again.
        </p>
      )}
    </div>
  );
}
