function commonHeaders() {
    return {
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
    }
}

export {
    commonHeaders
}