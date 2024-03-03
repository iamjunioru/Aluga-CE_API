import { db } from "../src/server/utils/db.server";

// type User = {
//   email: string;
//   name: string;
//   password: string;
//   phone_number: string;
// };

// type Property = {
//   inscription_number: string;
//   type: string;
//   description: string;
//   rent_price: string;
//   cep: string;
//   neighborhood: string;
//   street_name: string;
//   street_number: string;
//   total_occupancy: number;
//   total_bedrooms: number;
//   total_bathrooms: number;
//   has_wifi: Boolean;
//   has_tv: Boolean;
//   has_air_conditioning: Boolean;
//   has_washing_machine: Boolean;
//   has_kitchen: Boolean;
//   has_suite: Boolean;
//   has_parking_space: Boolean;
//   has_pool: Boolean;
//   has_beach_view: Boolean;
//   user_Id: string;
// };

// type Reviews = {
//   comment: string;
//   rating: number;
//   property_Id: string;
//   user_Id: string;
// }

// type Images = {
//   path: string;
//   property_Id: string;
// }

// function getUsers(): Array<User> {
//   return [
//     {
//       email: "jhon@teste.com",
//       name: "Jhon",
//       password: "123456",
//       phone_number: "123456789",
//     },
//     {
//       email: "marllon@gmail.com",
//       name: "Marllon",
//       password: "123456",
//       phone_number: "123456789",
//     },
//   ];
// }

// function getProperty(): Array<Property> {
//   return [
//     {
//       inscription_number: "9873987983535",
//       type: "Casa",
//       description: "Casa com 3 quartos",
//       rent_price: "500",
//       cep: "12345678",
//       neighborhood: "Centro",
//       street_name: "Rua 1",
//       street_number: "123",
//       total_occupancy: 3,
//       total_bedrooms: 3,
//       total_bathrooms: 2,
//       has_wifi: true,
//       has_tv: true,
//       has_air_conditioning: true,
//       has_washing_machine: true,
//       has_kitchen: true,
//       has_suite: true,
//       has_parking_space: true,
//       has_pool: true,
//       has_beach_view: true,
//       user_Id: "1",
//     },
//     {
//       inscription_number: "329578876387",
//       type: "Casa",
//       description: "Casa com 3 quartos",
//       rent_price: "500",
//       cep: "12345678",
//       neighborhood: "Centro",
//       street_name: "Rua 1",
//       street_number: "123",
//       total_occupancy: 3,
//       total_bedrooms: 3,
//       total_bathrooms: 2,
//       has_wifi: true,
//       has_tv: true,
//       has_air_conditioning: true,
//       has_washing_machine: true,
//       has_kitchen: true,
//       has_suite: true,
//       has_parking_space: true,
//       has_pool: true,
//       has_beach_view: true,
//       user_Id: "2",
//     },
//   ];
// }

async function seed() {
  const userData = await db.user.create({
    data: {
      email: "marllon@gmail.com",
      name: "Marllon",
      password: "123456",
      phone_number: "123456789",
    },
  });
  await seedProperty(userData.id);
}

async function seedProperty(userData: string) {
  const propertyBase = await db.property.create({
    data: {
      inscription_number: "9873987983535",
      type: "Casa",
      description: "Casa com 3 quartos",
      rent_price: "500",
      cep: "12345678",
      neighborhood: "Centro",
      street_name: "Rua 1",
      street_number: "123",
      total_occupancy: 3,
      total_bedrooms: 3,
      total_bathrooms: 2,
      has_wifi: true,
      has_tv: true,
      has_air_conditioning: true,
      has_washing_machine: true,
      has_kitchen: true,
      has_suite: true,
      has_parking_space: true,
      has_pool: true,
      has_beach_view: true,
      user_Id: userData,
    },
  });
  await db.reviews.create({
    data: {
      comment: "Comentário 1",
      rating: 4,
      property_Id: propertyBase.id,
      user_name: "Marllon",
      user_Id: propertyBase.user_Id,
    },
  });
  await db.reviews.create({
    data: {
      comment: "Comentário 2",
      rating: 5,
      property_Id: propertyBase.id,
      user_name: "Marllon",
      user_Id: propertyBase.user_Id,
    },
  });
  await db.image.create({
    data: {
      path: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vivadecora.com.br%2Frevista%2Fdecoracao-de-casas-pequenas%2F&psig=AOvVaw0Z3Z2Z4Z2Z4Z2Z4Z2Z4Z2Z4&ust=1629786160000000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjQ4ZqHgvICFQAAAAAdAAAAABAD",
      property_Id: propertyBase.id,
    },
  });
  await db.image.create({
    data: {
      path: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vivadecora.com.br%2Frevista%2Fdecoracao-de-casas-pequenas%2F&psig=AOvVaw0Z3Z2Z4Z2Z4Z2Z4Z2Z4Z2Z4&ust=1629786160000000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjQ4ZqHgvICFQAAAAAdAAAAABAD",
      property_Id: propertyBase.id,
    },
  });

  return propertyBase;
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
