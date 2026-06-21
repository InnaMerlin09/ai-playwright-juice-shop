const { execSync } = require('child_process');
const fs = require('fs');

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';

let hasError = false;

function ok(message) {
    console.log(`${GREEN}✔${RESET} ${message}`);
}

function error(message) {
    hasError = true;
    console.log(`${RED}✘${RESET} ${message}`);
}

function check(title, callback) {

    process.stdout.write(`${CYAN}${title.padEnd(28, '.')} ${RESET}`);

    try {

        callback();

    } catch (e) {

        hasError = true;

    }

}

console.log('');
console.log('===================================================');
console.log('      AI PLAYWRIGHT JUICE SHOP - DOCTOR');
console.log('===================================================');
console.log('');

//
// Node
//

try {

    const version = process.version;

    ok(`Node.js ${version}`);

} catch {

    error('Node.js not found');

}

//
// npm
//

try {

    const version = execSync('npm -v').toString().trim();

    ok(`npm ${version}`);

} catch {

    error('npm not found');

}

//
// Docker
//

try {

    const version = execSync('docker --version').toString().trim();

    ok(version);

} catch {

    error('Docker is not installed');

}

//
// Docker Desktop running
//

try {

    execSync('docker info', { stdio: 'ignore' });

    ok('Docker Desktop is running');

} catch {

    error('Docker Desktop is NOT running');

}

//
// Docker Compose
//

try {

    execSync('docker compose version', { stdio: 'ignore' });

    ok('Docker Compose available');

} catch {

    error('Docker Compose not available');

}

//
// node_modules
//

if (fs.existsSync('node_modules')) {

    ok('Dependencies installed');

}
else {

    error('Run: npm install');

}

//
// playwright
//

if (fs.existsSync('node_modules/@playwright/test')) {

    ok('Playwright installed');

}
else {

    error('Playwright missing');

}

//
// playwright browsers
//

try {

    execSync('npx playwright --version', { stdio: 'ignore' });

    ok('Playwright browsers available');

} catch {

    error('Run: npx playwright install');

}

//
// .env
//

if (fs.existsSync('.env')) {

    ok('.env found');

}
else {

    error('.env missing');

}

//
// docker compose
//

if (fs.existsSync('docker-compose.yml')) {

    ok('docker-compose.yml found');

}
else {

    error('docker-compose.yml missing');

}

//
// playwright config
//

if (fs.existsSync('playwright.config.ts')) {

    ok('playwright.config.ts found');

}
else {

    error('playwright.config.ts missing');

}

console.log('');

if (hasError) {

    console.log(`${RED}Environment NOT READY${RESET}`);

    process.exit(1);

}

console.log(`${GREEN}Environment READY${RESET}`);

console.log('');
console.log('Launch the framework with:');
console.log('');
console.log('npm run test:ui:headed:docker');
console.log('');