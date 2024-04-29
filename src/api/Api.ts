import axios, {type AxiosError} from "axios";


let baseURL: string = "https://restcountries.com/v3.1/";
let urlToUse: string = baseURL;

class HttpError extends Error {
    constructor(public status: number, public statusText: string, public url: string) {
        super(`HTTP Error ${status} ${statusText} for ${url}`);
        this.name = 'HttpError';
    }
}

// Utility function for fetching data
async function fetchFromServer(endpoint: string): Promise<any> {
    try {
        const response = await axios.get(`${urlToUse}${endpoint}`);
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
            // throw new HttpError(response.status, response.statusText, `${urlToUse}${endpoint}`);
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const serverError = error as AxiosError;
            if (error.response.status === 404) {
                return 'Not Found';
            }
            throw new HttpError(error.response.status, error.response.statusText, `${urlToUse}${endpoint}`);
        }
        // throw new Error(`Unknown error occurred while fetching data from ${urlToUse}${endpoint}`);
        return null;
    }
}

export async function fetchData(endpoint: string): Promise<any> {
    return await fetchFromServer(endpoint);
}
