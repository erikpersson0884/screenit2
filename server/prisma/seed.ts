import { PrismaClient, Role } from './generated/prisma/client.js';
import prismaClient from "../src/lib/prisma.js";

const prisma: PrismaClient = prismaClient;


async function main() {
    console.log("🌱 Seeding database...");

    const user = await prisma.user.upsert({
        where: { username: "admin" },
        update: {},
        create: {
            id: "b69e01cd-01d1-465e-adc5-99d017b7fd74", 
            username: "Göken",
            role: Role.user,
        },
    });

    console.log("👤 User ready:", user.username);

    const eventsData = [
        {
            name: "Ghibli-pub",
            date: new Date("2026-05-10T18:00:00Z"),
            imagePath: "/uploads/tech.jpg",
            createdById: user.id,
        },
        {
            name: "Pluggfrukost",
            date: new Date("2026-06-20T15:00:00Z"),
            imagePath: "/uploads/music.jpg",
            createdById: user.id,
        },
        {
            name: "Vinvolly",
            date: new Date("2026-05-25T17:30:00Z"),
            imagePath: "/uploads/startup.jpg",
            createdById: user.id,
        },
        {
            name: "Kandidatmiddag",
            date: new Date("2026-05-18T12:00:00Z"),
            imagePath: "/uploads/art.jpg",
            createdById: user.id,
        },
        {
            name: "Spelkväll",
            date: new Date("2026-04-11T05:00:00Z"),
            imagePath: "/uploads/fitness.jpg",
            createdById: user.id,
        },
        {
            name: "Vinprovning",
            date: new Date("2026-06-05T19:00:00Z"),
            imagePath: "/uploads/food.jpg",
            createdById: user.id,
        },
    ]

    await prisma.event.createMany({
        data: eventsData,
    });

    console.log("✅ 6 events created");
}

main()
.catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});