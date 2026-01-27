import * as SecureStore from 'expo-secure-store';
import CryptoJS from 'crypto-js';

interface KeyPair {
    identityKey: string;
    signedPreKey: string;
    ephemeralKeys: string[];
}

class KeyManager {
    // Генерация ключей (MVP)
    async generateKeys(): Promise<KeyPair> {
        const identityKey = CryptoJS.lib.WordArray.random(32).toString();
        const signedPreKey = CryptoJS.lib.WordArray.random(32).toString();
        const ephemeralKeys = [
            CryptoJS.lib.WordArray.random(32).toString(),
            CryptoJS.lib.WordArray.random(32).toString()
        ];

        // Безопасно сохраняем
        await SecureStore.setItem('identityKey', identityKey);
        await SecureStore.setItem('signedPreKey', signedPreKey);

        return { identityKey, signedPreKey, ephemeralKeys};
    }

    async getKeys(): Promise<KeyPair | null> {
        const identityKey = await SecureStore.getItem('identityKey');
        const signedPreKey = await SecureStore.getItem('signedPreKey');
        
        if (!identityKey || !signedPreKey) return null;

        return { 
            identityKey, 
            signedPreKey, 
            ephemeralKeys: [] // Здесь нужно загрузить из бд или генерить новые
            };
    }
}

export default new KeyManager();