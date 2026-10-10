import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

interface SubPageShellProps {
  children: React.ReactNode;
  email?: string;
}

/** Light header/footer wrapper for pages and products created in Sanity. */
export default function SubPageShell({ children, email = "info@elxorperfumes.com" }: SubPageShellProps) {
  return (
    <>
      <header className="subpage-header">
        <Link href="/" className="subpage-header__logo" aria-label="ELXOR Perfumes home">
          <img src="/images/elxor-logo.png" alt="ELXOR Perfumes" width={46} height={48} />
        </Link>
        <nav className="subpage-header__nav" aria-label="Primary">
          <Link href="/">Home</Link>
          <Link href="/#collection">Collection</Link>
          <Link href="/#contact">Contact</Link>
          <ThemeToggle />
        </nav>
      </header>

      <main className="subpage">{children}</main>

      <footer className="subpage-footer">
        <p>
          &copy; {new Date().getFullYear()} <span className="brand">ELXOR Perfumes</span>. All rights reserved.
        </p>
        <a href={`mailto:${email}`}>{email}</a>
      </footer>
    </>
  );
}
