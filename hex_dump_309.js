const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\hp\\Desktop\\EdumentorAi\\SkillMentoX-Frontend\\app\\Admin\\AdminDashBord.tsx', 'utf8');
const lines = content.split('\n');
console.log(`Line 309: ${lines[308].split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ')}`);
