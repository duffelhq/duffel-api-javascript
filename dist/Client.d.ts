import { DuffelResponse, SDKOptions, ApiResponseMeta, ApiResponseError } from './types';
export interface Config {
    token: string;
    basePath?: string;
    apiVersion?: string;
    debug?: SDKOptions;
    source?: string;
}
export declare class DuffelError extends Error {
    meta: ApiResponseMeta;
    errors: ApiResponseError[];
    headers: Record<string, string>;
    constructor({ meta, errors, headers, }: {
        meta: ApiResponseMeta;
        errors: ApiResponseError[];
        headers: Record<string, string>;
    });
}
export declare class Client {
    private token;
    private basePath;
    private apiVersion;
    private debug;
    private source;
    constructor({ token, basePath, apiVersion, debug, source }: Config);
    request: <T_Data = any>({ method, path, data, params, compress, }: {
        method: string;
        path: string;
        data?: Record<string, any> | undefined;
        params?: Record<string, any> | undefined;
        compress?: boolean | undefined;
    }) => Promise<DuffelResponse<T_Data>>;
    paginatedRequest<T_Data = any>({ path, params, }: {
        path: string;
        params?: Record<string, any>;
    }): AsyncGenerator<DuffelResponse<T_Data>, void, unknown>;
}
