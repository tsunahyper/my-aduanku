import { decodeToken } from "../utils/commonUtils"

export const getUserRole = (): string | null => {
    const token = localStorage.getItem('token')
    if (!token) return null
    const decoded = decodeToken(token)
    return decoded.role || null
}
