export const userKeyBoards = [
  [
    {
      text: "Katalog",
    },
  ],
  [
    {
      text: "Biz haqimizda",
    },
  ],
  [
    {
      text: "Buyurtma berish",
    },
  ],
  [
    {
      text: "Aloqa",
    },
  ],
];

export const adminKeyBoards = [
  [
    {
      text: "Barcha kataloglar",
    },
  ],
  [
    {
      text: "Barcha buyurtmalar",
    },
  ],
  [
    {
      text: "Foydalanuvchilar",
    },
  ],
];

export const contactKeyboard = [
  [
    {
      text: "Raqamni ulashish",
      request_contact: true,
    },
  ],
];

export const categoryInlineKeyboards = (categories, admin, page = 1) => {
  return [
    ...categories,
    [
      {
        text: "Ortga",
        callback_data: "back_category",
      },
      {
        text: `${page}-sahifa`,
        callback_data: "null",
      },
      {
        text: "Oldinga",
        callback_data: "next_category",
      },
    ],
    admin
      ? [
          {
            text: "New category",
            callback_data: "add_category",
          },
        ]
      : [],
  ];
};
