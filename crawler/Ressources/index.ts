import axios from 'axios'
// import cheerio from 'cheerio'
import * as fs from 'fs'

function isLowerAlpha(char) {
    return char.toLowerCase() !== char.toUpperCase() && char === char.toLowerCase();
}

async function getHTMLPage(url: string) {
	const page = await axios.get(url)
	return (page.data)
}

async function getFolderNames(url: string): Promise<string[]> {

	const pageHTML = await getHTMLPage(url)

	console.log("Getting folder names from", url)

	const regex = /<a\s+href="([^"]*)"/g;
	let match;
	const hrefs: string[] = [];
	
	while ((match = regex.exec(pageHTML)) !== null) {
		if (isLowerAlpha(match[1]))
			hrefs.push(match[1]);
	}

  




	// const $ = cheerio.load(pageHTML);
	// const names: string[] = [];
	
	// $('a').each((index, element) => {
	// 	const href: string = $(element).attr('href')!;
	// 	if (isLowerAlpha(href[0]))
	// 	names.push(href);
	// });
	
	return (hrefs)
}

/* ========================================================================== */

let URLS: string[] = []

async function script(url: string, iter: number) {

	const folderNames: string[] = await getFolderNames(url)

	for (const folderName of folderNames)
		URLS.push(url + folderName + "README")

	if (iter < 3)
		for (const folderName of folderNames)
			await script(url + folderName, iter + 1)

}

async function main() {
	await script("http://192.168.56.101/.hidden/", 1)

	const toWrite = URLS.toString().replace(/,/g, '\n')

	fs.writeFile("urls", toWrite, (err) => {
		if (err) {
			console.error('Erreur lors de l\'écriture dans le fichier :', err);
			return;
		}
		console.log('Le contenu a été écrit dans le fichier avec succès.');
	});

}
main()