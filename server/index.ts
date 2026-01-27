import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { Socket } from 'dgram';

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Хранилище пользователей (MVP. В будущем реализовать БД)
const users: Map<string, string> = new Map(); // userId -> socketId

io.on('connection', (socket) => {
    console.log('Новое соединение: ', socket.id);

    socket.on('register', (userId: string) => {
        users.set(userId, socket.id);
        console.log(`Пользователь ${userId} зарегистрирован`);
    });

    socket.on('message', (data: {from: string; to: string; message: string}) => {
    const recipientSocketId = users.get(data.to);

    if (recipientSocketId) {
        io.to(recipientSocketId).emit('message', data);
        socket.emit('delivery-status', {to: data.to, status: 'delivered'});
    } else {
        socket.emit('delivery-status', {to: data.to, status: 'offline'});
    }
    });

    socket.on('disconnected', () => {
        console.log('Отключение: ', socket.id);
        // Удаляем пользователя из хранилища (MVP)
        for (const [userId, socketId] of users.entries()) {
            if (socketId === socket.id) {
                users.delete(userId);
                break;
            }
        }
    })
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`)
})