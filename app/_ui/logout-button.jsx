'use client';

import { logoutUser } from '@/_lib/auth/logoutUser';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';


export default function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = async () => {
    await logoutUser();
    startTransition(() => {
      router.push('/');
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="w-full h-auto items-center bg-primary text-white font-bold text-sm hover:bg-warning hover:text-white md:justify-start md:p-2 md:px-3 disabled:opacity-50"
    >
      <div className="w-full text-center">
        {isPending ? 'Logging out...' : 'Log Out'}
      </div>
    </button>
  );
}