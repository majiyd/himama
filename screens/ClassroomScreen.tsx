import React, {useContext, useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {IChildren} from '../@types/baseTypes';
import ChildItem from '../components/ChildItem';
import {AppContext} from '../context';

const ClassroomScreen = ({route}) => {
  const [children, setChildren] = useState<IChildren[] | undefined>(undefined);

  const {id} = route.params;
  const {data} = useContext(AppContext);
  const allClassroomsAccessible = data?.allClassroomsAccessible;

  useEffect(() => {
    getChildren();
  }, [data?.classrooms]);

  const getChildren = () => {
    const currentClass = data?.classrooms.find(
      classroom => classroom.id === id,
    );

    console.log('object', currentClass);
    setChildren(currentClass?.children);
  };

  return (
    <View style={styles.classroom}>
      <FlatList
        style={styles.flatlist}
        data={children || []}
        renderItem={({item}) => (
          <ChildItem
            child={item}
            allClassroomsAccessible={allClassroomsAccessible}
          />
        )}
      />
    </View>
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
