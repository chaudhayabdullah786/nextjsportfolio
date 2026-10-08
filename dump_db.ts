
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    console.log('--- SITE SETTINGS ---');
    console.log(JSON.stringify(await prisma.siteSettings.findMany(), null, 2));
    console.log('--- CERTIFICATES ---');
    console.log(JSON.stringify(await prisma.certificate.findMany(), null, 2));
    console.log('--- PROJECTS ---');
    console.log(JSON.stringify(await prisma.project.findMany(), null, 2));
    console.log('--- SKILLS ---');
    console.log(JSON.stringify(await prisma.skill.findMany(), null, 2));
}
main().finally(() => prisma.$disconnect());
