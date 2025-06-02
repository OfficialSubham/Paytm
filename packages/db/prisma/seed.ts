import { prisma } from "../src/client";

async function main() {
  const alice = await prisma.user.upsert({
    where: {
      email: "subhamoffi@gmail.com"
    },
    update: {},
    create: {
      authType: "google",
      email: "subhamoffi@gmail.com",
      firstName: "Alicexxx",
      lastName: "mondal",
      password: "123456",
      Balance: {
        create: {
          amount: 20000,
          locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "12211",
          provider: "HDFC Bank"
        }
      }
    }
  })

  const bob = await prisma.user.upsert({
    where: {
      email: "myselfsubhamxd@gmail.com",
    },
    update: {},
    create: {
      authType: "google",
      email: "myselfsubhamxd@gmail.com",
      firstName: "Bob Subham",
      lastName: "oggy Mondal",
      password: "123456",
      Balance: {
        create: {
          amount: 20000,
          locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "12311",
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
