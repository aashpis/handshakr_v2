'use client';

import Link from 'next/link';
import Image from 'next/image';
import NavLinks from './nav-links';
import LogoutButton from '@/_lib/auth/logout-button';
import { useRouter } from 'next/navigation';


export default function SideNav() {
  const router = useRouter();


  return (
    <div className="flex h-full flex-col bg-white">
      <Link
        className="mb-2 flex h-20 items-center p-4 md:h-40"
        href="/"
      >
        <Image
          src="/hs_icon.png"
          width={1250}
          height={625}
          alt="handshake"
          className="object-scale-down"
        />
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow md:block"></div>
        <LogoutButton />
      </div>
    </div>
  );
}
