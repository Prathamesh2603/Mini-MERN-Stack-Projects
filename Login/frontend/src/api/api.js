const API_URL = "http://localhost:3000/api";

const request = async (path, options={}) => {
  try {
    const response = await fetch(`${API_URL}${path}`,{
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers
      }
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || "Something went wrong.");
      error.status = response.status;
      throw error;
    }

    return data;
  } catch (error) {
    if (error) {
      console.error("Error occured while fetching data: ",error.message);
    }
  }
}

export const api = {
  register: (payload) =>request("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload)
  }), 

  login: (payload) => request("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload)
  }), 

  me: () => request("/auth/me"), 

  logout: () => request("/auth/logout", {
    method: "POST"
  }), 

  dashboard: () => request("/dashboard"), 

  adminDashboard: () => request("/admin") 
};