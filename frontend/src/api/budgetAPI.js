import api from "../utils/api";

export const createBudget = async (budget) => {
  try {
    const response = await api.post("/budgets", budget);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating budget");
  }
};

export const getBudgets = async () => {
  try {
    const response = await api.get("/budgets");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching budgets");
  }
};

export const deleteBudget = async (id) => {
  try {
    const response = await api.delete(`/budgets/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error deleting budget");
  }
};
