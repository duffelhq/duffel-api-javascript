import { Client } from './Client';
import { DuffelResponse } from './types';
export declare class Resource {
    private client;
    constructor(client: Client);
    protected request: <T_Data = any>({ method, path, data, params, }: {
        method: string;
        path: string;
        data?: Record<string, any> | undefined;
        params?: Record<string, any> | undefined;
    }) => Promise<DuffelResponse<T_Data>>;
    protected paginatedRequest: <T_Data = any>({ path, params, }: {
        path: string;
        params?: Record<string, any> | undefined;
    }) => AsyncGenerator<DuffelResponse<T_Data>, void, unknown>;
}
