import users from "./users";

const chats = [
    {
        id: 'c1',
        user: users[4],
        createdAt: '2022:12:04 12:00:00',
        preText: 'Hi this post\'s image is wha...',
        lastSeen: Math.floor((Math.random() * 40) + 1) + 'm',
        chatRoomId: 'r1',
    },
    {
        id: 'c2',
        user: users[1],
        createdAt: '2022:12:04 12:00:00',
        preText: 'Hi this post\'s image is wha...',
        lastSeen: Math.floor((Math.random() * 40) + 1) + 'm',
        chatRoomId: 'r2',
    },
    {
        id: 'c3',
        user: users[2],
        createdAt: '2022:12:04 12:00:00',
        preText: 'Hi this post\'s image is wha...',
        lastSeen: Math.floor((Math.random() * 40) + 1) + 'm',
        chatRoomId: 'r3',
    },
    {
        id: 'c4',
        user: users[3],
        createdAt: '2022:12:04 12:00:00',
        preText: 'Hi this post\'s image is wha...',
        lastSeen: Math.floor((Math.random() * 40) + 1) + 'm',
        chatRoomId: 'r4',
    },
];

export default chats;