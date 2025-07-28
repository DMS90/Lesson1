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
    async getProductById(id) {
        try {
            const resp = await fetch(`/api/products/${id}`, {
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
    async getProductsByCategrory(id, query) {
        try {
            const resp = await fetch(`/api/products/category/${id}?query=${query}`, {
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
    async getCategories() {
        try {
            const resp = await fetch(`/api/products/category`, {
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
    async searchProduct(query) {
        try {
            const resp = await fetch(`/api/products/search?query=${query}`, {
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