import React, {useState, useEffect} from "react";
import {View, FlatList, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { io, Socket } from "socket.io-client";

const ContactScreen = ({navigation} : any) => {
    const [contacts, setContacts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        // Подключение к серверу
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);

        // Регистрация на сервере (в проде получать ID из хранилища)
        newSocket.emit('register', 'CORP_USER_001');

        // Получение списка контактов (в проде с сервера)
        setTimeout(() => {
            setContacts([
                {id: '1', name: 'Иван Петров', corporateId: 'EMP_001'},
                {id: '2', name: 'Пархоменко Артём', corporateId: 'EMP_002'},
                {id: '2', name: 'Анна Крутакова', corporateId: 'EMP_003'},
            ]);
            setLoading(false)
        }, 1000);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const handleContactsPress = (contact: any) => {
        navigation.navigate('Chat', {contact});
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color="#0066cc"/>
                <Text style={styles.loadingText}>Загрузка контактов...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={contacts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.contactItem}
                        onPress={() => handleContactsPress(item)}
                    >
                        <View style={styles.contactsInfo}>
                            <Text style={styles.contactName}>{item.name}</Text>
                            <Text style={styles.contactId}>{item.corporateId}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: '#f5f5f5',
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },

    contactItem: {
        backgroundColor: 'white',
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },

    contactsInfo: {
        flexDirection: 'column',
    },

    contactName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },

    contactId:{
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    }
});

export default ContactScreen;


