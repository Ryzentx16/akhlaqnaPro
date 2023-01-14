import users from "./users";

// const examples = [
//     {
//         "id": 1,
//         "comment": "Good luck finding your [item]!",
//         "author": "John Doe"
//     },
//     {
//         "id": 2,
//         "comment": "I hope someone finds your [item] soon!",
//         "author": "Jane Smith"
//     },
//     {
//         "id": 3,
//         "comment": "Please keep me updated on the search for your [item].",
//         "author": "Bob Johnson"
//     },
//     {
//         "id": 4,
//         "comment": "I'll keep an eye out for your [item] around [location].",
//         "author": "Emily Davis"
//     },
//     {
//         "id": 5,
//         "comment": "I hope you find your [item], I know how frustrating it can be to lose something.",
//         "author": "Michael Brown"
//     },
//     {
//         "id": 6,
//         "comment": "I've lost something similar before, my thoughts are with you.",
//         "author": "Jessica Garcia"
//     },
//     {
//         "id": 7,
//         "comment": "Let us know if there's anything we can do to help you find your [item].",
//         "author": "Mark Wilson"
//     },
//     {
//         "id": 8,
//         "comment": "I'll spread the word to try and help you find your [item].",
//         "author": "Ashley Anderson"
//     },
//     {
//         "id": 9,
//         "comment": "I hope someone finds it, I can feel your pain of losing something valuable.",
//         "author": "Matthew Martinez"
//     },
//     {
//         "id": 10,
//         "comment": "I hope you find it, I know how hard it is to lose something special",
//         "author": "Olivia Thompson"
//     }];

const comments =
    [
        {
            postId: 'p1',
            comments: [
                {
                    id: "c1",
                    user: users[0],
                    createdAt: '2023/01/01 09:00:00',
                    content: 'I hope you find it, I know how hard it is to lose something special\nI hope you find it, I know how hard it is to lose something special\nI hope you find it, I know how hard it is to lose something special',
                },
                {
                    id: "c2",
                    user: users[1],
                    createdAt: '2023/01/7 18:30:00',
                    content: 'I hope someone finds it, I can feel your pain of losing something valuable.',
                },
                {
                    id: "c3",
                    user: users[2],
                    createdAt: '2023/01/06 12:00:30',
                    content: 'I\'ll spread the word to try and help you find your [item].',
                    replies: [
                        {
                            id: "r1",
                            user: users[0],
                            createdAt: '2023:01:02 12:30:00',
                            content: 'Unfortunately, it still hasn\'t been found. But I appreciate the support.',
                        },
                        {
                            id: "r2",
                            user: users[1],
                            createdAt: '2023:01:02 12:30:00',
                            content: 'Thank you, I hope so too!',
                        },
                    ],
                },
                {
                    id: "c4",
                    user: users[3],
                    createdAt: '2023/01/10 14:30:00',
                    content: 'Let us know if there\'s anything we can do to help you find your [item].',
                }
            ]
        },
        {
            postId: 'p2',
            comments: []
        },
        {
            postId: 'p2',
            comments: [
                {
                    id: "c1",
                    user: users[0],
                    createdAt: '2023/01/01 09:00:00',
                    content: 'I hope you find it, I know how hard it is to lose something special\nI hope you find it, I know how hard it is to lose something special\nI hope you find it, I know how hard it is to lose something special',
                },
                {
                    id: "c2",
                    user: users[1],
                    createdAt: '2023/01/7 18:30:00',
                    content: 'I hope someone finds it, I can feel your pain of losing something valuable.',
                },
                {
                    id: "c3",
                    user: users[2],
                    createdAt: '2023/01/06 12:00:30',
                    content: 'I\'ll spread the word to try and help you find your [item].',
                    replies: [
                        {
                            id: "r1",
                            user: users[0],
                            createdAt: '2023:01:02 12:30:00',
                            content: 'Unfortunately, it still hasn\'t been found. But I appreciate the support.',
                        },
                        {
                            id: "r2",
                            user: users[1],
                            createdAt: '2023:01:02 12:30:00',
                            content: 'Thank you, I hope so too!',
                        },
                    ],
                },
                {
                    id: "c4",
                    user: users[3],
                    createdAt: '2023/01/10 14:30:00',
                    content: 'Let us know if there\'s anything we can do to help you find your [item].',
                }
            ]
        },
        {
            postId: 'p3',
            comments: [
                {
                    id: "c1",
                    user: users[0],
                    createdAt: '2023/01/01 09:00:00',
                    content: 'I hope you find it, I know how hard it is to lose something special\nI hope you find it, I know how hard it is to lose something special\nI hope you find it, I know how hard it is to lose something special',
                },
                {
                    id: "c2",
                    user: users[1],
                    createdAt: '2023/01/7 18:30:00',
                    content: 'I hope someone finds it, I can feel your pain of losing something valuable.',
                },
                {
                    id: "c3",
                    user: users[2],
                    createdAt: '2023/01/06 12:00:30',
                    content: 'I\'ll spread the word to try and help you find your [item].',
                    replies: [
                        {
                            id: "r1",
                            user: users[0],
                            createdAt: '2023:01:02 12:30:00',
                            content: 'Unfortunately, it still hasn\'t been found. But I appreciate the support.',
                        },
                        {
                            id: "r2",
                            user: users[1],
                            createdAt: '2023:01:02 12:30:00',
                            content: 'Thank you, I hope so too!',
                        },
                    ],
                },
                {
                    id: "c4",
                    user: users[3],
                    createdAt: '2023/01/10 14:30:00',
                    content: 'Let us know if there\'s anything we can do to help you find your [item].',
                }
            ]
        }

    ]


export default comments;


