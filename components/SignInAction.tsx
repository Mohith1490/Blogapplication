import { signIn, signOut } from '@/auth'
import Link from 'next/link'
import React from 'react'

const SignInAction = () => {
    return (
        <>
            <form
                action={async () => {
                    "use server"
                    await signIn("github")
                }}
            >
                <button type="submit">Sign in</button>
            </form>
        </>
    )
}

export default SignInAction

export function SignOutAction(sessions: any) {
    return (
        <>
            <Link href="/startup/create/">
                <span>Create</span>
            </Link>
            <form action={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
            }
            }>
                <button type='submit'>Logout</button>
            </form>
            <Link href={`/user//user/${sessions?.user?.id}`} >
                <span>{sessions?.user?.name}</span>
            </Link>
            <span>Mohith singh</span>
        </>
    )
}
