import { useEffect, useState } from "react"
import ky from 'ky'
import cookie from 'js-cookie'

type AuthResponse = {
    isLoggedIn: boolean
}

export default function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        updateLoggedInState()
    }, [])

    async function login(username: string, password: string) {
        cookie.set('username', username, {
            expires: 7,
        })
        cookie.set('password', password, {
            expires: 7,
        })

        await updateLoggedInState()
    }

    async function updateLoggedInState() {
        const data = await ky.get('/api/auth').json<AuthResponse>()

        setIsLoggedIn(data.isLoggedIn)
    }

    return {
        isLoggedIn,
        login,
    }
}