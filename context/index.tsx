import React, {createContext, useState} from 'react';
import {AppContextType, IAppData} from '../@types/baseTypes';

export const AppContext = createContext<Partial<AppContextType>>({
  updateData: () => {},
});

type Props = {
  children: React.ReactNode;
};

const AppProvider = ({children}: Props) => {
  const [data, setData] = useState<IAppData>({
    allClassroomsAccessible: false,
    classrooms: [],
    id: '',
    name: '',
  });

  const updateData = (newData: IAppData) => {
    console.log('newData', newData);
    setData(newData);
  };

  const toggleStudent = (fullName: string, classroom: string) => {
    console.log('id', fullName, classroom);
  };

  const moveStudent = (
    fullName: string,
    currentClassroom: string,
    newClassroom: string,
  ) => {
    console.log('object', fullName, currentClassroom, newClassroom);
  };

  return (
    <AppContext.Provider value={{data, updateData, toggleStudent, moveStudent}}>
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
