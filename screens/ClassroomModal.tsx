import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {IClassroom} from '../@types/baseTypes';

type Props = {
  close: () => void;
  classrooms: IClassroom[];
  handlePress: (id: string) => void;
};
const ClassroomModal = ({close, classrooms, handlePress}: Props) => {
  return (
    <Pressable style={styles.modal} onPress={close}>
      <TouchableOpacity style={styles.content} activeOpacity={1}>
        <Text style={styles.headerText}>Select new class</Text>
        <ScrollView>
          {classrooms.map((classroom: IClassroom) => (
            <Pressable
              style={styles.classroom}
              key={classroom.id}
              onPress={() => handlePress(classroom.id)}>
              <Text style={styles.text}>{classroom.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </TouchableOpacity>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0005',
    justifyContent: 'flex-end',
  },
  content: {
    height: '70%',
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  classroom: {
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 15,
  },
});
export default ClassroomModal;
