//import Fetch from '../store/Fetch';
import initialData from './initialData';
import useSWR from 'swr';

/* ----------------- LOAD NOTIFICATIONS ----------------- */

// WSS helpers.
const IS_DEV = process.env.NODE_ENV === "development";
const LOCAL_URL = "localhost:8888/";
const PROD_URL = window.location.href.split("//")[1];
const wssBaseURL = IS_DEV ? LOCAL_URL : PROD_URL;

const wsOptions = {
  protocol: 'wss://',
  base: wssBaseURL,
  path: 'api/notifications'
};

const wssURL = wsOptions.protocol + wsOptions.base + wsOptions.path;

const initializeSucess = () => console.log("Notifications initialized!");
const initializeWSError = (error) => console.log(error);
const newMessage = (message) => console.log(message);

export const loadWebsocket = (enabled, userId) => {
  if(enabled){
    try {
      const WS_URL = wssURL + "/" + userId;
      const socket = new WebSocket(WS_URL);

      // Socket functions.
      socket.onopen = () => initializeSucess();
      socket.onerror = (error) => initializeWSError(error);
      socket.onmessage = (message) => newMessage(message);
    }
    catch(error) {
      console.log("Error");
    }
  }
}

export const useConfig = () => {
  const { data, error } = useSWR('/api/config', { initialData: initialData});

  return {
    config: data,
    isLoading: !error && !data,
    isError: error
  }
}
