import Link from "next/link";
import { useSession } from "next-auth/react";

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Aldea Lúdica</h1>
      {!session && (
        <Link
          href="/auth/signin"
          style={{
            display: "inline-block",
            background: "#fff",
            color: "#000",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "0.5rem 1rem",
            textDecoration: "none",
          }}
        >
          Ir a la página de login
        </Link>
      )}
    </div>
  );
}
