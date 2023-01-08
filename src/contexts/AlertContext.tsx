/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, ReactNode, useState, useEffect } from 'react';

type AlertContextType = {
  showAlert: boolean;
  messageAlert: string;
  typeAlert: 'danger' | 'success';
  triggerAlert: (
    type: 'danger' | 'success',
    message: string,
    time: number,
  ) => void;
};

type AlertContextProviderProps = {
  children: ReactNode;
};

export const AlertContext = createContext({} as AlertContextType);

export function AlertContextProvider(props: AlertContextProviderProps) {
  const [showAlert, setShowAlert] = useState(false);
  const [timeToCloseAlert, setTimeToCloseAlert] = useState(0);
  const [messageAlert, setMessageAlert] = useState(``);
  const [typeAlert, setTypeAlert] = useState<'danger' | 'success'>(`success`);

  function triggerAlert(
    type: 'danger' | 'success',
    message: string,
    time: number,
  ) {
    setTypeAlert(type);
    setMessageAlert(message);
    setShowAlert(true);
    setTimeToCloseAlert(time);
  }

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
        setTimeout(() => {
          setMessageAlert(``);
        }, 500);
      }, timeToCloseAlert);
    }
  }, [showAlert, timeToCloseAlert]);

  return (
    <AlertContext.Provider
      value={{ showAlert, triggerAlert, messageAlert, typeAlert }}
    >
      {props.children}
    </AlertContext.Provider>
  );
}
