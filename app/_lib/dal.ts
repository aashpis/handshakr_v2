import { API } from './definitions'
import axios  from 'axios'

// Get user profile data
// Auth user login with fetch
export async function fetchUserProfile() {
  const csrfToken = sessionStorage.getItem("X-XSRF-TOKEN");

  // Check if we have a CSRF token (basic check if user is authenticated)
  if (!csrfToken) {
    return { 
      success: false, 
      error: "Not authenticated" 
    };
  }

  try {
    const response = await fetch(`${API.BASE}${API.PROFILE}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": csrfToken,
      }
    });

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


//axios version
export async function getUserProfileAxiosRequest() {
  const csrfToken = sessionStorage.getItem("X-XSRF-TOKEN");


  if (!csrfToken) {
    return { 
      success: false, 
      error: "Not authenticated" 
    };
  }

  try {
    const response = await axios.get(`${API.BASE}${API.PROFILE}`, {
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
// // Show which handshakes have not been completed
// export async function getPendingHandshakes() {
//   try {
//     const response = await axiosServer.get(`${API.HANDSHAKE.PENDING}`);
//     return { success: true, data: response.data };
//   } catch (error: unknown) {
//     if (error instanceof AxiosError) {
//       return { success: false, error: error.response?.data?.message || "Failed to get your pending handshakes" };
//     }
//     return { success: false, error: "An unknown error occurred" };
//   }
// }

// // Get encrypted handshake history data
// export async function getHandshakeHistory() {
//   try {
//     const response = await axiosServer.get(`${API.HANDSHAKE.HISTORY}`);
//     return { success: true, data: response.data };
//   } catch (error: unknown) {
//     if (error instanceof AxiosError) {
//       return { success: false, error: error.response?.data?.message || "Failed to get handshakes history" };
//     }
//     return { success: false, error: "An unknown error occurred" };
//   }
// }


/*************** PRICE ANALYZER METHODS ****************/

// gets price object with properties: median, mean, min, max
// export async function getPriceStats(itemName: string) {
//   try {
//     const response = await axiosServer.get(`${API.GET_PRICE_STATS}/${itemName}`);
//     return { success: true, data: response.data };
//   } catch (error: unknown) {
//     if (error instanceof AxiosError) {
//       return { success: false, error: error.response?.data?.message || "Failed to get price stats" };
//     }
//     return { success: false, error: "An unknown error occurred" };
//   }
// }

// // gets .png graph of final sales prices 
// export async function getPriceSalesGraph(itemName: string) {
//   try {
//     const response = await axiosServer.get(`${API.GRAPH.ITEM_PRICE}/${itemName}`);
//     return { success: true, data: response.data };
//   } catch (error: unknown) {
//     if (error instanceof AxiosError) {
//       return { success: false, error: error.response?.data?.message || "Failed to get sales graph" };
//     }
//     return { success: false, error: "An unknown error occurred" };
//   }
// }

// // gets .png graph of price histogram 
// export async function getPriceHistogramGraph(itemName: string) {
//   try {
//     const response = await axiosServer.get(`${API.GRAPH.ITEM_PRICE_HISTOGRAM}/${itemName}`);
//     return { success: true, data: response.data };
//   } catch (error: unknown) {
//     if (error instanceof AxiosError) {
//       return { success: false, error: error.response?.data?.message || "Failed to get price histogram" };
//     }
//     return { success: false, error: "An unknown error occurred" };
//   }
// }

// // gets .png graph of median prices 
// export async function getMedianPriceGraph(itemName: string) {
//   try {
//     const response = await axiosServer.get(`${API.GRAPH.ITEM_PRICE_HISTOGRAM}/${itemName}`);
//     return { success: true, data: response.data };
//   } catch (error: unknown) {
//     if (error instanceof AxiosError) {
//       return { success: false, error: error.response?.data?.message || "Failed to get median price graph" };
//     }
//     return { success: false, error: "An unknown error occurred" };
//   }
// }