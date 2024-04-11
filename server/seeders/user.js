import { faker } from "@faker-js/faker";
import { User } from "../models/user.model.js";

const createUser = async (numUsers) => {
  try {
    const usersList = [];

    for (let i = 0; i < numUsers; i++) {
      const tempUser = User.create({
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        bio: faker.lorem.sentence(10),
        password: "password",
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });
      usersList.push(tempUser);
    }

    await Promise.all(usersList);

    console.log("Users created", numUsers);
    process.exit(1);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export { createUser };