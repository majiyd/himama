export interface IChildren {
  fullName: string;
  checked_in: boolean;
}

export interface IClassroom {
  children: IChildren[];
  id: string;
  name: string;
}

export interface IAppData {
  allClassroomsAccessible: boolean;
  classrooms: IClassroom[];
  id: string;
  name: string;
}

export type AppContextType = {
  data: IAppData;
  toggleStudent: (fullName: string, classroom: string) => void;
  updateData: (newData: IAppData) => void;
  moveStudent: (
    fullName: IChildren,
    currentClassroom: string,
    newClassroom: string,
  ) => void;
};
