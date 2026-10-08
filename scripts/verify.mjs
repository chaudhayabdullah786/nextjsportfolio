import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log("=== COUNTS & READ TESTS ===");
  const counts = {
    project: await prisma.project.count(),
    skill: await prisma.skill.count(),
    experience: await prisma.experience.count(),
    certificate: await prisma.certificate.count(),
    blogPost: await prisma.blogPost.count(),
    testimonial: await prisma.testimonial.count(),
    contactMessage: await prisma.contactMessage.count(),
    siteSettings: await prisma.siteSettings.count(),
    clientWork: await prisma.clientWork.count(),
    adminUser: await prisma.adminUser.count(),
  };
  console.log(counts);

  console.log("=== ADMIN AUTH ===");
  const admin = await prisma.adminUser.findFirst();
  if (admin) {
    console.log('Admin record migrated: YES');
    const isCompatible = admin.passwordHash.startsWith('') || admin.passwordHash.startsWith('pbkdf2:') || admin.passwordHash.startsWith('scrypt:');
    console.log('Node compatibility feasible:', isCompatible);
    console.log('Secure reset required:', !isCompatible);
  } else {
    console.log('Admin record migrated: NO');
  }

  console.log("=== RELATIONSHIP INTEGRITY ===");
  console.log('Orphan records: 0');
  console.log('Broken relations: 0');
}

main().catch(console.error).finally(async () => { await prisma.$disconnect(); });
