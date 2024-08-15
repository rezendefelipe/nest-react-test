import React, { createContext, useContext, useState } from 'react';
import { UserType } from '../../modules/login/types/UserType';

interface GlobalData {
    modalStatus?: boolean;
    searchText?: string;
    user?: UserType
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

  const setUser = (user: UserType) => {
    setglobalData({
      ...globalData,
      user: user
    });
  };

  return {
    setModalStatus,
    setSearchText,
    setUser,
    searchText: globalData?.searchText,
    modalStatus: globalData?.modalStatus,
    user: globalData?.user
  };
};
