import React, { createContext, useContext, useState } from 'react';

interface GlobalData {
    modalStatus?: boolean;
    searchText?: string
}

interface GlobalContextProps {
  globalData: GlobalData;
  setglobalData: (globalData: GlobalData) => void;
}

const GlobalContext = createContext({} as GlobalContextProps);

interface GlobalProviderProps {
  children: React.ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [globalData, setglobalData] = useState<GlobalData>({});
  return (
    <GlobalContext.Provider value={{ globalData, setglobalData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const { globalData, setglobalData } = useContext(GlobalContext);

  const setModalStatus = (status: boolean) => {
    setglobalData({
      ...globalData,
      modalStatus: status
    });
  };

  const setSearchText = (text: string) => {
    setglobalData({
      ...globalData,
      searchText: text
    });
  };

  return {
    setModalStatus,
    setSearchText,
    searchText: globalData?.searchText,
    modalStatus: globalData?.modalStatus,
  };
};
