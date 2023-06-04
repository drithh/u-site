import { PrismaClient } from "@prisma/client";
import {
  organizationData,
  organizationUserData,
  createOrganizationMember,
  createOrganizationAchievement,
  createOrganizationWorkProgram,
} from "./organization";
import { reviewUserData, reviewData } from "./review";

const prisma = new PrismaClient();

async function main() {
  // drop all data
  await prisma.achievement.deleteMany();
  await prisma.workProgram.deleteMany();
  await prisma.member.deleteMany();
  await prisma.review.deleteMany();
  await prisma.user.deleteMany();
  await prisma.organization.deleteMany();

  await prisma.organization.createMany({
    data: organizationData,
  });

  const organizationId = await prisma.organization.findMany({
    select: {
      id: true,
    },
  });

  await prisma.user.createMany({
    data: organizationUserData.map((user, index) => {
      return {
        ...user,
        organizationId: organizationId[index]?.id,
      };
    }),
  });

  await prisma.user.createMany({
    data: reviewUserData,
  });

  const userId = await prisma.user.findMany({
    select: {
      id: true,
    },
  });

  const userLength = userId.length;

  await prisma.review.createMany({
    data: reviewData.map((review, index) => {
      const randomUserId = Math.floor(Math.random() * userLength);
      return {
        ...review,
        createdById: userId[randomUserId]?.id ?? "",
        organizationId: organizationId[index % organizationId.length]?.id ?? "",
      };
    }),
  });

  await prisma.member.createMany({
    data: organizationId
      .map((organization) => {
        return createOrganizationMember(organization.id);
      })
      .flat(),
  });

  await prisma.achievement.createMany({
    data: organizationId
      .map((organization) => {
        return createOrganizationAchievement(organization.id);
      })
      .flat(),
  });

  await prisma.workProgram.createMany({
    data: organizationId
      .map((organization) => {
        return createOrganizationWorkProgram(organization.id);
      })
      .flat(),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
