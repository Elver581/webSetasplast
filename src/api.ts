export const API_BASE_URL =import.meta.env.VITE_API_BASE_URL ;

export async function fetchData(endpoint: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
        throw new Error(`Error fetching data from ${endpoint}: ${response.statusText}`);
    }
    return response.json();
}

