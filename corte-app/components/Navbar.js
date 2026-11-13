'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/core', label: 'Core' },
  { href: '/product', label: 'Product' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/marketing', label: 'Marketing' },
  { href: '/chat', label: 'Chat' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/docs', label: 'Docs' },
  { href: '/demo', label: 'Demo' },
];

// Navbar: sticky at the top, links to every page of the site
export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 px-6 py-4">
        <Link href="/" className="font-semibold text-lg">
          Corte App
        </Link>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-base">
          {LINKS.map(function (item) {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? 'font-semibold text-blue-600 underline underline-offset-4'
                    : 'font-medium hover:text-blue-600'
                }
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
