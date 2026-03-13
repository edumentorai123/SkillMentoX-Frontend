const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\hp\\Desktop\\EdumentorAi\\SkillMentoX-Frontend\\app\\Admin\\AdminDashBord.tsx', 'utf8');

function checkBalance(str) {
    let stack = [];
    let pairs = { '{': '}', '(': ')', '[': ']' };
    let line = 1;
    let col = 1;
    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        if (pairs[char]) {
            stack.push({ char, line, col });
        } else if (Object.values(pairs).includes(char)) {
            if (stack.length === 0) {
                console.log(`Extra ${char} at line ${line}, col ${col}`);
                return;
            }
            let last = stack.pop();
            if (pairs[last.char] !== char) {
                console.log(`Mismatch: ${last.char} at l${last.line}:c${last.col} closed by ${char} at l${line}:c${col}`);
                return;
            }
        }
        if (char === '\n') {
            line++;
            col = 1;
        } else {
            col++;
        }
    }
    if (stack.length > 0) {
        stack.forEach(s => console.log(`Unclosed ${s.char} at line ${s.line}, col ${col}`));
    } else {
        console.log('Balanced!');
    }
}

checkBalance(content);
