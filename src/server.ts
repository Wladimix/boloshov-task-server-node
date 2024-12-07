import http from 'http';

const server = http.createServer((request, response) => {
    let text = '0';
    if (request.url == '/page1') {
        text = '1';
    }
    const TEST_ENV = process.env.TEST || 'NO';
	response.setHeader('Content-Type', 'text/html');
	response.statusCode = 200;
	response.write(TEST_ENV);
	response.write(text);
	response.end();
});

export default server;
