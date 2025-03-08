import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
  providers: [
    // Proveedor Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Proveedor de credenciales (usuario/contraseña)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Aquí validas usuario/contraseña en tu base de datos
        if (credentials?.email === "demo@demo.com" && credentials?.password === "1234") {
          return { id: "1", name: "Demo User", email: "demo@demo.com" }
        }
        // Si no es válido, devuelve null
        return null
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // página de login personalizada
  },
  secret: process.env.NEXTAUTH_SECRET,
})
