import { db } from "../src/server/utils/db.server"

type User = {
  email: string;
  name: string;
  password: string;
  phone_number: string;
};

function getUsers(): Array<User> {
  return [
    {
      email: "jhon@teste.com",
      name: "Jhon",
      password: "123456",
      phone_number: "123456789",
    },
    {
      email: "marllon@gmail.com",
      name: "Marllon",
      password: "123456",
      phone_number: "123456789",
    },
  ];
}

async function seed() {
  await Promise.all(
    getUsers().map(async (user) => {
      return await db.user.create({
        data: {
          email: user.email,
          name: user.name,
          password: user.password,
          phone_number: user.phone_number,
        },
      });
    })
  );
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
