import { useState, useEffect, useCallback } from 'react';

// Custom hook for API calls with loading and error states
export const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, dependencies);

  return { data, loading, error, execute };
};

// Custom hook for API calls that should run on mount
export const useApiOnMount = (apiFunction, dependencies = []) => {
  const { data, loading, error, execute } = useApi(apiFunction, dependencies);

  useEffect(() => {
    execute();
  }, [execute, ...dependencies]);

  return { data, loading, error, refetch: execute };
};

// Custom hook for paginated data
export const usePaginatedApi = (apiFunction, initialParams = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [params, setParams] = useState(initialParams);

  const fetchData = useCallback(async (newParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const mergedParams = { ...params, ...newParams };
      const result = await apiFunction(mergedParams);
      
      if (newParams.page && newParams.page > 1) {
        // Append for pagination
        setData(prev => [...prev, ...result.data]);
      } else {
        // Replace for new search/filter
        setData(result.data);
      }
      
      setPagination({
        page: result.page || 1,
        limit: result.limit || 10,
        total: result.total || 0,
        totalPages: result.totalPages || 0
      });
      
      setParams(mergedParams);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, params]);

  const loadMore = useCallback(() => {
    if (pagination.page < pagination.totalPages && !loading) {
      fetchData({ page: pagination.page + 1 });
    }
  }, [fetchData, pagination.page, pagination.totalPages, loading]);

  const refresh = useCallback(() => {
    fetchData({ page: 1 });
  }, [fetchData]);

  const search = useCallback((searchParams) => {
    fetchData({ ...searchParams, page: 1 });
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    pagination,
    loadMore,
    refresh,
    search,
    hasMore: pagination.page < pagination.totalPages
  };
};

// Custom hook for form submission
export const useFormSubmit = (apiFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submit = useCallback(async (data) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const result = await apiFunction(data);
      setSuccess(true);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return { submit, loading, error, success, reset };
};

// Custom hook for real-time data updates
export const useRealtimeData = (apiFunction, interval = 30000) => {
  const { data, loading, error, execute } = useApi(apiFunction);

  useEffect(() => {
    execute();
    
    const timer = setInterval(() => {
      execute();
    }, interval);

    return () => clearInterval(timer);
  }, [execute, interval]);

  return { data, loading, error, refresh: execute };
};
