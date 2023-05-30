import { APIRoute } from "next-s3-upload";


export default APIRoute.configure({
    async key(req, filename) {
        return `thomas/${filename}`
    }
})