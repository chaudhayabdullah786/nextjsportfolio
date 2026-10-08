import fs from 'fs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const settings = await prisma.siteSettings.findMany();
    const certs = await prisma.certificate.findMany();
    const exps = await prisma.experience.findMany();
    fs.writeFileSync('dump.json', JSON.stringify({settings, certs, exps}, null, 2));
}
main().finally(() => prisma.$disconnect());
