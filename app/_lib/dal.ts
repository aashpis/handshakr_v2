import { API } from './definitions'
import axios from 'axios'

/**
 * Fetches the user's profile data from the server.
 * 
 * @returns A result object containing either a success flag and data or an error message.
 */
export async function fetchUserProfile() {
  const csrfToken = sessionStorage.getItem("X-XSRF-TOKEN");

  // Basic auth check for CSRF token
  if (!csrfToken) {
    return { 
      success: false, 
      error: "Not authenticated" 
    };
  }

  try {
    const response = await fetch(`${API.BASE}/${API.PROFILE}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": csrfToken,
      }
    });

    // Handle authentication errors
    if (response.status === 401 || response.status === 403) {
      return { 
        success: false, 
        error: "Authentication Error" 
      };
    }

    if (!response.ok) {
      const errorData = await response.json();
      return { 
        success: false, 
        error: errorData.message || "Failed to get profile" 
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("fetchUserProfile error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An unknown error occurred" 
    };
  }
}

/**
 * Fetches the user's profile data using Axios.
 * 
 * @returns A result object containing either a success flag and data or an error message.
 */
export async function getUserProfileAxiosRequest() {
  const csrfToken = sessionStorage.getItem("X-XSRF-TOKEN");

  if (!csrfToken) {
    return { 
      success: false, 
      error: "Not authenticated" 
    };
  }

  try {
    const response = await axios.get(`${API.BASE}/${API.PROFILE}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": csrfToken,
      }
    });

    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        return { 
          success: false, 
          error: "Authentication Error" 
        };
      }
      
      return { 
        success: false, 
        error: error.response?.data?.message || "Failed to get profile" 
      };
    }
    
    console.error("fetchUserProfile error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An unknown error occurred" 
    };
  }
}

/**
 * Fetches the handshakes initiated by a user.
 * 
 * @param username - The username of the user whose initiated handshakes are being fetched.
 * @returns A result object containing either a success flag and data or an error message.
 */
export async function fetchInitiatedHandshakes(username: string) {
  const csrfToken = sessionStorage.getItem("X-XSRF-TOKEN");

  // Basic check if user is authenticated
  if (!csrfToken) {
    return { 
      success: false, 
      error: "Not authenticated" 
    };
  }

  try {
    const response = await fetch(`${API.BASE}/${API.GET_MY_INITIATED_HS}/${username}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": csrfToken,
      }
    });

    // Handle authentication errors
    if (response.status === 401 || response.status === 403) {
      return { 
        success: false, 
        error: "Authentication Error" 
      };
    }

    if (!response.ok) {
      const errorData = await response.json();
      return { 
        success: false, 
        error: errorData.message || "Failed to get my initiated handshakes" 
      };
    }

    const rawData = await response.json();
    return { success: true, data: rawData.data };
  } catch (error) {
    console.error("fetchInitiatedHandshakes() error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An unknown error occurred" 
    };
  }
}

/**
 * Fetches the handshakes received by a user.
 * 
 * @param username - The username of the user whose received handshakes are being fetched.
 * @returns A result object containing either a success flag and data or an error message.
 */
export async function fetchReceivedHandshakes(username: string) {
  const csrfToken = sessionStorage.getItem("X-XSRF-TOKEN");

  // Basic check if user is authenticated
  if (!csrfToken) {
    return { 
      success: false, 
      error: "Not authenticated" 
    };
  }

  try {
    const response = await fetch(`${API.BASE}/${API.GET_MY_RECEIVED_HS}/${username}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": csrfToken,
      }
    });

    // Handle authentication errors
    if (response.status === 401 || response.status === 403) {
      return { 
        success: false, 
        error: "Authentication Error" 
      };
    }

    if (!response.ok) {
      const errorData = await response.json();
      return { 
        success: false, 
        error: errorData.message || "Failed to get my received handshakes" 
      };
    }

    const rawData = await response.json();
    return { success: true, data: rawData.data };
  } catch (error) {
    console.error("fetchReceivedHandshakes() error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An unknown error occurred" 
    };
  }
}

/**
 * Fetches the price statistics for a given item.
 * 
 * @param itemName - The name of the item whose price statistics are being fetched.
 * @returns A result object containing either a success flag and data or an error message.
 */
export async function fetchPriceStats(itemName: string) {
  try {
    const response = await fetch(`${API.BASE}/${API.GET_PRICE_STATS}/${encodeURIComponent(itemName)}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    });

    // Handle authentication errors
    if (response.status === 401 || response.status === 403) {
      return { 
        success: false, 
        error: "Authentication Error" 
      };
    }

    if (!response.ok) {
      try {
        const errorData = await response.json();
        return { 
          success: false, 
          error: errorData.message || "Failed to fetch Price Stats" 
        };
      } catch {
        return {
          success: false,
          error: "Failed to fetch Price Stats"
        };
      }
    }

    const rawData = await response.json(); 
    console.log("[fetchPriceStats] rawData:", rawData);
    return { success: true, data: rawData };
  } catch (error) {
    console.error("fetchPriceStats() error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An unknown error occurred" 
    };
  }
}

/**
 * Fetches the price histogram for a given item.
 * 
 * @param itemName - The name of the item whose price histogram is being fetched.
 * @returns A result object containing either a success flag and the image URL or an error message.
 */
export async function fetchPriceHistogram(itemName: string) {
  try {
    const response = await fetch(`${API.BASE}/${API.GET_PRICE_HISTOGRAM}/${encodeURIComponent(itemName)}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Accept": "image/png",
      }
    });

    // Handle authentication errors
    if (response.status === 401 || response.status === 403) {
      return {
        success: false,
        error: "Authentication Error",
      };
    }

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to fetch price histogram (Status: ${response.status})`,
      };
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    console.log("[fetchPriceHistogram] blob:", blob);
    console.log("[fetchPriceHistogram] imageURL:", imageUrl);

    return { success: true, data: imageUrl };
  } catch (error) {
    console.error("fetchPriceHistogram() error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

/**
 * Fetches the median price graph for a given item.
 * 
 * @param itemName - The name of the item whose median price graph is being fetched.
 * @returns A result object containing either a success flag and the image URL or an error message.
 */
export async function fetchMedianPriceGraph(itemName: string) {
  try {
    const response = await fetch(`${API.BASE}/${API.GET_WEEKLY_MEDIAN_PRICE}/${encodeURIComponent(itemName)}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Accept": "image/png",
      }
    });

    // Handle authentication errors
    if (response.status === 401 || response.status === 403) {
      return {
        success: false,
        error: "Authentication Error",
      };
    }

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to fetch median price graph (Status: ${response.status})`,
      };
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    console.log("[fetchMedianPriceGraph] blob:", blob);
    console.log("[fetchMedianPriceGraph] imageURL:", imageUrl);

    return { success: true, data: imageUrl };
  } catch (error) {
    console.error("fetchMedianPriceGraph() error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
