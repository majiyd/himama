import React, {createContext, useState} from 'react';
import {Alert} from 'react-native';
import {AppContextType, IAppData} from '../@types/baseTypes';

export const AppContext = createContext<Partial<AppContextType>>({});

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
    setData(newData);
  };

  const toggleStudent = (fullName: string, classroom: string) => {
    const currentClass = data.classrooms.find(c => c.id === classroom);
    if (!currentClass) {
      Alert.alert('', 'Invalid class');
      return;
    }

    const newChildren = currentClass.children.map(child => {
      if (child.fullName === fullName) {
        return {
          checked_in: !child.checked_in,
          fullName,
        };
      } else {
        return child;
      }
    });

    const newClassrooms = data.classrooms.map(c => {
      if (c.id === classroom) {
        return {
          ...c,
          children: newChildren,
        };
      } else {
        return c;
      }
    });

    const newData = {
      ...data,
      classrooms: newClassrooms,
    };

    setData(newData);
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
