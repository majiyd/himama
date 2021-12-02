import {useNavigation} from '@react-navigation/core';
import React, {useContext} from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import {AppContext} from '../context';

type Props = {
  id: string;
  name: string;
};
const ClassroomListItem = ({id, name}: Props) => {
  const {data} = useContext(AppContext);
  const navigation = useNavigation();

  const allClassroomsAccessible = data?.allClassroomsAccessible;
  const teacherID = data?.id;
  const isDisabled = !allClassroomsAccessible && teacherID !== id;

  const handlePress = () => {
    if (isDisabled) {
      return;
    }
    // @ts-ignore
    navigation.navigate('Classroom', {id, name});
  };

  return (
    <Pressable
      style={[styles.item, isDisabled && styles.disabled]}
      onPress={handlePress}>
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    backgroundColor: 'blueviolet',
    marginBottom: 15,
    borderWidth: 0.5,
    borderRadius: 6,
  },
  text: {
    color: 'white',
  },
  disabled: {
    backgroundColor: '#ccc',
  },
});
export default ClassroomListItem;
