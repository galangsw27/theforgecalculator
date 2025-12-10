import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';

const BASE_URL = 'https://www.theforgewiki.org';
const OUTPUT_DIR = path.join(process.cwd(), 'scraper', 'data');

const CATEGORIES = [
    { name: 'ores', url: '/ores/' },
    { name: 'weapons', url: '/weapons/' },
    { name: 'armor', url: '/armor/' },
    { name: 'enemies', url: '/enemies/' },
    { name: 'races', url: '/races/' },
    { name: 'pickaxes', url: '/pickaxe/' },
    { name: 'runes', url: '/runes/' },
    { name: 'items', url: '/items/' },
    { name: 'locations', url: '/locations/' },
    { name: 'mechanics', url: '/mechanics/' },
    { name: 'guides', url: '/guides/' },
    { name: 'codes', url: '/codes/' },
];

async function fetchPage(url: string): Promise<string> {
    console.log(`Fetching ${url}...`);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }
    return response.text();
}

async function scrapeCategory(category: { name: string; url: string }) {
    const fullUrl = `${BASE_URL}${category.url}`;
    const html = await fetchPage(fullUrl);

    if (category.name === 'codes') {
        await scrapeCodes(html, category.name);
        return;
    }

    const $ = cheerio.load(html);

    const items: any[] = [];
    const links: string[] = [];

    $('a').each((_, element) => {
        const href = $(element).attr('href');
        if (href && href.startsWith(category.url) && href !== category.url && !href.includes('#')) {
            if (!links.includes(href)) {
                links.push(href);
            }
        }
    });

    console.log(`Found ${links.length} links in ${category.name}`);

    if (links.length > 0) {
        for (const link of links) {
            try {
                const itemData = await scrapeItem(`${BASE_URL}${link}`);
                items.push(itemData);
                await new Promise(resolve => setTimeout(resolve, 200));
            } catch (error) {
                console.error(`Error scraping ${link}:`, error);
            }
        }
    } else {
        // If no sub-links found, scrape the category page itself as content
        // This applies to 'items', 'mechanics', etc.
        console.log(`No sub-links found for ${category.name}, scraping page content...`);
        const pageData = await scrapePageContent(html, fullUrl, category.name);
        if (Array.isArray(pageData)) {
            items.push(...pageData);
        } else {
            items.push(pageData);
        }
    }

    await fs.writeFile(
        path.join(OUTPUT_DIR, `${category.name}.json`),
        JSON.stringify(items, null, 2)
    );
    console.log(`Saved ${items.length} items to ${category.name}.json`);
}

async function scrapePageContent(html: string, url: string, categoryName: string) {
    const $ = cheerio.load(html);
    const title = $('h1').first().text().trim();

    // For Items and Mechanics, we might want to split by headers
    const sections: any[] = [];

    $('h2, h3, h4').each((_, header) => {
        const headerText = $(header).text().trim();
        let content = '';
        let next = $(header).next();

        while (next.length && !next.is('h1, h2, h3, h4')) {
            content += next.text().trim() + '\n';
            next = next.next();
        }

        if (headerText && content.trim()) {
            sections.push({
                name: headerText,
                description: content.trim(),
                url: url,
                category: categoryName
            });
        }
    });

    if (sections.length > 0) {
        return sections;
    }

    // Fallback: just return the whole page description
    return {
        name: title,
        url: url,
        description: $('body').text().trim(), // This is very raw, but better than nothing
        category: categoryName
    };
}

async function scrapeCodes(html: string, categoryName: string) {
    const $ = cheerio.load(html);
    const codes: any[] = [];

    // Debug: Log the body text to see what we are working with
    // console.log($('body').text());

    // Strategy 1: Look for "Reward:" and find the preceding text node.
    function getTextNodes(element: any) {
        return $(element).find('*').contents().filter((_, el) => el.type === 'text');
    }

    const body = $('body');
    const textNodes = getTextNodes(body);

    textNodes.each((i, el) => {
        const text = $(el).text().trim();
        if (text.startsWith('Reward:')) {
            const reward = text.replace('Reward:', '').trim();

            // Look backwards for the code
            let prevIndex = i - 1;
            let code = '';

            while (prevIndex >= 0) {
                const prevNode = textNodes[prevIndex];
                const prevText = $(prevNode).text().trim();

                if (prevText && prevText !== 'Copy' && !prevText.includes('Working Codes') && prevText.length < 50) {
                    code = prevText;
                    break;
                }
                prevIndex--;
            }

            if (code && reward) {
                codes.push({ code, reward });
            }
        }
    });

    // Strategy 2: Regex on the whole text (Fallback)
    if (codes.length === 0) {
        console.log('Strategy 1 failed, trying regex...');
        const fullText = $('body').text();
        // Look for patterns like "CODE Reward: REWARD"
        // This is tricky because of newlines.
        // Let's try to match the specific structure observed: Code \n Reward: ...

        // We can iterate over the text nodes again and if we find "Reward:", we check the previous non-empty text node.
        // Wait, Strategy 1 essentially did this.

        // Let's try to find the "All Working Codes" section and dump its text.
        const workingCodesHeader = $('h2').filter((_, el) => $(el).text().includes('All Working Codes'));
        if (workingCodesHeader.length) {
            let current = workingCodesHeader.next();
            while (current.length && !current.is('h2')) {
                const text = current.text().trim();
                // console.log('Section text:', text);
                // If the text contains "Reward:", try to parse it.
                if (text.includes('Reward:')) {
                    // Maybe the code is inside this element?
                    // "FREESPINS Reward: ..."
                    const parts = text.split('Reward:');
                    if (parts.length >= 2) {
                        const potentialCode = parts[0].trim();
                        const potentialReward = parts[1].trim();
                        if (potentialCode && potentialCode.length < 50) {
                            codes.push({ code: potentialCode, reward: potentialReward });
                        }
                    }
                }
                current = current.next();
            }
        }
    }

    const uniqueCodes = codes.filter((v, i, a) => a.findIndex(t => t.code === v.code) === i);
    console.log(`Found ${uniqueCodes.length} codes`);

    await fs.writeFile(
        path.join(OUTPUT_DIR, `${categoryName}.json`),
        JSON.stringify(uniqueCodes, null, 2)
    );
    console.log(`Saved ${uniqueCodes.length} items to ${categoryName}.json`);
}

async function scrapeItem(url: string) {
    const html = await fetchPage(url);
    const $ = cheerio.load(html);

    const name = $('h1').first().text().trim();
    const data: any = { name, url };

    $('table').each((_, table) => {
        $(table).find('tr').each((_, row) => {
            const key = $(row).find('th').text().trim() || $(row).find('td').first().text().trim();
            const value = $(row).find('td').last().text().trim();
            if (key && value && key !== value) {
                data[key] = value;
            }
        });
    });

    if (Object.keys(data).length <= 2) {
        $('li').each((_, li) => {
            const text = $(li).text();
            const parts = text.split(':');
            if (parts.length === 2) {
                const key = parts[0].trim();
                const value = parts[1].trim();
                if (key && value) {
                    data[key] = value;
                }
            }
        });
    }

    const description = $('p').first().text().trim();
    data.description = description;

    return data;
}

async function main() {
    try {
        await fs.mkdir(OUTPUT_DIR, { recursive: true });

        for (const category of CATEGORIES) {
            await scrapeCategory(category);
        }
        console.log('Scraping complete!');
    } catch (error) {
        console.error('Scraping failed:', error);
    }
}

main();
