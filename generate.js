import { writeFileSync } from 'node:fs';
import { fetchManna } from './src/manna.js';
import { fetchViktoria } from './src/viktoria.js';
import { fetchHuse } from './src/huse.js';
import { createCacheFolder, createResultFolder, RESULT_FOLDER } from './src/_cache.js';
import { fetchGovinda } from './src/govinda.js';
import { TODAY, toHtml, TOMORROW } from './src/_template.js';
import { uploadResult } from './src/services/aws.js';
import { fetchForest } from './src/forest.js';

createCacheFolder();
createResultFolder();

const fetchFunctions = [
    fetchForest,
    fetchHuse,
    fetchManna,
    fetchViktoria,
    fetchGovinda,
];

const results = [];

for (let index = 0; index < fetchFunctions.length; index++) {
    const res = await fetchFunctions[index]();
    console.log(res);
    results.push(res);
    writeFileSync(
        `${RESULT_FOLDER}/${res.shortName}.json`,
        JSON.stringify(res, null, 4),
    );
}

writeFileSync(`${RESULT_FOLDER}/index.html`, toHtml(results, TODAY));
writeFileSync(`${RESULT_FOLDER}/tomorrow.html`, toHtml(results, TOMORROW));

await uploadResult();
