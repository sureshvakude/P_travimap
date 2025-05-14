import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/utils/users/api/post-login";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const email = credentials?.email;
                const password = credentials?.password;

                if (!email || !password) return null;

                try {
                    const user = await loginUser(email, password);
                    return {
                        id: user.user_id.toString(), // required by NextAuth
                        email,
                        accessToken: user.access,
                        refreshToken: user.refresh,
                    };
                } catch (error) {
                    return null;
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }: { token: any; user: any }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.id = user.id;
                token.email = user.email; // add this for consistency
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            session.user = {
                id: token.id,
                email: token.email, // make sure email is passed
            };
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            return session;
        },
    },

    pages: {
        signIn: "/login",
        error: "/login",    // will redirect on error
        signOut: "/login",  // optional
    },

    secret: process.env.NEXTAUTH_SECRET,
};