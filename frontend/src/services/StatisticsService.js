/**
 * The function `getStatistics` makes a request to fetch statistics data from a specified
 * API endpoint.
 */
import {API_BASE_URL} from "../config";

export const getStatistics = async () => {
    const response = await fetch(`${API_BASE_URL}/statistics/getAll`);
    if (!response.ok) {
        throw new Error('Failed to fetch statistics');
    }
    return response.json();
};
