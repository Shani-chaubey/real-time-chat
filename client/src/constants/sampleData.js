export const sampleChats = [
  {
    avatar: ["https://w3schools.com/howto/img_avatar.png"],
    name: "John Doe",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: ["https://w3schools.com/howto/img_avatar.png"],
    name: "Himanshu",
    _id: "2",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://w3schools.com/howto/img_avatar.png"],
    name: "Himanshu and John",
    _id: "3",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://w3schools.com/howto/img_avatar.png"],
    name: "Himanshu 2",
    _id: "4",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://w3schools.com/howto/img_avatar.png"],
    name: "Himanshu 3",
    _id: "5",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://w3schools.com/howto/img_avatar.png"],
    name: "Himanshu 4",
    _id: "6",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://w3schools.com/howto/img_avatar.png"],
    name: "Himanshu 5",
    _id: "7",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://w3schools.com/howto/img_avatar.png"],
    name: "Himanshu 6",
    _id: "8",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://w3schools.com/howto/img_avatar.png"],
    name: "Himanshu 7",
    _id: "9",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://w3schools.com/howto/img_avatar.png"],
    name: "Himanshu 8",
    _id: "10",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://w3schools.com/howto/img_avatar.png"],
    name: "Himanshu 9",
    _id: "11",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://w3schools.com/howto/img_avatar.png"],
    name: "Himanshu 10",
    _id: "12",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://w3schools.com/howto/img_avatar.png"],
    name: "Himanshu 11",
    _id: "13",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://w3schools.com/howto/img_avatar.png"],
    name: "Himanshu 12",
    _id: "14",
    groupChat: true,
    members: ["1", "2"],
  },
];

export const sampleUsers = [
  {
    avatar: "https://w3schools.com/howto/img_avatar.png",
    name: "John Doe",
    _id: "1",
  },
  {
    avatar: "https://w3schools.com/howto/img_avatar.png",
    name: "Himanshu",
    _id: "2",
  },
];

export const sampleNotifications = [
  {
    sender: {
      avatar: "https://w3schools.com/howto/img_avatar.png",
      name: "John Doe",
    },
    _id: "1",
  },
  {
    sender: {
      avatar: "https://w3schools.com/howto/img_avatar.png",
      name: "Himanshu",
    },
    _id: "2",
  },
];

export const sampleMessage = [
  {
    attachments: [],
    content: "Have You reached?",
    _id: "ghshy67327dw7fdsfdsw7",
    sender: {
      _id: 1,
      name: "Himanshu",
    },
    chat: "chatId",
    createdAt: "2022-02-10T09:00:00.000Z",
  },
  {
    attachments: [],
    content: "Hi Bro! I just reached",
    _id: "ghshy67327dw789vw7",
    sender: {
      _id: 2,
      name: "Shivam",
    },
    chat: "chatId",
    createdAt: "2023-02-10T09:00:00.000Z",
  },
  {
    attachments: [
      {
        public_id: "hjedjkff",
        url: "https://w3schools.com/howto/img_avatar.png",
      },
    ],

    _id: "ghshy673dsfgkly894e",
    sender: {
      _id: 23,
      name: "Shani",
    },
    chat: "chatId",
    createdAt: "2023-02-10T09:00:00.000Z",
  },
];

export const dashboardData = {
  users: [
    {
      avatar: "https://w3schools.com/howto/img_avatar.png",
      name: "John Doe",
      _id: "1",
      username: "John Doe",
      groups: 10,
    },
    {
      avatar: "https://w3schools.com/howto/img_avatar.png",
      name: "Himanshu",
      _id: "2",
      username: "Himanshu",
      groups: 30,
    },
  ],
  chats: [
    {
      avatar: "https://w3schools.com/howto/img_avatar.png",
      name: "John Doe",
      _id: "1",
      groupChat: false,
      members: [
        {
          avatar: "https://w3schools.com/howto/img_avatar.png",
          _id: "1",
        },
        {
          avatar: "https://w3schools.com/howto/img_avatar.png",
          _id: "2",
        },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        avatar: "https://w3schools.com/howto/img_avatar.png",
        name: "John Doe",
      },
    },
    {
      avatar: "https://w3schools.com/howto/img_avatar.png",
      name: "Himanshu",
      _id: "2",
      groupChat: false,
      members: [
        {
          avatar: "https://w3schools.com/howto/img_avatar.png",
          _id: "1",
        },
        {
          avatar: "https://w3schools.com/howto/img_avatar.png",
          _id: "2",
        },
      ],
      totalMembers: 5,
      totalMessages: 60,
      creator: {
        avatar: "https://w3schools.com/howto/img_avatar.png",
        name: "Himanshu",
      },
    },
  ],
  messages: [
    {
      attachments: [],
      content: "Hi Bro! I just reached",
      _id: "ghshy67327dw789vw7",
      sender: {
        avatar: "https://w3schools.com/howto/img_avatar.png",
        name: "Shivam",
      },
      chat: "chatId",
      groupChat: false,
      createdAt: "2023-02-10T09:00:00.000Z",
    },
    {
      attachments: [],
      content: "Hi Bro! I just reached",
      _id: "ghshy67327dw789vw7",
      sender: {
        avatar: "https://w3schools.com/howto/img_avatar.png",
        name: "Shivam",
      },
      chat: "chatId",
      groupChat:false,
      createdAt: "2023-02-10T09:00:00.000Z",
    },
    {
      attachments: [
        {
          public_id: "hjedjkff",
          url: "https://w3schools.com/howto/img_avatar.png",
        },
      ],

      _id: "ghshy673dsfgkly894e",
      sender: {
        avatar: "https://w3schools.com/howto/img_avatar.png",
        name: "Shani",
      },
      chat: "chatId",
      groupChat:false,
      createdAt: "2023-02-10T09:00:00.000Z",
    },
  ],
};
