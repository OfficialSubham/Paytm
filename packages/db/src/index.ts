import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();

export { prisma };
export * from "../generated/prisma"