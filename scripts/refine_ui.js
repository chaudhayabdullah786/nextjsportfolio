const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;
    for (const [search, replace] of replacements) {
        content = content.replace(search, replace);
    }
    if (original !== content) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${filePath}`);
    }
}

// Fix AIAssistant Duplication
replaceInFile('src/app/page.tsx', [
    [/\s*<AIAssistant \/>/g, '']
]);

// FadeIn: Add useReducedMotion
replaceInFile('src/components/shared/FadeIn.tsx', [
    [/import { motion } from 'framer-motion';/, "import { motion, useReducedMotion } from 'framer-motion';"],
    [/const MotionTag = getMotionComponent\(as\);/, "const MotionTag = getMotionComponent(as);\n  const shouldReduceMotion = useReducedMotion();\n  const safeY = shouldReduceMotion ? 0 : y;\n  const safeX = shouldReduceMotion ? 0 : x;"],
    [/initial={{ opacity: 0, x, y }}/, "initial={{ opacity: 0, x: safeX, y: safeY }}"],
    [/whileInView={{ opacity: 1, x: 0, y: 0 }}/, "whileInView={{ opacity: 1, x: 0, y: 0 }}"]
]);

// Globals CSS updates for scale and spacing
let cssPath = 'src/app/globals.css';
if (fs.existsSync(cssPath)) {
    let css = fs.readFileSync(cssPath, 'utf-8');
    if (!css.includes('--section-padding')) {
        css += `
/* Refinement Overrides */
:root {
  --section-padding: clamp(64px, 10vw, 128px);
  --container-width: 1280px;
}
body { font-size: 16px; }
.heading-display { font-size: clamp(52px, 8vw, 76px) !important; }
.heading-2 { font-size: clamp(36px, 5vw, 48px) !important; }
.card-elevated { padding: 28px !important; border-radius: 24px; }
.text-xs { font-size: 13px !important; }
.text-sm { font-size: 15px !important; }
.container { max-width: var(--container-width) !important; padding-inline: clamp(24px, 5vw, 48px) !important; }
section { padding-block: var(--section-padding) !important; }
`;
        fs.writeFileSync(cssPath, css);
        console.log("Updated globals.css with refinement variables");
    }
}

// Hero refinement
replaceInFile('src/components/Hero.tsx', [
    [/min-h-\[92vh\]/, "min-h-[780px]"],
    [/pt-28 pb-16/, "pt-40 pb-24"],
    [/gap-6/, "gap-8"],
    [/max-w-\[380px\] sm:max-w-\[420px\]/, "max-w-[420px] sm:max-w-[480px]"],
    [/gap-4/, "gap-6"],
    [/text-base/, "text-lg"]
]);

console.log("Visual Refinement Script Completed.");
