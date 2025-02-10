import { PrismaClient } from "@prisma/client";
const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "IT" },
                { name: "Islam" },
                { name: "Software Engineering" },
                { name: "Engineering" },
                { name: "Robot Technik" },
                { name: "Technologies" },
            ],
        });
        console.log('Successfully created the database');
    } catch (error) {
        console.log('Error seeding the database categories', error);
    } finally {
        await database.$disconnect();
    }
}
main();