export const TODAY = new Date(Date.now() + 3600000).toISOString().substring(0, 10).replaceAll('-', '.');
export const TOMORROW = new Date(Date.now() + 3600000 + 86400000).toISOString().substring(0, 10).replaceAll('-', '.');

const tomorrowLink = `<a href="tomorrow.html">Tomorrow ${TOMORROW}</a>`;
const todayLink = `<a href="index.html">Today ${TODAY}</a>`;

export const toHtml = (results, date) =>
    `<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Cache-Control" content="max-age=3600">
    <title>DebMenu</title>
    <style>
        ul, li {
            margin: 5px;
        }
    </style>
</head>
<body>
${date} - ${date === TODAY ? tomorrowLink : todayLink}<br>
${resultsToHtml(results, date)}
Generated at ${new Date(
        Date.now() + 3600000,
    ).toISOString().replaceAll('T', ' ').replaceAll('Z', '')
    }
<br>
</body>
</html>`;

const resultsToHtml = (results, date) => {
    return results
        .map((result) => {
            let html = `<li><a href="${result.website}">${result.name}</a><ul>`;

            result.offers
                .forEach((o) => {
                    if (o.date === date) {
                        html += o.offers.map((offer) => `<li>${offer}</li>`).join('\n');
                    }
                });

            return html + '</ul></li>';
        }).join('\n');
};
