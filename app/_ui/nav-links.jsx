'use client';

import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import {
  LayoutDashboard,
  Handshake,
  ArrowRightFromLine,
  ArrowLeftFromLine,
  GalleryVerticalEnd,
} from 'lucide-react';

// Map of links to display in the side navigation.
const links = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Create Handshake', href: '/create', icon: Handshake },
  { name: 'Initiated Handshakes', href: '/initiated-handshakes', icon: ArrowRightFromLine },
  { name: 'Received Handshakes', href: '/received-handshakes', icon: ArrowLeftFromLine },
  { name: 'History', href: '/history', icon: GalleryVerticalEnd },
];

export default function NavLinks({ clickHandler }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleNav = (href: string) => {
    if (pathname === href) {
      // Same page — force reload
      router.refresh();
    } else {
      router.push(href);
    }

    if (clickHandler) clickHandler(); // Close hamburger menu
  };

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <button
            key={link.name}
            onClick={() => handleNav(link.href)}
            className={clsx(
              'flex h-[48px] w-full grow items-center justify-center gap-2 text-sm font-medium hover:bg-blue-100 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-primary-light': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="block pl-1 md:pl-5">{link.name}</p>
          </button>
        );
      })}
    </>
  );
}
