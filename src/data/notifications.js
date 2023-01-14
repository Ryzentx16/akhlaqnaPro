import users from "./users";

const notifications = [
    {
        id: "n1",
        user: users[3],
        createdAt: '2023:01:02 12:30:00',
        details: " has reacted to your post",
        type: 'share',
    },
    {
        id: "n2",
        user: users[1],
        createdAt: '2023:01:01 15:28:00',
        details: " has reacted to your post",
        type: 'comment',
    },
    {
        id: "n3",
        user: users[2],
        createdAt: '2023:01:03 19:30:35',
        details: " has reacted to your post",
        type: 'like',
    },
];

export default notifications;