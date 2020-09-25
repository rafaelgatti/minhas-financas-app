class LocalStorageService {

    static additem(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    }

    static getItem(key){
        const item = localStorage.getItem(key)
        return JSON.parse(item)
    }

    static removerItem (key){
        localStorage.removeItem(key)
    }
}

export default LocalStorageService