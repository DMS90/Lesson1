export class LocalStorageHelper {
    // Check if localStorage is available
    static isAvailable() {
        try {
            const testKey = '__test__';
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
            return true;
        } catch (e) {
            return false;
        }
    }

    // Save a key-value pair (value can be any JSON-serializable object)
    static save(key, value) {
        if (!this.isAvailable()) return false;
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('localStorage save error:', e);
            return false;
        }
    }

    // Load a value by key, returning defaultValue if key is missing or parsing fails
    static load(key, defaultValue = null) {
        if (!this.isAvailable()) return defaultValue;
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('localStorage load error:', e);
            return defaultValue;
        }
    }

    // Remove an item by key
    static remove(key) {
        if (!this.isAvailable()) return false;
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('localStorage remove error:', e);
            return false;
        }
    }

    // Clear all localStorage for the current domain
    static clear() {
        if (!this.isAvailable()) return false;
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('localStorage clear error:', e);
            return false;
        }
    }

    // Add an item to an array stored under a key (creates array if missing)
    static addItemToArray(key, item) {
        if (!this.isAvailable()) return false;
        try {
            const arr = this.load(key, []);
            if (!Array.isArray(arr)) throw new Error('Stored data is not an array');
            arr.push(item);
            return this.save(key, arr);
        } catch (e) {
            console.error('localStorage addItemToArray error:', e);
            return false;
        }
    }

    // Remove an item from an array stored under a key
    static removeItemFromArray(key, itemToRemove) {
        if (!this.isAvailable()) return false;
        try {
            const arr = this.load(key, []);
            if (!Array.isArray(arr)) throw new Error('Stored data is not an array');
            const filtered = arr.filter(item => item !== itemToRemove);
            return this.save(key, filtered);
        } catch (e) {
            console.error('localStorage removeItemFromArray error:', e);
            return false;
        }
    }
}
