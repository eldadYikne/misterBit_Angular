export const storageService = {
    loadFromStorage,
    saveToStorage
}

function saveToStorage(entityType: string, entities: any) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function loadFromStorage(key: string) {
    var val: any = localStorage.getItem(key)
    return JSON.parse(val)
}

