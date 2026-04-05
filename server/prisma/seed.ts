import { PrismaClient, Role } from './generated/prisma/client.js';
import prismaClient from "../src/lib/prisma.js";
import fs from 'fs/promises';
import path from 'path';
import 'dotenv/config';

const prisma: PrismaClient = prismaClient;

async function copySeedImage(filename: string) {
    const srcPath = path.join(process.cwd(), 'prisma/seed-images', filename);
    const destPath = path.join(process.cwd(), 'uploads', filename);

    await fs.mkdir(path.dirname(destPath), { recursive: true });

    await fs.copyFile(srcPath, destPath);
}

async function main() {
    console.log("🌱 Seeding database...");

    // 1. Create user
    const username = process.env.SEED_USER_USERNAME ?? "Göken 🐦"
    const userId = process.env.SEED_USER_ID ?? "b69e01cd-01d1-465e-adc5-99d017b7fd74"
    const userRole = process.env.SEED_USER_ROLE ?? Role.user
    
    const user = await prisma.user.upsert({
        where: { username: username },
        update: {},
        create: {
            id: userId,
            username: username,
            role: userRole,
        },
    });

    console.log("👤 User ready:", user.username);

    // 2. Create events
    const eventsData = [
        {
            name: "Ghibli-pub",
            date: new Date("2026-05-10T18:00:00Z"),
            imagePath: "pub.jpg",
            createdById: user.id,
        },
        {
            name: "Pluggfrukost",
            date: new Date("2026-06-20T15:00:00Z"),
            imagePath: "breakfast.png",
            createdById: user.id,
        },
        {
            name: "Vinvolly",
            date: new Date("2026-05-25T17:30:00Z"),
            imagePath: "vinvolley.png",
            createdById: user.id,
        },
        {
            name: "Kandidatmiddag",
            date: new Date("2026-05-18T12:00:00Z"),
            imagePath: "kandidatmiddag.png",
            createdById: user.id,
        },
        {
            name: "Spelkväll",
            date: new Date("2026-04-11T05:00:00Z"),
            imagePath: "gamenight.png",
            createdById: user.id,
        },
        {
            name: "Vinprovning",
            date: new Date("2026-06-05T19:00:00Z"),
            imagePath: "wine-tasting.png",
            createdById: user.id,
        },
    ]

    await prisma.event.createMany({
        data: eventsData,
    });

    console.log("✅ 6 events created");

    // 3. Copy images to uploads
    for (const e of eventsData) {
        await copySeedImage(e.imagePath);
    }

    console.log("✅ 6 seed images copied to uploads");

}

main()
.catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});