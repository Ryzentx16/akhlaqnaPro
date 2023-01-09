import users from "./users"

const posts = [
    {
        id: 't1',
        user: users[0],
        createdAt: '2022:12:04 12:00:00',
        content: 'Lorem Ipsum is simply dummy text of the printing and ' +
            'typesetting industry. Lorem Ipsum has been the ' +
            'industry\'s standard dummy text ever ' +
            'since the 1500s, when an unknown printer ' +
            'took a galley of type and scrambled it to ' +
            'make a type specimen book.',
        image: require('../../assets/image_1.png'),
        isImage: true,
        numberOfComments: 126,
        numberOfShares: 506,
        numberOfLikes: 53,
    },
    {
        id: 't2',
        user: users[1],
        createdAt: '2022:12:01 2:03:14',
        content: 'Lorem Ipsum is simply dummy text of the printing and ' +
            'typesetting industry. Lorem Ipsum has been the ' +
            'make a type specimen book.',
        image: null,
        isImage: false,
        numberOfComments: 0,
        numberOfShares: 10,
        numberOfLikes: 3,
    },
    {
        id: 't3',
        user: users[2],
        createdAt: '2022:12:04 2:03:14',
        content: 'Lorem Ipsum is simply dummy text of the printing and ' +
            'typesetting industry. ',
        image: require('../../assets/image_2.png'),
        isImage: true,
        numberOfComments: 260,
        numberOfShares: 623,
        numberOfLikes: 1025,
    },
    {
        id: 't4',
        user: users[3],
        createdAt: '2022:07:04 14:02:00',
        content: 'Lorem Ipsum is simply dummy text of the printing and ' +
            'typesetting industry. ',
        image: require('../../assets/image_3.png'),
        isImage: true,
        numberOfComments: 126,
        numberOfShares: 506,
        numberOfLikes: 53,
    }
];

export default posts;

