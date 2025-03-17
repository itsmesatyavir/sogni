import { launch } from 'puppeteer';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import cfonts from "cfonts";
import fs from 'fs/promises';
import readline from 'readline';

// Function to read user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

// Function to read proxies from file
async function getProxies() {
    try {
        await fs.access('proxy.txt'); // Check if the file exists
        const data = await fs.readFile('proxy.txt', 'utf8');
        return data.split('\n').map(line => line.trim()).filter(line => line);
    } catch (error) {
        console.error('proxy.txt not found. Creating an empty file.');
        await fs.writeFile('proxy.txt', '', 'utf8');
        return [];
    }
}

// Other functions remain unchanged...

// Function to handle Puppeteer automation
async function runAutomation(proxy = null, kodeReff) {
    const user = await getRandomUser ();
    if (!user) return;

    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const Listdomains = [
        // List of domains...
    ];
    const domain = Listdomains[Math.floor(Math.random() * Listdomains.length)];
    const username = `${user.firstName}${user.lastName}${randomNumber}`;
    const emailAddress = `${username}@${domain}`;
    const password = username;

    console.log(`Creating account: ${username} | ${emailAddress} | ${password}`);

    // Launch Puppeteer with proxy if provided
    let args = ['--no-sandbox', '--disable-setuid-sandbox'];
    if (proxy) {
        args.push(`--proxy-server=http://${proxy}`);
    }

    const browser = await launch({ headless: true, args });
    const page = await browser.newPage();

    // Other automation steps remain unchanged...

    await browser.close();
}

// Main execution flow
(async () => {
    cfonts.say("FORESTARMY", {
        font: "block",
        align: "center",
        colors: ["cyan", "magenta"],
        background: "black",
        letterSpacing: 1,
        lineHeight: 1,
        space: true,
        maxLength: "0",
    });
    console.log("=== Telegram Channel 🚀 : FORESTARMY ===");
    const kodeReff = await askQuestion('Reff Code: ');
    const useProxy = await askQuestion('Use proxy? (yes/no): ');
    let loopCount;
    let proxies = [];

    if (useProxy.toLowerCase() === 'yes') {
        proxies = await getProxies();
        if (proxies.length === 0) {
            console.log('No proxies found in proxy.txt');
            rl.close();
            return;
        }
        loopCount = proxies.length;
    } else {
        loopCount = parseInt(await askQuestion('Enter loop count: '), 10);
    }

    for (let i = 0; i < loopCount; i++) {
        const proxy = useProxy.toLowerCase() === 'yes' ? proxies[i] : null;
        await runAutomation(proxy, kodeReff);
    }

    rl.close();
})();
