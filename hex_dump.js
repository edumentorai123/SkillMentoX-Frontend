const fs = require('fs');
const buffer = fs.readFileSync('c:\\Users\\hp\\Desktop\\EdumentorAi\\SkillMentoX-Frontend\\app\\Admin\\AdminDashBord.tsx');
const content = buffer.toString('utf8');
const lines = content.split('\n');

console.log('--- Line 315-320 HEX ---');
for (let i = 314; i < Math.min(lines.length, 320); i++) {
    console.log(`Line ${i+1}: ${lines[i].split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ')}`);
}
