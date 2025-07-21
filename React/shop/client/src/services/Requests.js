export class Requests {
    async getProducts() {
        try {
            const resp = await fetch('/api/products', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            if (!resp?.ok) {
                throw new Error(resp.statusText);
            }
            const data = await resp.json();
            return data;
        } catch (err) {
            console.error(err);
            throw new Error(err.message);
        }
    }
}