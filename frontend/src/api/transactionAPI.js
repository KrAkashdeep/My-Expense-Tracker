import api from "../utils/api";

export const createTransaction = async (transaction) => {
  try {
    const response = await api.post("/transactions", transaction);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error creating transaction"
    );
  }
};

export const getTransactions = async () => {
  try {
    const response = await api.get("/transactions");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching transactions"
    );
  }
};

export const deleteTransaction = async (id) => {
  try {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error deleting transactions"
    );
  }
};
