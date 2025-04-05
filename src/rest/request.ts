import axios, { Axios, AxiosRequestConfig } from "axios";

/**
 * The `RestApi` class provides a simplified interface for making HTTP requests
 * to a specified server using Axios. It supports common HTTP methods and 
 * manages authorization headers.
 */
export class RestApi {

    public axios: Axios;

    /**
     * Creates an instance of `RestApi`.
     * 
     * @param {string} host - The base URL of the API server (e.g., "https://api.example.com").
     * @param {string} token - The authorization token to include in the request headers.
     */
    constructor(host: string, token: string) {
        const conf: AxiosRequestConfig = {
            baseURL: host + "/api",
            headers: {
                authorization: token
            }
        };
        this.axios = axios.create(conf);
    }

    /**
     * Enum-like object defining supported HTTP methods.
     * This is a constant object that maps HTTP method names to their string representations.
     * 
     * Available methods:
     * - `GET`: Fetch data from the server.
     * - `POST`: Submit data to the server.
     * - `PUT`: Replace data on the server.
     * - `PATCH`: Partially update data on the server.
     * - `DELETE`: Remove data from the server.
     */
    public static HttpMethod = {
        GET: "GET",
        POST: "POST",
        PUT: "PUT",
        PATCH: "PATCH",
        DELETE: "DELETE",
    } as const;

    /**
     * Sends an HTTP request to the server using the specified method and URL.
     * 
     * @param {keyof typeof RestApi.HttpMethod} method - The HTTP method to use (GET, POST, PUT, PATCH, DELETE).
     * @param {string} url - The endpoint URL (relative to the base URL).
     * @param {any} [body] - Optional data to send in the request body (used with POST, PUT, PATCH).
     * @returns {Promise<any>} A promise that resolves to the server's response data.
     * 
     * @throws {Error} Logs and throws the error if the request fails.
     */
    public async request(method: keyof typeof RestApi.HttpMethod, url: string, body?: any): Promise<any> {
        try {
            const response = await this.axios.request({
                method: method,
                url: url,
                data: body,
            });
            return response.data;
        } catch (error: any) {
            console.error(`Error: ${error}`);
            throw error;
        }
    }
}
