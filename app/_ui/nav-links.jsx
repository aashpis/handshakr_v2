'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import {LayoutDashboard, Handshake, ArrowRightFromLine, ArrowLeftFromLine, GalleryVerticalEnd} from 'lucide-react';

// Map of links to display in the side navigation.
const paths = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Create Handshake', href: '/create', icon: Handshake },
  { name: 'Initiated Handshakes', href: '/initiated-handshakes', icon: ArrowRightFromLine },
  { name: 'Received Handshakes', href: '/received-handshakes', icon: ArrowLeftFromLine },
  { name: 'History', href: '/history', icon: GalleryVerticalEnd },
];
export default function NavLinks({clickHandler}) {

  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(true); // default true 

  useEffect(() => {
    const jwtCookie = document.cookie.includes('jwtCookie');
    const xsrfToken = document.cookie.includes('XSRF-TOKEN');
    const authed = jwtCookie && xsrfToken;

    setIsAuthenticated(authed);

    const authPath = paths.some((path) => pathname?.startsWith(path));

    if (!authed && authPath) {
      router.replace('/');
    }
  }, [pathname, router]);

  if (!isAuthenticated) return null;

  return (
    <>
      {paths.map((path) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={path.name}
            href={path.href}
            // for closing hamburger nav menu 
            onClick={clickHandler} 
            //highlights link when user is on the page
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 text-sm font-medium hover:bg-blue-100 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-primary-light ': pathname === path.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="block pl-1 md:pl-5">{path.name}</p>
          </Link>
        );
      })}
    </>
  );
}
