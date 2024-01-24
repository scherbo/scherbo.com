export function homeController(): Response {
    return new Response(`
        <!doctype html>
        <html>
            <head>
                <link href="/static/main.css" rel="stylesheet" />
            </head>
            <body>
                <div>hehexd</div>
            </body>
        </html>
    `, {
        status: 200,
        headers: {
            'content-type': 'text/html',
        }
    })
}
