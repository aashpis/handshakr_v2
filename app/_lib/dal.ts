import { API } from './definitions'
import axios  from 'axios'

// Get user profile data
// Auth user login with fetch
export async function fetchUserProfile() {
  const csrfToken = sessionStorage.getItem("X-XSRF-TOKEN");

  // Basic auth check CSRF token 
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
// Get User Initiated Handshakes 
export async function fetchInitiatedHandshakes(username : string) {
  const csrfToken = sessionStorage.getItem("X-XSRF-TOKEN");

  // Check if we have a CSRF token (basic check if user is authenticated)
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
    return { success: true, data : rawData.data };
  } catch (error) {
    console.error("fetchInitiatedHandshakes() error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An unknown error occurred" 
    };
  }
}


// Get User Received Handshakes 
export async function fetchReceivedHandshakes(username : string) {
  const csrfToken = sessionStorage.getItem("X-XSRF-TOKEN");

  // Check if we have a CSRF token (basic check if user is authenticated)
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
    return { success: true, data : rawData.data };
  } catch (error) {
    console.error("fetchInitiatedHandshakes() error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An unknown error occurred" 
    };
  }
}


//axios version





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

// // gets price object with properties: median, mean, min, max
// export async function priceStatsAxios(itemName: string) {
//   try {
//     const response = await axios.get(`${API.BASE}/${API.GET_PRICE_STATS}/${itemName}`);
//     return { success: true, data: response.data };
//   } catch (error: unknown) {
//     if (error instanceof AxiosError) {
//       return { success: false, error: error.response?.data?.message || "Failed to get price stats" };
//     }
//     return { success: false, error: "An unknown error occurred" };
//   }
// }

// // gets .png graph of price histogram 
// export async function getPriceHistogramGraph(itemName: string) {
//   try {
//     const response = await axios.get(`${API.BASE}/${API.GET_PRICE_STATS}/${itemName}`);
//     return { success: true, data: response.data };
//   } catch (error: unknown) {
//     if (error instanceof AxiosError) {
//       return { success: false, error: error.response?.data?.message || "Failed to get price histogram" };
//     }
//     return { success: false, error: "An unknown error occurred" };
//   }
// }

// // gets .png graph of median prices of weekly sales
// export async function getMedianPriceGraph(itemName: string) {
//   try {
//     const response = await axios.get(`${API.GRAPH.ITEM_PRICE_HISTOGRAM}/${itemName}`);
//     return { success: true, data: response.data };
//   } catch (error: unknown) {
//     if (error instanceof AxiosError) {
//       return { success: false, error: error.response?.data?.message || "Failed to get median price graph" };
//     }
//     return { success: false, error: "An unknown error occurred" }
//   }
// }

// get price stats of param
// return data shape - "item name", { "max": 123, "mean": 123, "median":123, "min":123}
// Price stats fetch
export async function fetchPriceStats(itemName: string) {
  try {
    const response = await fetch(`${API.BASE}/${API.GET_PRICE_STATS}/${encodeURIComponent(itemName)}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    });

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

// Price histogram fetch
export async function fetchPriceHistogram(itemName: string) {
  try {
    const response = await fetch(`${API.BASE}/${API.GET_PRICE_HISTOGRAM}/${encodeURIComponent(itemName)}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Accept": "image/png",
      }
    });

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

// Median price graph fetch
export async function fetchMedianPriceGraph(itemName: string) {
  try {
    const response = await fetch(`${API.BASE}/${API.GET_WEEKLY_MEDIAN_PRICE}/${encodeURIComponent(itemName)}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Accept": "image/png",
      }
    });

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