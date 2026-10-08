const urls = [
  '/', '/projects', '/projects/1', '/about', '/skills', '/experience', '/blog', '/contact'
];

async function check() {
  for (const u of urls) {
    try {
      const res = await fetch('http://localhost:3000' + u);
      console.log(`${u} : ${res.status}`);
    } catch (e) {
      console.log(`${u} : ERROR ${e.message}`);
    }
  }
}
check();
