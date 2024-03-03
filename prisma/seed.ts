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
      street_name: "Rua",  
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
      comment: "ótima casa, muito confortável e espaçosa!!!",
      rating: 3,
      property_Id: propertyBase.id,
      user_name: "Júnior",
      user_Id: propertyBase.user_Id,
    },
  });
  await db.reviews.create({
    data: {
      comment: "Casa muito boa, pena que tem pouco espaço para estacionar.",
      rating: 5,
      property_Id: propertyBase.id,
      user_name: "José",
      user_Id: propertyBase.user_Id,
    },
  });
  await db.image.create({
    data: {
      path: "https://www.matuetevillas.com/wp-content/uploads/2022/09/Aluguel-de-casas-de-luxo-Ceara%CC%81-Jericoacora-Villa-1-3-scaled.jpg",
      property_Id: propertyBase.id,
    },
  });
  await db.image.create({
    data: {
      path: "https://www.ceara.gov.br/wp-content/uploads/2021/08/210624_CASA-DE-CUIDADOS-CE_TS7884-1.jpg",
      property_Id: propertyBase.id,
    },
  });

  return propertyBase;
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
