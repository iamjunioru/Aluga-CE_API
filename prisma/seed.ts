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
      path: "https://www.matuetevillas.com/wp-content/uploads/2022/09/Aluguel-de-casas-de-luxo-Ceara%CC%81-Jericoacora-Villa-1-3-scaled.jpg",
      property_Id: propertyBase.id,
    },
  });
  await db.image.create({
    data: {
      path: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUUFBcUFBQXGBcZGRcZGhkaGB0ZHRoaIBkaGBoaHBgdICwjIB0pHhoaJDYlKS0vNDMzGiI4PjgyPSwyMy8BCwsLDw4PHhISHjcpIikyMjI6Mjo6MjI0NDIyMjIyMjI0NDQ1MjIyMjI0MjIyNDIyMjIyMjIyMjIyMjIyMjIyMv/AABEIALEBHAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAAIDBQYBB//EAEYQAAIBAgQDBQUECAQEBgMAAAECEQADBBIhMQVBURMiYXGBBjKRobFCwdHwFCMzUnKCsuFiksLxBxVTcyRDY6Kz0hY0k//EABoBAAIDAQEAAAAAAAAAAAAAAAACAQMFBAb/xAAvEQACAgEDAwMBCAIDAAAAAAAAAQIRAwQSITFBUQUTYSIUMkJxgZGhsfDxI1LB/9oADAMBAAIRAxEAPwCopV2KUV7Q8WcpV2KUUAcpV2KUVAHKVdilFAHKVdilFAWcpV2KUUBZyKVdilFAWcpV2KUUBZyKUV2K7FAWNilFOilFSFjYpRXYpRUBZyKUV2KUUBZX47M5CLI1EttEmDHPnyjcQar+LYdUtZEklQJYnULzyjQT1jfmZq+CayfCPL/es5xO6GuXAdSAqKNdY70QNwSNSdBp10zdYlGLk+r4NbQyc5KK6Ln9SmxLKICEtpJaIluonXnEnfkBTMFgWutlUTG5PIdakxs5mD6OsAgARIER3YAA8B086nwWL7AyM3eQTAAknX7XIGRI8etYy2uf1dDYblt+nqXuHtWcOMs94jU5lQsfMsCB0AoLG8bykZFBB5s5bwgQY9aqL/ErtwZS0KfsgBQfPKBI86IwPDHvQdFUaZioHwAALHxNdn2ic/owqv0OX2IQW/K+fzCBxYXCMyso20COOX2Sq/1Vy5w5nIFtSFnWVKLPWC7A6TqBV9guGW7Y0Enq2vy2FFnceR+6uuOilNf8r/Y45a6MHWNcFHY4BAhip8lMjyaR8DRvDfZdHJJzsqjMxGhgakDxP51Io8AkgDc1u+H4AWLBUDvlSTpPegwPjVWrx4cMEorkt0k8uaTbfCMbi/Z1rQuWrL3raoqs7C6OzaQdWzMirsJAzfQnC38GMxzMCeZr0L2vwBvXzaDsWFtblxywFu0uZs7XByAQKFAEnMdTGuBxdoI7ICSAYBIgx4idD4VlmnRs6UU+KUV648bYyK7FOilFQFjIrsU6KUUBY2KUU6KUUBY2KUU6KUUBY2KUU6KUUBY2KUU6KUUBY2KUU+K5FAWcilFdilFFhY2KUU+KUUWFjIpRT4rkVFhY2K5FPiuRRZNkOKcqpIEmNB1Ow+dUnFrDKFW3GY5MxA7zOJG0bSSZJ3B51oStVeNc2lZye85ygjddpAMaEw3qw6Vw6yG6Nt8f0aWhyU6XX+zLY+12b5QcxXckaM32vODp6UPdidNoHIDkBsNPzzpYhtSBETI8iZGvgKN4Vg87kxKLObx07oA8SI8prBUXOe1dzcvbG2F8E4OHJuXBoDAXmTAMnwgjTnWnVY0FQlMrgj3W0PhuVPxJX1XpRUV6HTYY4o0uvnyef1WeWSV3x2+BkU1hUkUiNvzyrpbORMK4FbzYi2D1J+ALD6Vu2bKjMdgGP1rE8AX/AMTa82/oajeN8XV2NvOFtKddY7Qz8wP79KwvU3WRP4N/0x3if5lR7Y8RDW8tsR2jjM47puMoJJP/AKcbz0TaKwF4zB6qp+VX3tLxJWt5VI7x7MeFtCGJA5Zmy68woqmuoSduSjQaaKBp4Vmxb7mj3NvDLv3h8x6c6eCCJGtSgUx7PMGD16+Y51tYdbKHEuV/Jj6j06MuYcP+DkUormePeEePL+3rUkVp480Jq4uzGy4Z43UlQyKUU6KUU9lVjYpRTopRRYWNiuxXYpRRYWciuRTopRRYWNiuxXYpRRYWKKd2R3iuoNZjbX4a0JNx3PehZE7RHQQJJ13Pwrh1epni4grZ26TTRypuTpBLIdPGhbWLUsEIhoHPWeYj0PlApDEm2ZYSNB1kDw2kE+s8tar+ORcPbWG1RSGETPWCNJEkePrWLm9SyTnGStNcNdjVxenwjGSfKfQuI1y85IAkTNOZCP7a1UYDBXCA73CpgASASD/vqDodKs1DrCnUNrmB0nLue7uek6/Ku6Gu1G+O6P0v9zlnocO11LlDorkU6KUVs2Y9jYpRTopRQFjapOOuBlzExDGAO8xzW4gnRdSNSCPCr0rVDxzDs4JE5AuusZmzkqoEbmQddBXJrb9tpGh6dXu2Y/E3czGBAk6ST8zqfOtb7N2MtlTGrNJ8VnT6f+6qg8MGVFZv1jRMDS2gXMSw59zvdSTpsZ1PCVU2ly+6CwHPZyN+e2/hWbocb9234NX1DIo4ePIQyzToqQLXHYDetzhHnU2+ENy1X8QxDIPd5iI7x+Gn1qS7iJMKTy1iYJ2/CKnS8IzNA6k7ehPT861zTyRmnFOvk7sWCWNqUlfwVHAeKst2C/dVHZCdG9yIPiAWMneNKL4vf7S1ktqxOpnKCF0JEyJmI1G0zrpC4vgxAuIe8Do0FiDvtzECqG3i3nuvoSFy6QdT9oj7U8oPKsTVQmpJSd1/Ru6ecJRuKq/7K9GDMpcyoIJB5gQI31JG/lRL45gT2fdWdBI8hy6AUHiSMxMR4dJ1rlsmP965S49MXXz6V3LXLN5H5jyOh/PlUht9D6H8a6xKIstR9lHu6eHL4cvSiPPT89a6EqYzcXcXTEnjjNVJWgcPyOh+R8j+TT4pXBUYkbH0Oo9OY+nhWhh13aa/Uyc/pffE/wBGSRXIriXBz0+Y+P4xRAtTtrPSu5ZoNWmZUtPli6cWQhaie8oMa6bxrpMT5UrzgvGeAolgNZ1O4I20oPGvCaASYbOIAAHezsdRpkHI1hav1WW/Zi4+fJs6X0yO3dl5fjwGC6NdTpAIgmCdpgRz/MVJFUzs1whrYm3BOrEAQQBqDJ0kSTyJ5ijFtC2yvlacpnKSQT72vM6bEiKjF6xki/rSf5dR8vpMGvpbTDYpRVZZ4yjQWnKx0IWAoge96mJ8elWqitrTaqOeNr9jH1OmnglUv3HWlJIiocRi0ttAglpO8zy1jr99GIgjUxM/Ab7b+XiBVZZP6y67KFC5cpIjSCSxPy8IHKsjX6iU8/tRdJLl/wDhqaHDtwb5K7fCIbt+52ctbDKwBE7+Unn06GYmqe05t3GS3mObKUgA6Hva+I0q0xGOe5aZzPZ/ZCSpckx55TPISYG3OXhmADWxcue66Nl7xBg3DMkQTqI57eNZ8oRtJvj54NVS+ltL/ZNh0YgNcAIgyAfd2E7xtPlvPMPxCFAWJ7qnuAuASdiIaCTA28NjQ/Dblssi2y0EtHvDN3QxBiA2mgmdvicASHRhqSGWQIkLBgjnIPxpYyjLMkm0/l9xWnGD3U1+XYjs3AwBggwJB0PwqSKbat5RlHw+cUdZ4bef3bNwjrlIHxOlerhNRgnJ0eXy43LI1BWvgCiuxUl62UYIyNJEgQdR1EctvjVbjMUbUFpKsrDMBOomJA2NcmT1PBCW27OmHpmeSt8B2Wg8VZkppIDliOhALBvRlA/mNW2KQIVQFSxk6GQqyQSTsBoIPjVd+lBwwVtgVzBRlkiCJO55/kTz6j1TB91W2dGm9PzRlubpFFw92CvmRgQCsn7Cu0hj1hhaX48qsuGGMiRE2keOhZjmHxK1b4bBW71u+cyg9mYBDDMUytlAMEe6fQz0m3u+yPZnDlrhE5bbtk90MpYTrr+sRF/npdPqYR+qzt1Onnkhtr/OxRAUNiLAPeZjlXXKCVH8xGpra472PVEJF1yeUKNT89PX41UXfZy2EHaYgqx2BI0OsFiRHMaeIroya/E1S5OTTemZYyuToymIv2lIUZ5J5EnTbYn8dvOoW4kFEK2mvccEcv3o3Mztz8xWiscKslot9u7HdwmhAJ3YIVAy6kk8yDG9Ef8ALLSwtw3Iyg97Kdo6EfukE8pESNuJ6q/j9DTWn4rr+pnbWIDglGgGSVLZknnBEmJkdN4qm4lw5mOa3bYLOgJljr5+7sN9YreMMDbYBLKsSc022fYM594kgnJDHWNSOlXlnheHZQUtq5I/ZkxcBGhyScpIg/EzO1LPNCcaaY0cUov6aPFMauZVc6E6Ea9SJgjbSPya0XCuAl7NtsiElZJMTqSw5fulatfbb9F7Ii1bALMxBylYZWUNAjSVPuyYyc5mpODcat27NtTcAORJETHcUCOgIAMeNcu6nwXbfJSpiQeY+NF2cc67HTodRWUxNi5bW22YN2gJgalSADBjwYGhTinHMin3URR6JZ4ov2gR5aj8frT8ZfPZu1kgsASANfitedpjrn77R5mjcNjrpkhzpHQ7z1qN9hRsVxU+9E/D5VJnB61jb+JuPE3G06d3+mK4mKurs5+R+Zp1k8ojb8m1Rh1pyCNVJBPMGP7H1rIJxe8Oh8wfxohOPXBvbB9Y+6h5E+pGxmgbBkyc2ad53iNpjUedDYlbpkRC7Ce8BynQjl486dwviLXQSEiCBv4TVkl0CS0jyE/SuaWDE3a4Y63GYuYx2LW8tsx3s7ghNJmSZg79Y5RUd6w95c5vIJhrY7QkbwTtoVmN56ydtcbaN0J8NG+I1oG9wS2SzZBLCO8A4HkDtUey10J/Mr3Csgzg3CAphMzDUQBtHumd9N6M4Rju0lSAI93vSSu3eXk3X6V25hbwko6tOwPdC8oEDQATpPT0ruF4HEdoq3GyqhkO0MYmCA28kMxro0c8mHJdcHJq8Mc2NpmpFoMuU6g1DjcKHhWYEtKKNRyJknmdDPgasLVsEaQfLWhcfkzIhJBBmRy7pk+UfU12+pLHsc/xdDg9PeRSUOxTcdUgRbYKiAiDABgAhYA3gbb6CosDxG5cRFMALZBOuijtDMAnQECpeJqjN2du3nbNLTruJ0YjQ7DTb5ULjrGVYIgkW1EQdC1ydOY7w+PKsOU/c5ZtxjtVILsjN79zKighbaxnEiDEfwj4Gd5NocRPZvlmMuZCNC0AHcgDUzy5zppWVwuDRXFsu7ZmRGJVlyMSZJB97Q6ec6Vq+HYUvct2GMSMuxPeB96OWYiI0gH4Llle3aub692LGNXbPSuGXsP2Ye12Sqf3co18xU74q3ctOUdWWGBZWmNNe8OYryu2b1oLnaGCuisAh1RgXVZB7ubXafuNXiF1cALdtYfNcMEQCvdnKCMsw2g0+O/T7jb56jqCS4NBY49h7CMnaZrhmWynNyC/ZIOnXx3rEcRxfbh+0RSFYfrFDDNqTOWNl01gGZ3ovG4O3hrC3H1ukasT3ZOpgecAc6qXwrG0rTcYJnV1twVzEBmDA6FtToP3j1qjI26QEGHe3eSC7KIysoHeMHuBQTH2oA2o3BXjaGVbtlFG1tktuRJgAtvMA7/aPOKC9nrFz9Mt2xbmXGaYB0DyCJg7H41pv+Ifs4ttGxNtABPeAUaajU9QIEDl3utCxvrZNUOtcYWybeewCrSS9s7mBtJETMabiBzmtB/+Y22UAWbhjL9pRqDI5nmKxuA4fee2HNllKkhoykGFMd2dQFEjyr1DhVplQBgBEARyA035+dWQUlwwRjMf/wAQyRcRMKQwJXvXkEkSNhrEjUGDQPDuODs874SCZBLXQxbTUyq7b6A6D1kfjHBsd210IFCFrjgm4FVVzyC5nQwRpvTMFhEsWwcXezsxBCrdDqYYOuUTvOkeJq34AXFP+IVwWyliwiqTGbUjXYDQTz6VlBxK5duC5dtpcclQO0Nw85gAaTP551puLYO7i7aW7NvIAVZQzHQDtCS2UQp7y7A7gT1quHezV579tUe0zWirXGVmKpqpgtl97XYwd+WtD4INLYs4tUBGHRVLAhimWJ5S5HInzmqbivtXiTca1cWzAGhFqXBK5pJLAcydPCa13FcYgRFBBug5ssFm0RwwzHxWdIgHnNZXC+zDYq5cZLiksinMwZplYJBJgiQRp5VCfckyfGuMXLqBbjAgEH3Ap0kDNuTC6BjqREzAoLD4sBY0+B/Gm+0eFbD37lgmezIEgGNVDaA7b1UD871PUijVcZxOWyoAgplWYElhmttmP8Ijrt6Zu5ic0lpJPP5VY4rM1uZ0z+XvTEaRMSTz18a7h7iZVV1WImYlo01nmDrCnnTTdsW6BcJdRRqA8ysMCQJ+1odxyNTYFQM0HmPvpY/BBbVu4BBY5SsCNJKnTmRRb4Jbaoyvm7QZiOamBIOvj0FRD7xEnwcmnVGDTlNXiEkV0LSRCzBVEk6ADWTWn4nwgpg+0NtVZXgkLDEB3QaxMAAT10J61DSGRz2ZQdm/8f8ApFXSWFIEgc/qapvZk/qm/wC4f6Uq7tNoPzzpNibY26kRthOhP1+tc7FxsakF4+FSG4QCSNh1o2+Cb8grluaz5VwOOeYek0UuJ27p2B015T0pYpRpp1+6ouSXAUn1B1KE6MpPnr8DrUPEsMGtlgSrDWRM6b7c4J+NZj/n91bjKIgFgNOU/wBqtcDxd3V+0UFQNSsyAZknXYb8tqXI90CKphuItvbtAIuoCk6knrqdz6nWD1qux91Qilt8llj1EhufUE/nSjeIYh0tqwGZmYM0E6S0KZ56Mu069aq/ah7hu20g5TYtSYJAOVufIzlrixQbux0ywfjFqAIzZGgsQAQJgNv3oJ38D51p/Za9bNvtRbN2/wBo6DKZYGfehiI06TuPIeXcLw7vfC3FZRqCDroATBPMdfXrXoHDmcHs17RbebKxQ97KNWaQJ5dee1NSgyLsL4rxY2e4zXUWSxzIFa2TczAqRMyWOwgx60XifaNLyKvZSMsBi8uJUqDqNYkn86ZviVvMCMqgTvB11hVAMzEj1PWKbYwlxraqQUP+UkHVT5CZOnKk9yS5TJpgntRjWZ7Vvvfq1Ud6JZpgbaZo+YPkLi3xFLeEtW0XtGV3N3u6Mc+hy/vFY+GvKq2zYVla5c1dXuKV3APZQCNeRJ0/xE0Xdw9pSiT+sYggL3VRdQQQJmTB32jpUyn4A7Y4zatY1rlu2hW5btMmcEZHgg5eahlYH5c69DXiOfBPeuWw4ynMiEd7XKQM5jnzNeZYLhIa6vdNwORmVWIYsQ0a8oULHlWjXh95bUWn7RLsyqHLqsEnIToZ1I+gp4zkuepIfb9qbNtU7OzLZZ7zpoBrDFCZYZo06mq1/aS+FjtCFBiRE94zofAbelZril66hZO0MroyBpjfVmmCJB2nbrpULAgpbAJ+3Bkzo0AEA6QNttfCaqyZJtquAot+KcRKKzTJjZnzMBqRn23JPxrK4m+CyXCRlMnaMp55R0EgT5nQ1Y415NzMciuqOYzRsCdY3iN+pqvw+Aa9dtIw1NxVCBBAzNMZiQNgdNdqnHw+erCSDMZxW8ltbdu4yi5sC0sZnWd192Zndp0M1ocBxm3ZsC3btMZ3u5icz5iS06STpz5DoKq+LcHNq89u3CgBMpYdocuUGIO+pPMRQmLxmRe8FYgZdFMknnDSBPQnTrTSnJukyOnUcls3cQ7AlVI7zEmApIkEqNJlRPKB51qTiXtu9u2UVOzyG6vadoIkqsJIADGd5g+tUeAtL3CYACljzJOaDy69fxqzIzwls5QI678yeZEUvvOPCJopuLcFsXHZjAYpklc0sQB+scvqzzOpPe5156117ZKcwSD5gwfpXp7YWdwTznMfHnHnpXnHFrcX7oj/AMxvmZ++rNPkm7tkE1zFBQBlMEK250MEHYzvz5+lOZVZV0y6LudCCNpOx+XlUGJOpAzbD7WuhI5xy/2o4GAgOqkWyy7nQzvuTHLnNdvYrCuJ2USyWW20MUIkkASjKPdYrmDMNOnMSZrUuZu9pJiRJJEALqTzMT60ZxDKFK2wzqW1WCMohYA7x5gHbz6UKuGIkgHUloIIYCBy5+Y+VRCLuwlVHZp6tUE10NVgtBAarHiL/q8MOlpiPCb941Uh6seKtC4f/sL87t0/fUkF77OtFk+Lt9Fq1S6I/PWsThvaLsE7Ps82pMzA19KmX2sJ2tgDfUz6cq5c0pr7nUuht/EbMXh1qQXB108aw59rW/6a/P8AGut7T5tCgpI5s/4kglGHY2jYpBznyrq4gPtyrBt7Skf+XPXvf2qdfaopOW2Nerf2q3fJvkrW6zt3DqLjgH98yYn116/ShHxjoGXORmEFcu/hqPH50dhsf213tskQArLI8NRtMwelEOidndgR3SQDpAgkxr99EIu7LZNVwcv8UuqAofuxAlRtyGo1ERV/xBDcuMhdVBHumCWKW1Y5eekqemhqvZO0RJgQgUaTvlI5cqtsTb/8Y507huiIPO0sx8B8KTZOLdlilCSVFTg79y5L3P3WB7kDQw0ETrrzj3aOxOMRbqAzJA+yIAIOsz4g6VDhhcmTcBBmQFI3AUz3v8M03ieDDNmZtlKn1GWfn8qScJOLsmPtuXwcvY5lzloKW8ozjMDIdF2JPPxju6b0Re4tb0ZC5UDs17RFHehSYAbw3J8t9VgsGezdCc5LW+8VAEkvI3O8amqTGcNuW1YrLqLrMMqHmtsiInrG/wBmq1j4IaXY0GJxiL9gM2QKermCZ/M0bg8RYTEJca2f1dtldQR3pMhxI312+dZXEWzbe1acyXFzrvLJz6AKPIVLiLoy2iBB7PUzuc7a1XHG41TJ2db7GxPH8MSqIjg2bgvOMqz2bN3VnrDqPSrfE8NCFr9zMFU32RA2RYNvNB3jQN55dq85Sye2xDOpyGzZB0MEFbRIEeXI863GP49cvWns3EyvuDEFSCZECeWYE8h1q5ySkkyNt8oq7HZDKWW0TbkIpuDJse8wykscxnvTEAcqF9oclkW1tAO6DOQFfM7tmOZxHeGWQBsJM1YcR9lOIQptugABzDPqdoiV/CiuNWGBMgF1VVIS3IEINHcHTnAnQEHnNE6SFMTheLPcQMzLlRo7MRLTDIokZswkCJPuxUns9xhn7V0cW2s2mKLEdpLNEXAQQ36xuR2AoVDksXEyFWk94bbyxJOzZQSOWhojB8GSLbqGc3GB94Ddgee5MxXOsyi7a6ukFNmv4nbBTOb3aXQdUYaxIywQIEb8vnWbxVkMCWgCZIzSOR3K9Qa9GxXDmfCXBYUG64UhWfukhlIJP2dF5VjuIezPEblsq9u0pzCMjzO0GS2mvga6JYtzuyABEVSRmknKCCNVif8AeacMTcDBdCNTJgTygwOVCYvAtau2rjltDF0aEShGZk/ehgwI+k1NfTtSXwym5IKJJCqDuQQY7w123iqVipc8seXRUSG92rC2FNxj4wi+QX7vxrNe1fs/dTFOLUEaZtVEPEMI5bTHjWi4RwbHWrqXriIEUyIcGJUoGNtSc+sTIPPyozieOHaEZCYAEm2wJgQZ11MzrV0KiuRNpjCi6acvxqJiVMiIA2NOZtB6ffTC9a7imcG9oIRwdiW8ANvLU1JJEwPms/SaBU85NEWb8gAgAwZJE0ji4lkZqQryIxlgJgcyOQ3jnNBPhTqQD4DKfqas8k7Fthoojl1qO4ijVsv8xn6UjHRUOCu/1FH8Yf8AY+GHtfQn76Vxh/i8woQf5op1/h1y4FNtVYBQJzSec6jQ71FeCbM3ipza1y20VeN7OXDqxjyGapcP7NgmMzseir/vVbhJj7lRni1IPWvX2aA0Fm8T/wBp2HyQ0ZY4C4EjDv8A/wAbg+tRs+Qsp+AJaYFb1qXmQSjEMDGmmgg8zyNcbhtou6hT3XIjK503B0MRV9/yK4ZHZXgCIKi20EePdoi37PXSZNpyTzYb/ECabavgCrwPZ2iqjLDNlaVYHUMVkluojXrVi7WtiBJkDQ7x1iPjRy+zF14m2Bz7xX6amjrfsm8CRa05ZifkFipUorwG1mewjOCqkqRIG+vT86VoOyuNjbpAHZh3DEDY9kBq2w5VqLWCtqBKgQJIQ5RPkFFV1oqFxLFRmF0nNmOkrbEQDrsaqlkssjBIpsBwDENDllUGGEsNuXdWfnVtiOCIFJuMhnebS+X2qLt2F7JXS2pUWkJIdiwJAHu5gI57igcNxRHZkuI3vG3kh1ZiROxYgAzpmInXbeq5Tt8jKFLgIt4ayqgCYzqTAtj3VYLHdjcjeeW1dtcOtyUAtsCxZVIQclkEBIPunXpHSsbjeGW7b3cnuW2RuzuSQCUa5kfKRr3QkjrV/cvYhVV7ly2qsB7i3CRPqwHrG1KuSegavs7bzozWlJRWEgr7xg91ihIHvDUEmRUY9n9QFdEABAWVkayBmFsE/fPKgsJjDddkTFXiVEmAIGsRy10Pwp957qmP0q6D0i2xPoGJporwyJc9QnFcLyOzN7txrSb5iVUoNRoNh4Tzq1fhrM0m57oypmtg6Hcd25p8D6Vnrt+5kYvdvPAkZgq6yPdhdG8daY/Eb3713Q7XGtj1zFYo2Wwukbe298HXFIV1J/Vd7yAy9fGspxDhdy9d7R3uAlVDAqVWcqgkOFHQyPLypicfuIoPZ5F2lzoT4Qn0qb/m2JYiOyAOxBn+rL8xQ4eRXT6Db/Dd0lVU6Npcg+fc1855mh14LlVRavWVYbE3SD5AFRpJPy6VZNiMUR+ra03M5igj0Rj84qN+JOIFy9aU84tl/iBcn5Ck+zw8fyTufn+A7D3sbbIW21u4pW3/AItRbQMQZ0UkEjzmNakHEuI5TNpNjujzHmhyg+tAY3iCgA9phn0UEsCNcoBOhJieUetFYYK6gsiCRMhHykdQWAFS8dd2C5MhieH3jcc3mlGBhe8Ib3t2Xr4613hFjscyo2pg90uSIPKUEnzmtshttITluO9+Ip/ZDZj83H+o0rx33GKlvaG9lKuhIJB1VlOhkQQNKzxNkEyb4JJMSeev/TP1rY3bdsfvD1b8aBONjTs3PjLa/Oq/ZflkWeQPefbTYcvCmZn6j4UUbf3VzJXovZMn3QaX6ikS3ODROSkEo9oPdB7d64oygCPX8aJt8RKxNpTHOTPxNcK03JS+wkP7zCW4srKVZGWRErrHiKGtCDmtuwPWdfWkLc77UjaiDUrFTB5LXBZ4HiLhouguuwgwZ5TyirS17RLh2lLTqdpmZHqI3rOpcK+NE/pAYKDprzHrRLBGQnvzi+hrbftsCJK2zPqR5gGrfC+0yu2TKuYgHcqCOUSNaxtvhpuMyoUJ0kTA+dG3cFZNsK1spdX3iFABI2OYaiqXpEC9Qa7GnxHtNbtnK9y2p8cxPzgVJa9prLam5/8AGB/WTXnGLs2yCI7wJggmSOUzVacP4n40j0lF8NZu7HsKcesE6PtE6E/QVOuKtXDIuXB5M6gfICvJMLbJUnO2Y9ADPnI6UX2NzQrdaeWi6CNPs9PpS/Y32JeugnTPVLbKJy3CSQYLvnA02iRQHCsNcQ3ZyqrMG7ydrJiDqGB+yKwVsXvs3WMf4Fj4lausIMURrcf0S39MtL9in5RD9RxLz+xrrrlkK5SDEEgKimdzlzTt1mqjH2c2UG7aSGJY9pqe6FEQPD5eJqq4hw6/Hfukg6/s0+4VjOIcNKMQDM67RFH2F9WEPUYSe2P8qjVjhyKGX9NXUgki05mMuUE5oMQQNNJNWNvFWEtvbOIe52igE3O00g/ZAWAN9q8yuYdgSJqPsG61D0pctQbfhtu3aBZsSBcaJZBcgxJ17ykkknc1e2fafD21hmVz1yoPjmuEmvKxh260/wDRj1NT9m4oh6heT0nH+1WGuKFZdp1FxQdfJWmh7/tnb5BZ8TcP9GQVgFw/jUy4YdKZadeBJak1d32z1lVAPVbaz8WJNCXfa682gLx/GR8liqRbSjpTxFWLAiqWpl2C7nGbz8h6yT8yai/SbrbufTT6VHm8K6HPWrVhRTLNNheEcW7i3H7wUgkEZgR4jnWhPtc7EJbtrPI5SYG2gJMD4VQcPw7s6MFLKHHPoRyBBHnWivWo90RJ092ddp5jTqfWqM0Ip9C/DknT5GDjOLJh7gA6Kon51M+JuAw964T/ABDb0G9QYrAOYOnjE6fEGfj61LdssoEhiRHIQfKQRVH5FzjfW/3DLFrN71y6OnfIkc5GtcfCLP7S58z84H0rhMZSBlflCGNueRTHyqb9MVO6RJG5JsAz5Nr8ai5didkP8sxAKEDM0nwFQsV5VDPhXQa3NxlUPYim1yuR5VFjJHctNA5U/TrXVidATQFnUWDqJ9dqnuLmGojc71yyhbQLr8TTwo15QT/bbTrtUOiLYOLP5/Irpt0QoHP8/WnBJqeCtzZPhZmQQJ3Ef3FSYlARuxjpHw0NcwUBtR4bA1bPhpEyY5TU1Zy5J7JWzLm2wmCddN99Z5+VQdg3jWju4eBuPKg2uMNjHzqPbLoahvoDYRnQDQSDIJFWGEuQQXtggGRoQJ8dajXFsOX/ALa5+mv1A57AUbKFlKUuxp7HEFyz2NvzBYGfINtVlh+MQulpIHViv1rCnEOTIc+h09BR1vGkDVu9v3k+9ZpXGL6iKM49GafHcULiDbUfzafGsfx9VcgrCmIIkmanv4mRJyT4Bl/01V4gsTrHpUqMa4RMN++2yta0egpnZnwqx7A7yf8AKT9K7+iGOZ9CP9NR7Z2LIVotnwruQ9flRwwj8wB/Ecv1qZ8CVgM9sE/+on/2n1il2xG3PwVmTxruSrK5gMpKs4VgYKnXWdRI51bHhJtkaKQRILLOnIiHYA76a0jSRK3MzKpOgEnpROHwFy42VUbxOVoHiYBPyrStYCgFjaJIJ0YGY0mTbHyqLtpgG42XYruImfdKED0IpW+OBlDyBPwRQurXAf3ioyj039ZpJg3tp3LmjSdSuQkdSwyD/MT4U98SlppS4RBMGQs+hn4RTbvtCCNi55kKzg+MOSvw08KqnP5Lo42+1BicOy5GZCG0YOrLz37ocAHfYHepb6i2wzJm3Ia4pk+G4kbbjnVHd4pef3bUctSqD/KnlUeW+wkui+CjN8STNUv6ixY6NLa4iF95VWBtbOWddgQpHj0oTE8ctz3V15gsbjT/ACx86zN8ie+M8bnM2Ufyk60fh3WYUKDGwBHppymq6VlyXAY2NuN7qEAj7RgRoYgSTtMGo8j/APU+C6UwOYIETz306cqjzfvb+ZpuEBU5vOkrVwn0rpPSfOtLcZ1DwfLzpwPr6VHP+KadmJ2Hy/GmUhWh3lpT1P5/30qJW6/CakAJM8vz1pl8EMmsgg6yNzp89PSnqDsII20Hy60xJ0ghRrrz+mlPZu7udI3n76ihWdDEfhH9qkk+Xqaitt+fz51Ir9d/OmtFbi+yHq0bEx51a4fHIFyvPTafvFU5bxrmf86Ub4+RJ4JT6phuIuKfdB9RHyk1Fm8h1OlDtd8QPUCo2xSA++s/xA0e7Bdxo6addA7LI0imZdNR4aTQr8RWYn0Ct91M/TJ2S4fK23l9qolqMfkaOlyeApJ6E+G/1ohXaIDhRJBBbfrz28qATE3Ae7budJ7o++pUF5vshRvq5PyA++qXnj2RetLLuwq5MSSpB2CsCZ695iR9Kiyo0gwOhYGfLTT51C2GuR+0QeOUkf1fdQ2JwtxVLm7MCYCgT1E70ktT8FkNIl3LG2Qogsx6ZZEeBU/jSN1VGoXedQo+Lb1S2cUrgyjkjoSR8TFONuyDqACY0g9Op5+VUvVNrguWminyW1vi9tG/aKREFOTTpsh+Y1qK7i2Yhgbra7Q0nkAdQfjQ1iwiyAB6KPDw1otMQOhkeBg+kRVfvSbvoWLFFKiU8UvXNQjGJX3guxIidyNOc1F2mIYAFFUDYM5aPILTMFeEENpD3NxtqT6UWLqzAIJ6b+VSptrlk7UuiB/0W6feu5fBUH1JNdPDlPvu7dZc/IA0Uz/mPp4V0Ebf7VNIAe3w+0uyLOnKfnRAQCI0rjPllm2HpA9agu4pCp7w8wfntM0XFBTZK7iSCYOp5RHOPp6jrQN3iKoGDakbQN/Hw5es0LicWrJvDLqGA5xvHTw8T51XqjmTqSskjn/iBHMRqD4VVPL/ANR1HyMvvmHSTy5cjpSwWIIMXMx3jWCI8d+Z+FMvJoCDIb5MBI+K6elNvNs09CfmrR4QQfhXOxkye3i8odtwGG+8ECNfQ0WmN8+X0FV+BUEujiRAjlsxE/AmupdifM1FE7mg5N6dc2pUq2kZXc4tObalSpl0IfU6nKuXt6VKm7EdyUcqkpUqql1LonX3rjUqVIMOO1VmMrlKkfQsXUqrnP8APStFwD3V8vuFKlXP+Iv/AAlm3uepp6+8fT6GlSpxUSN+fjUie76/eaVKmFK7iu4oBfcufwt9K7Srnn1ZfHoh2F//AF28m+lVXGfs+TfRaVKlf3EC+8FYf3h/N/pq4HuilSpl0Il1A8N9v+NvqtWA5+ldpVCDsSc/T8akPLzFKlVyKwLG+4/kP6qz6e8nkK7SrnydS2HYJt+8PI/6qkwP7dv4T/SKVKlXQH1ZWH9mfNf62oY8/wDt/ctKlUMIhGB/afyH7qFv7+grtKlIfU//2Q==",
      property_Id: propertyBase.id,
    },
  });

  return propertyBase;
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
