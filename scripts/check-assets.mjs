import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const publicDir = path.resolve('public');

async function check() {
  let missing = 0;
  
  function checkFile(dbPath) {
    if (!dbPath) return;
    const fullPath = path.join(publicDir, dbPath.startsWith('/') ? dbPath.slice(1) : dbPath);
    if (!fs.existsSync(fullPath)) {
      console.log('Missing:', dbPath);
      missing++;
    }
  }

  const projects = await prisma.project.findMany();
  projects.forEach(p => checkFile(p.imagePath));

  const certs = await prisma.certificate.findMany();
  certs.forEach(c => { checkFile(c.imagePath); checkFile(c.pdfPath); });

  const blogs = await prisma.blogPost.findMany();
  blogs.forEach(b => checkFile(b.imagePath));
  
  const works = await prisma.clientWork.findMany();
  works.forEach(w => { checkFile(w.thumbnailPath); checkFile(w.videoPath); });
  
  console.log('Missing references:', missing);
}
check().finally(() => prisma.$disconnect());
