'use client';
// import {
//   UserGroupIcon,
//   HomeIcon,
//   DocumentDuplicateIcon,
// } from '@heroicons/react/24/outline';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.

// const links = [
//   { name: 'Home', href: '/dashboard', icon: <ICON> },
//   {
//     name: 'My Handshakes', href: '/handshakes',icon: <ICON>,
//   },
//   { name: 'History', href: '/history', icon: <ICON> },
// ];
const links = [
  { name: 'Home', href: '/dashboard'},
  { name: 'Create Handshake', href: '/create'},
  { name: 'Unconfirmed Handshakes', href: '/unconfirmed'},
  { name: 'Pending Handshakes', href: '/pending'},
  { name: 'History', href: '/history'}
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        // const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 text-sm font-medium hover:bg-blue-100 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-blue-500 text-white': pathname === link.href,
              },
            )}
          >
            {/* <LinkIcon className="w-6" /> */}
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
