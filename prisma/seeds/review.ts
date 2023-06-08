import { fakerID_ID as faker } from "@faker-js/faker";

const numberOfUsers = 20;

export const reviewUserData = Array.from({ length: numberOfUsers }).map(() => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: "$2a$10$ljjcc.s0It0TusIJIWahgOsVhHA0gqjmRMo17DHJptv9pFXHKnjTa", // "password
  phoneNumber: faker.phone.number(),
  address: faker.location.streetAddress(),
}));

export const reviewData = Array.from({ length: numberOfUsers * 4 }).map(() => ({
  rating: faker.number.int({ min: 1, max: 5 }),
  comment: faker.lorem.paragraph(),
}));
