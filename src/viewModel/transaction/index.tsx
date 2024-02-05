import {useEffect, useState, useCallback} from 'react';
import {
  getLocalTransactions,
  updateLocalTransactions,
} from '../../model/transaction';

export type TransactionVM = {
  Id: number;
  Amount: number;
  Date: string;
  Vendor: string;
  Type: string;
  Category: string;
  Lat: number;
  Lon: number;
  ReceiptImage: string | null;
};

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<TransactionVM[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadTransactions = useCallback(async () => {
    setLoading(true);

    let localTransactions = getLocalTransactions();
    if (localTransactions.length === 0 || isRefreshing || page > 1) {
      try {
        const fetchedTransactions = await fetchTransactionsFromAPI(page);
        updateLocalTransactions(fetchedTransactions, isRefreshing);
        localTransactions = getLocalTransactions();
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    }
    setTransactions(localTransactions);
    setLoading(false);
    setIsRefreshing(false);
  }, [page, isRefreshing]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setPage(1);
  };

  const handleLoadMore = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  async function fetchTransactionsFromAPI(apiPage: number, pageSize = 20) {
    try {
      const response = await fetch(
        `https://tque3jpn1e.execute-api.us-east-1.amazonaws.com/mobile-tha/transactions?page=${apiPage}&pageSize=${pageSize}`,
      );

      if (!response.ok) {
        throw new Error(
          `Network response was not ok, status: ${response.status}`,
        );
      }

      const data = await response.json();

      // Check if data.Transactions is defined and is an array
      if (!data.Transactions || !Array.isArray(data.Transactions)) {
        console.warn(
          'No transactions found or unexpected data structure:',
          data,
        );
        return []; // Return an empty array if there are no transactions or if the structure is not as expected
      }

      return data.Transactions.map(transaction => ({
        Id: transaction.Id,
        Amount: transaction.Amount,
        Date: transaction.Date,
        Vendor: transaction.Vendor,
        Type: transaction.Type,
        Category: transaction.Category,
        Lat: transaction.Lat,
        Lon: transaction.Lon,
        ReceiptImage: transaction.ReceiptImage,
      }));
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      throw error; // Rethrow the error so it can be handled by the caller
    }
  }

  return {
    transactions,
    loading,
    isRefreshing,
    fetchTransactionsFromAPI,
    handleRefresh,
    handleLoadMore,
  };
};
