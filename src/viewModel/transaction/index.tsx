import {useEffect, useState, useCallback} from 'react';

export type Transaction = {
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
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchTransactions = useCallback(
    async (pageNum: number, pageSize: number = 20) => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://tque3jpn1e.execute-api.us-east-1.amazonaws.com/mobile-tha/transactions?page=${pageNum}&pageSize=${pageSize}`,
        );
        const data = await response.json();
        if (pageNum === 1) {
          setTransactions(data.Transactions);
        } else {
          setTransactions(prev => [...prev, ...data.Transactions]);
        }
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      } finally {
        setLoading(false);
        if (isRefreshing) setIsRefreshing(false);
      }
    },
    [isRefreshing],
  );

  useEffect(() => {
    fetchTransactions(page);
  }, [page, fetchTransactions]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setPage(1);
  };

  const handleLoadMore = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return {
    transactions,
    loading,
    isRefreshing,
    handleRefresh,
    handleLoadMore,
  };
};
