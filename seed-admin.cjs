const { PrismaLibSql } = require("@prisma/adapter-libsql");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const path = require("path");

const adapter = new PrismaLibSql({
  url: "file:" + path.resolve(__dirname, "dev.db"),
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const existingUsers = await prisma.user.findMany();
  console.log("Existing users:", JSON.stringify(existingUsers, null, 2));

  // Delete all existing users and recreate with correct credentials
  await prisma.user.deleteMany();
  console.log("Cleared existing users.");

  const hashedPassword = await bcrypt.hash("9994526584", 10);
  const admin = await prisma.user.create({
    data: {
      email: "Netheshkumar.k", // stored in email field as the username
      name: "Netheshkumar.k",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("Admin user created:", admin);
}

main().then(() => {
  console.log("Done!");
  prisma.$disconnect();
}).catch((e) => {
  console.error(e);
  prisma.$disconnect();
});
