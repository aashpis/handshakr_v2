'use client';

import { logoutUserRequest } from '@/_lib/auth';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { LogOut } from 'lucide-react';


export default function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();


  //TODO: do we need to manually delete cookies on logout?
  const handleLogout = async () => {
    await logoutUserRequest();
    const cookieStore = cookies();
    // delete cookies
    cookieStore.getAll().forEach((cookie) => {
      cookieStore.delete(cookie.name);
    });

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
    <div className="flex items-center justify-center gap-2">
      <LogOut className="w-4 h-4" />
      <div className="w-full text-center">
        {isPending ? 'Logging out...' : 'Log Out'}
      </div>
    </div>
  </button>
);
}