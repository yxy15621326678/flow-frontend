import { httpClient } from ".";

export const compile = (body: any) => {
    return httpClient.post('/api/groovy-script/compile', body);
}

export const save = (body: any) => {
    return httpClient.post('/api/groovy-script/save', body);
}

export const getScript = (key: string) => {
    return httpClient.get('/api/groovy-script/getScript', { key });
}


export const getMetadata = (key: string) => {
    return httpClient.get('/api/groovy-script/getMetadata', { key });
}