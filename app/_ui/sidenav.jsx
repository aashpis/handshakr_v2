'use client';

import Link from 'next/link';
import Image from 'next/image';
import NavLinks from './nav-links';
import LogoutButton from './logout-button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function SideNav() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Logo */}
      <div className="flex items-center justify-between p-4 md:h-40">
        <Link href="/dashboard">
          <Image
            src="/hs_icon.png"
            width={1250}
            height={625}
            alt="handshake desktop logo"
            className="hidden md:block object-scale-down h-10 md:h-20"
          />

          {/* Mobile / Top nav mode (below md) */}
          <Image
            src="/handshakr-banner.png"
            width={1600}
            height={512}
            alt="handshake mobile logo"
            className="block md:hidden object-scale-down h-10"
          />
        </Link>

        {/* Hamburger menu button (mobile only) */}
        <button
          className="md:hidden text-neutral-dark focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Navigation links (collapsible on mobile) */}
      <div
        className={`flex-col space-y-2 px-4 md:flex md:flex-grow md:space-y-2 md:px-0 ${menuOpen ? 'flex' : 'hidden'
          }`}
      >

        {/* passing method to close Hamburger menu on click */}
        <NavLinks clickHandler={() => setMenuOpen(false)} />
        <div className="hidden h-auto w-full grow md:block"></div>

        <LogoutButton />
      </div>
    </div>
  );
}