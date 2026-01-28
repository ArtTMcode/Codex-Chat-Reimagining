import React, {useState} from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import KeyManager from '../crypto/KeyManager';

const LoginScreen = ({navigation} : any) => {
    const [corporatedId, setCorporateId] = useState('');

    const handleLogin = async () => {
        // Генерируем ключи при первом заходе
        const existingKeys = await KeyManager.getKeys();
        if (!existingKeys) {
            await KeyManager.generateKeys();
        }

    // Тут логика отправки корпоративного ID на сервер и получение списка контактов

    navigation.navigate('Contacts')
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Введите корпоративный ID"
                value={corporatedId}
                onChangeText={setCorporateId}
            />
            <Button title="Войти" onPress={handleLogin}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
    }
})

export default LoginScreen;