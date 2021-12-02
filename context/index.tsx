import React, {createContext, useState} from 'react';
import {Alert} from 'react-native';
import {AppContextType, IAppData, IChildren} from '../@types/baseTypes';

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
    // get current class
    const currentClass = data.classrooms.find(c => c.id === classroom);

    if (!currentClass) {
      Alert.alert('', 'Invalid class');
      return;
    }

    // map through children in current class
    const newChildren = currentClass.children.map(child => {
      if (child.fullName === fullName) {
        // toggle attendance
        return {
          checked_in: !child.checked_in,
          fullName,
        };
      } else {
        return child;
      }
    });

    // update classrooms
    const newClassroomObject = data.classrooms.map(c => {
      if (c.id === classroom) {
        return {
          ...c,
          children: newChildren,
        };
      } else {
        return c;
      }
    });

    // update data
    const newData = {
      ...data,
      classrooms: newClassroomObject,
    };

    setData(newData);
  };

  const moveStudent = (
    student: IChildren,
    currentClassroom: string,
    newClassroom: string,
  ) => {
    // map through class rooms
    const newClassroomObject = data.classrooms.map(classroom => {
      // add child to new class
      if (classroom.id === newClassroom) {
        return {
          ...classroom,
          children: [
            ...(classroom?.children ?? []),
            {fullName: student.fullName, checked_in: student.checked_in},
          ],
        };
      } else if (classroom.id === currentClassroom) {
        // remove child from current class
        return {
          ...classroom,
          children: classroom.children.filter(
            child => child.fullName !== student.fullName,
          ),
        };
      } else {
        return classroom;
      }
    });

    // update classrooms and set data
    const newData: IAppData = {
      ...data,
      classrooms: newClassroomObject,
    };

    setData(newData);
  };

  return (
    <AppContext.Provider value={{data, updateData, toggleStudent, moveStudent}}>
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
