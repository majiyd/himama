import React, {useContext, useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {IChildren} from '../@types/baseTypes';
import ChildItem from '../components/ChildItem';
import {AppContext} from '../context';
import ClassroomModal from './ClassroomModal';

type Props = {
  route: any;
};

const ClassroomScreen = ({route}: Props) => {
  const [children, setChildren] = useState<IChildren[] | undefined>(undefined);
  const [showModal, setShowModal] = useState<IChildren>();

  const {id} = route.params;
  const {data, toggleStudent, moveStudent} = useContext(AppContext);
  const allClassroomsAccessible = data?.allClassroomsAccessible;

  useEffect(() => {
    getChildren();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.classrooms]);

  const getChildren = () => {
    const currentClass = data?.classrooms.find(
      classroom => classroom.id === id,
    );

    setChildren(currentClass?.children);
  };

  const handleToggle = (fullname: string) => {
    toggleStudent && toggleStudent(fullname, id);
  };

  const handleChangeClass = (newClass: string) => {
    setShowModal(undefined);
    if (id === newClass || !moveStudent || !showModal) {
      return;
    }
    moveStudent(showModal, id, newClass);
  };

  return (
    <>
      <View style={styles.classroom}>
        <FlatList
          style={styles.flatlist}
          data={children || []}
          renderItem={({item}) => (
            <ChildItem
              child={item}
              allClassroomsAccessible={allClassroomsAccessible}
              handleToggle={() => handleToggle(item.fullName)}
              handleMove={() => setShowModal(item)}
            />
          )}
          keyExtractor={item => item.fullName}
        />
      </View>
      {showModal?.fullName ? (
        <ClassroomModal
          close={() => setShowModal(undefined)}
          classrooms={data?.classrooms || []}
          handlePress={handleChangeClass}
        />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  classroom: {
    paddingTop: 20,
  },
  flatlist: {
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
  },
});
export default ClassroomScreen;
