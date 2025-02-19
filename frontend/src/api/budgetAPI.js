import axios from "axios";

const api_url = "http://localhost:3000";

export const createBudget = async (budget) => {
  try {
    const response = await axios.post(`${api_url}/budgets`, budget);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error creating budget");
  }
};

export const getBudgets = async () => {
  try {
    const response = await axios.get(`${api_url}/budgets`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error fetching budgets");
  }
};
