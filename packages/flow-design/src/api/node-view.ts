import { httpClient } from ".";



export const save = (body: any) => {
    return httpClient.post('/api/cmd/node-view/save', body);
}

export const getScript = (key: string) => {
    return httpClient.get('/api/cmd/node-view/getScript', { key });
}

