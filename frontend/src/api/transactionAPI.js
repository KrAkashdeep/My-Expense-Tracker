import axios from "axios";

const api_url = "http://localhost:3000";

export const createTransaction = async (transaction) => {
  try {
  
    const response = await axios.post(`${api_url}/transactions`, transaction);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Error creating transaction"
    );
  }
};

export const getTransactions = async () => {
  try {
    const response = await axios.get(`${api_url}/transactions`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Error fetching transactions"
    );
  }
};
