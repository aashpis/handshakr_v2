'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {LayoutDashboard, Handshake, ArrowRightFromLine, ArrowLeftFromLine, History} from 'lucide-react';

// Map of links to display in the side navigation.
const links = [
  { name: 'Home', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Create Handshake', href: '/create', icon: Handshake },
  { name: 'Initiated Handshakes', href: '/initiated-handshakes', icon: ArrowRightFromLine },
  { name: 'Received Handshakes', href: '/received-handshakes', icon: ArrowLeftFromLine },
  { name: 'History', href: '/history', icon: History },
];
export default function NavLinks({clickHandler}) {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            onClick={clickHandler}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 text-sm font-medium hover:bg-blue-100 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-primary-light ': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden pl-5 md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
