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
    _id: 'ghshy67327dw7fdsfdsw7',
    sender:{
      _id: 1,
      name:'Himanshu'
    },
    chat: "chatId",
    createdAt: "2022-02-10T09:00:00.000Z",
  },
  {
    attachments: [],
    content: "Hi Bro! I just reached",
    _id: 'ghshy67327dw789vw7',
    sender:{
      _id: 23,
      name:'Shani'
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
    
    _id: 'ghshy673dsfgkly894e',
    sender:{
      _id: 23,
      name:'Shani'
    },
    chat: "chatId",
    createdAt: "2023-02-10T09:00:00.000Z",
  },
];
