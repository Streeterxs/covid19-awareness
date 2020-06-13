import AsyncStorage from "@react-native-community/async-storage";


const asyncStorage = <T,>(key: string) => {

    const getValue = async (): Promise<T | null> => {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    };

    const setValue = async (value: T) => {
        await AsyncStorage.setItem(key, JSON.stringify(value))
    }

    return {
        getValue,
        setValue
    }
};

export default asyncStorage;
