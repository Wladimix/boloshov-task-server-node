import EventEmitter from 'events';
import http from 'http';
import parse from 'co-body';
import path from 'path';

import { DOMAIN } from '.';

export function route(routePath: string, method: Methods, handler: Handler): void {
    emitter.on(`[${routePath}:${method}]`, async (req: Req, res: Res, queryParams: URLSearchParams | null) => {
        const customRequest: CustomRequest = {
            queryParams,
            body: await findBodyInRequest(req)
        }

        await handler(customRequest, res);
        res.end();
    });
}

const emitter = new EventEmitter();

const server = http.createServer(async (req, res) => {
    const queryParams = findQueryParamsInRequest(req.url);

    const emited = emitter.emit(`[${req.url?.replace(/\?.+/, '')}:${req.method}]`, req, res, queryParams);
    if (!emited) {
        res.end();
    }
});

export default server;

function findQueryParamsInRequest(url: string | undefined): URLSearchParams | null {
    if (url) {
        const myURL = new URL(path.join(DOMAIN, url));
        return myURL.searchParams;
    }

    return null;
}

async function findBodyInRequest(req: Req): Promise<any> {
    return await parse.json(req);
}

export type CustomRequest = {
    queryParams: URLSearchParams | null,
    body: any
}

export type Req = http.IncomingMessage;

export type Res = http.ServerResponse;

type Handler = (req: any, res: Res) => Promise<any>

export enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT'
}
