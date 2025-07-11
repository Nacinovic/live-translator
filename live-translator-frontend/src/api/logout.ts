async function login(): Promise<void> {
    const url = `${process.env.REACT_APP_API_URL}/logout`
    await fetch(url, {
        method: "POST",
        credentials: 'include'
    });
}


export default login