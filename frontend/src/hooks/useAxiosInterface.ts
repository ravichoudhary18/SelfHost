import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { AxiosInstance, AxiosError } from 'axios';

const URL: string = import.meta.env.VITE_API_URL as string;

const useAxiosInterface = (): AxiosInstance => {
  const navigate = useNavigate();

  const axiosInterface: AxiosInstance = axios.create({
    baseURL: URL,
    withCredentials: true, // optional (cookies/session auth)
  });

  useEffect(() => {
    const requestIntercept = axiosInterface.interceptors.request.use(
      (config) => config,
      (error: AxiosError) => Promise.reject(error),
    );

    const responseIntercept = axiosInterface.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.clear();
          sessionStorage.clear();
          navigate('/');
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosInterface.interceptors.request.eject(requestIntercept);
      axiosInterface.interceptors.response.eject(responseIntercept);
    };
  }, [navigate]);

  return axiosInterface;
};

export default useAxiosInterface;
