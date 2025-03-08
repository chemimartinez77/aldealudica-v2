import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider, useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  // Cerrar menú si se hace clic fuera de él
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Estilos básicos
  const navStyle: React.CSSProperties = {
    position: "fixed",
    top: "60px",
    left: "10px",
    width: "200px",
    background: "#333",
    padding: "1rem",
    boxShadow: "2px 2px 5px rgba(0,0,0,0.3)",
    zIndex: 9999,
  };

  const liStyle: React.CSSProperties = {
    margin: "0.5rem 0",
    background: "transparent",
    padding: "0.25rem",
    color: "#fff",
    cursor: "pointer",
  };

  // Función para cerrar menú al hacer clic en un Link
  const handleMenuItemClick = () => {
    setOpen(false);
  };

  return (
    <>
      <header
        style={{
          background: "#222",
          color: "#fff",
          padding: "1rem",
          position: "relative",
        }}
      >
        {/* Botón Menú: si está cerrado, lo abre; si está abierto, lo cierra */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: "#555",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          Menú
        </button>

        {open && (
          <nav style={navStyle} ref={menuRef}>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <MenuItem
                href="/"
                label="Inicio"
                liStyle={liStyle}
                onClick={handleMenuItemClick}
              />
              <MenuItem
                href="/calendario"
                label="Organizar Partidas"
                liStyle={liStyle}
                onClick={handleMenuItemClick}
              />
              <MenuItem
                href="/noticias"
                label="Noticias"
                liStyle={liStyle}
                onClick={handleMenuItemClick}
              />
              <MenuItem
                href="/foro"
                label="Foro"
                liStyle={liStyle}
                onClick={handleMenuItemClick}
              />
              <MenuItem
                href="/compraventa"
                label="Compraventa"
                liStyle={liStyle}
                onClick={handleMenuItemClick}
              />

              {session && (
                <li
                  style={liStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#444")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <button
                    onClick={() => {
                      setOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </nav>
        )}
      </header>

      <main style={{ padding: "1rem" }}>{children}</main>
    </>
  );
}

// Componente auxiliar para cada item del menú
function MenuItem({
  href,
  label,
  liStyle,
  onClick,
}: {
  href: string;
  label: string;
  liStyle: React.CSSProperties;
  onClick: () => void;
}) {
  return (
    <li
      style={liStyle}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#444")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <Link
        href={href}
        style={{
          textDecoration: "none",
          color: "#fff",
          display: "block",
          width: "100%",
        }}
        onClick={onClick}
      >
        {label}
      </Link>
    </li>
  );
}
