import Link from 'next/link';
import Image from 'next/image';
import NavLinks from './nav-links';

// import { PowerIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col bg-white px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-center p-4 md:h-40 bg-primary"
        href="/"
      >
        <Image
            src="/handshake.jpg"
            width={1250}
            height={625}
            alt="handshake"
            className="w-full rounded-md"
          />
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        {/* Remove the form and use Link directly */}
        <Link
          href="/"
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-primary-light text-primary-dark text-bold p-3 text-sm font-medium hover:bg-red-500 hover:text-gray-50 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          {/* <PowerIcon className="w-6" /> */}
          <div className="hidden md:block">Sign Out</div>
        </Link>
      </div>
    </div>
  );
}
