import { NextApiRequest, NextApiResponse } from "next"

type AuthResponse = {
    isLoggedIn: boolean
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<AuthResponse>) {
    res.json({
        isLoggedIn: req.cookies.password === process.env.PASSWORD && Boolean(req.cookies.username),
    })
}
