import { signIn } from "next-auth/react"

export default function LoginPage() {
  return (
    <div>
      <h1>Inicia sesión</h1>
      <button onClick={() => signIn("google", { callbackUrl: "/", prompt: "login" })}>
        Iniciar sesión con Google
      </button>
    </div>
  )
}
