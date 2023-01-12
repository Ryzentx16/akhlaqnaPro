import users from "./users";

const chatRoomData =
    {
        id: 'r1',
        chatUsers: [users[3], users[1]],
        messages:
            [
                {
                    id: 'm10',
                    createdAt: '2023/01/10 22:08:00',
                    content: "Bye",
                    user: users[1],
                },
                {
                    id: 'm9',
                    createdAt: '2023/01/10 22:07:50',
                    content: "Good Bye then!",
                    user: users[3],
                },
                {
                    id: 'm8',
                    createdAt: '2023/01/10 22:08:00',
                    content: "12:30 PM works for me. See you then!",
                    user: users[1],
                },
                {
                    id: 'm7',
                    createdAt: '2023/01/10 22:07:50',
                    content: "?",
                    user: users[3],
                },
                {
                    id: 'm6',
                    createdAt: '2023/01/10 22:07:50',
                    content: "How about 12:30 PM?",
                    user: users[3],
                },
                {
                    id: 'm5',
                    createdAt: '2023/01/10 22:07:08',
                    content: "Sure, that sounds great. What time works for you?",
                    user: users[1],
                },
                {
                    id: 'm3',
                    createdAt: '2023/01/10 22:06:50',
                    content: "I'm doing well too. Do you want to grab lunch later?",
                    user: users[3],
                },
                {
                    id: 'm3',
                    createdAt: '2023/01/10 22:06:12',
                    content: "I'm good, thanks for asking. How about you?",
                    user: users[1],
                },
                {
                    id: 'm1',
                    createdAt: '2023/01/10 22:05:12',
                    content: "Hello, Bob! How are you today?",
                    user: users[3],
                },
            ]
    };

export default chatRoomData;