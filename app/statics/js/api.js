const API_URL = "http://127.0.0.1:8000";

async function apiRequest(
    endpoint,
    method = "GET",
    data = null,
    auth = false
) { 
    const headers = {
        "Content-Type": "application/json"
    };

    if (auth) {
        const token = localStorage.getItem("token");
        
        
        if (!token) {
            console.error("No auth token found in localStorage.");
            window.location.href = "/login";
            return null;
        }

        headers["Authorization"] = `Bearer ${token}`;
    }

    const options = {
        method,
        headers
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, options);

        //  401 Expired or Invalid Token)
        if (response.status === 401) {
            console.error("Session expired or invalid token. Redirecting to login...");
            localStorage.removeItem("token");
            window.location.href = "/login"; 
            return null;
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("API Error:", errorData);
            throw new Error(errorData.detail || "Request Failed");
        }

        return await response.json();
    } catch (error) {
        console.error("Network Error:", error);
        return null;
    }
}