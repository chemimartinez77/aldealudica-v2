import { getProviders, signIn } from "next-auth/react"
import { useState } from "react"
import type { GetServerSidePropsContext } from "next"

interface Props {
  providers: any
  callbackUrl: string
}

export default function SignInPage({ providers, callbackUrl }: Props) {
  // Para el provider de credenciales (si existe)
  const credentialsProvider = providers.credentials

  // Estado para email y password
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "3rem auto",
        backgroundColor: "#1c1c1c",
        padding: "2rem",
        borderRadius: "8px",
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "1rem" }}>Login</h1>

      {/* Botón de Google (si existe el provider google) */}
      {providers.google && (
        <div style={{ marginBottom: "1rem" }}>
          <button
            onClick={() => signIn("google", { callbackUrl })}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#fff",
              color: "#3c4043",
              border: "1px solid #dadce0",
              borderRadius: 4,
              fontSize: "14px",
              cursor: "pointer",
              padding: "0.5rem 1rem",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <img
              src="/google-icon.png"
              alt="Google"
              style={{ width: "20px", height: "20px" }}
            />
            <span>Continuar con Google</span>
          </button>
        </div>
      )}

      {/* Formulario de credenciales */}
      {credentialsProvider && (
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            // Llamar a signIn con "credentials" y pasar email/password
            await signIn("credentials", {
              email,
              password,
              callbackUrl,
            })
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <label style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ marginBottom: "0.25rem" }}>Email:</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #333",
                backgroundColor: "#2c2c2c",
                color: "#fff",
              }}
              required
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ marginBottom: "0.25rem" }}>Password:</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #333",
                backgroundColor: "#2c2c2c",
                color: "#fff",
              }}
              required
            />
          </label>
          <button
            type="submit"
            style={{
              backgroundColor: "#333",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              padding: "0.75rem",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Login
          </button>
        </form>
      )}
    </div>
  )
}

// Obtener la lista de proveedores y callbackUrl
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers = await getProviders()
  const callbackUrl = (context.query.callbackUrl as string) || "/"
  return {
    props: { providers, callbackUrl },
  }
}
