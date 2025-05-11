import { prisma } from "../src/client";

async function main() {
  const alice = await prisma.user.upsert({
    where: {
      email: "subham@subham.com"
    },
    update: {},
    create: {
      authType: "credentials",
      email: "subham@subham.com",
      firstName: "Alice",
      lastName: "mondal",
      password: "123456",
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "122",
          provider: "HDFC Bank"
        }
      }
    }
  })

  const bob = await prisma.user.upsert({
    where: {
      email: "bob@bob.com",
    },
    update: {},
    create: {
      authType: "credentials",
      email: "bob@bob.com",
      firstName: "Bob",
      lastName: "oggy",
      password: "123456",
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "123",
          provider: "HDFC Bank"
        }
      }
    }
  })
  console.log({ alice, bob });
}

main().then(async () => {
  await prisma.$disconnect()
})
  .catch(async () => {
    await prisma.$disconnect();
    process.exit(1)

  })
