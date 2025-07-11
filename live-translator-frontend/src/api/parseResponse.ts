
async function parseError(response: Response): Promise<Error> {
    console.log(response)
    console.log(response.status === 401)

    if (response.status === 401) {
        return new Error("Invalid username or password")
    }

    const { error } = await response.json()
    if (error) {
        return new Error(error)
    } else {
        return new Error("Server error")
    }
}
export async function parseResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const error = await parseError(response)
        throw error
    }

    const contentType = response.headers.get("Content-Type") || "";
    if (contentType.includes("application/json")) {
        return (await response.json()) as T;
    }

    return undefined as T
}