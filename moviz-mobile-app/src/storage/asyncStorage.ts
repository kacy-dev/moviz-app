import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setItem(key: string, value: string) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Error saving data", error);
    }
}


export async function getItem<T = any >(key: string): Promise< T | null> {
    
    try {
        const value = await AsyncStorage.getItem(key);
        return value != null ? JSON.parse(value) : null;
        
    } catch (error) {
        console.error("Error reading data", error);
        return null;
    }
}


export async function remoteItem(key: string) {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error("Error removing data", error)
    }
}


export async function clearStorage(key: string) {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.error("Error clearing storage", error)
    }
}

