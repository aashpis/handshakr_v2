'use client'

import Link from 'next/link';
import Image from 'next/image';
import NavLinks from './nav-links';
import { logoutUser } from '@/_lib/auth';
import { useRouter } from 'next/navigation';

// import { PowerIcon } from '@heroicons/react/24/outline';


export default function SideNav() {

  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.push('/');
  };


  return (
    <div className="flex h-full flex-col bg-white">
      <Link
        className="mb-2 flex h-20 items-center p-4 md:h-40"
        href="/"
      >
        <Image
          src="/hs_icon.png"
          // src="/handshakr-namebanner.png"
          width={1250}
          height={625}
          alt="handshake"
          className='object-scale-down'
        />
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow md:block"></div>

        <button
          onClick={handleLogout}
          className="w-full h-auto items-center bg-primary text-white font-bold text-sm hover:bg-warning hover:text-white md:justify-start md:p-2 md:px-3"
        >
          <div className="w-full text-center">Log Out</div>
        </button>
      </div>
    </div>
  );
}
