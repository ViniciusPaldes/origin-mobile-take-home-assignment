import {useEffect, useState, useCallback} from 'react';
import {
  Transaction,
  getLocalTransactions,
  updateLocalTransactions,
} from '../../model/transaction';
import {useFilter} from '../../context/filter';
import Config from 'react-native-config';
import storage from '@react-native-firebase/storage';
import {Platform} from 'react-native';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {filterCriteria} = useFilter();

  const loadTransactions = useCallback(async () => {
    setLoading(true);

    let localTransactions = getLocalTransactions(filterCriteria);
    if (localTransactions.length === 0 || isRefreshing || page > 1) {
      try {
        const fetchedTransactions = await fetchTransactionsFromAPI(page);
        updateLocalTransactions(fetchedTransactions, isRefreshing);
        localTransactions = getLocalTransactions(filterCriteria);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    }
    setTransactions(localTransactions);
    setLoading(false);
    setIsRefreshing(false);
  }, [page, isRefreshing, filterCriteria]);

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
        `${Config.API_URL}/transactions?page=${apiPage}&pageSize=${pageSize}`,
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

      return data.Transactions.map((transaction: Transaction) => ({
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

export const updateTransactionCoordinates = async (
  id: string,
  lat: number,
  lon: number,
) => {
  const response = await fetch(
    `${Config.API_URL}/transactions/${id}/coordinates`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Lat: lat,
        Lon: lon,
      }),
    },
  );
  return response;
};

const uploadToFirebaseStorage = async imageUri => {
  const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
  const uploadUri =
    Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;

  try {
    const reference = storage().ref(filename);
    await reference.putFile(uploadUri);

    const url = await reference.getDownloadURL();
    return url;
  } catch (e) {
    console.error(e);
    throw new Error('Failed to upload image to Firebase');
  }
};

export const uploadImage = async (transactionId: string, imageUri) => {
  const imageUrl = await uploadToFirebaseStorage(imageUri);

  const response = await fetch(
    `${Config.API_URL}/transactions/${transactionId}/receipt`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ReceiptImageUrl: imageUrl,
      }),
    },
  );
  return response;
};

export const getAmountModifier = (type: string) => {
  switch (type) {
    case 'withdrawal':
    case 'payment':
      return '-';
    case 'deposit':
      return '+';
    default:
      return '';
  }
};
