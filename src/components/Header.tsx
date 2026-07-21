"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { mainNavLinks, segmentNavLinks } from "@/lib/nav-links";

export function Header() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-navy text-white shadow-md">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="font-bold tracking-wide" onClick={() => setOpen(false)}>
          <span className="text-xl uppercase">Texas</span>{" "}
          <span className="text-xl uppercase text-teal">Uniformes</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <Link
            href="/"
            className={`text-sm font-medium uppercase tracking-wide transition-colors hover:text-teal ${
              pathname === "/" ? "text-teal" : ""
            }`}
          >
            Home
          </Link>

          <div
            className="group relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium uppercase tracking-wide transition-colors hover:text-teal">
              Produtos
              <ChevronDown size={16} />
            </button>
            {productsOpen && (
              <div className="absolute left-0 top-full w-64 rounded-lg bg-white py-2 text-text-dark shadow-xl">
                {segmentNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-sm hover:bg-light-bg hover:text-teal"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {mainNavLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium uppercase tracking-wide transition-colors hover:text-teal ${
                pathname === link.href ? "text-teal" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contato"
          className="hidden rounded-full bg-teal px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90 lg:inline-block"
        >
          Solicitar orçamento
        </Link>

        <button
          className="lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-white/10 bg-navy lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-3 text-sm font-medium uppercase tracking-wide hover:bg-white/5 hover:text-teal"
              >
                {link.label}
              </Link>
            ))}
            <p className="mt-2 px-2 text-xs uppercase tracking-widest text-white/50">
              Produtos
            </p>
            {segmentNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-3 text-sm font-medium hover:bg-white/5 hover:text-teal"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contato"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-teal px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide"
            >
              Solicitar orçamento
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
