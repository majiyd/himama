import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {IChildren} from '../@types/baseTypes';

type Props = {
  child: IChildren;
  allClassroomsAccessible: boolean | undefined;
  handleToggle: () => void;
  handleMove: () => void;
};
const ChildItem = ({
  child,
  allClassroomsAccessible,
  handleToggle,
  handleMove,
}: Props) => {
  const {fullName, checked_in} = child;

  return (
    <View style={styles.item}>
      <View>
        <Image
          style={styles.image}
          source={{
            uri: `https://via.placeholder.com/100.png/09f/fff?text=${fullName.charAt(
              0,
            )}`,
          }}
        />
      </View>

      <View style={styles.details}>
        <Text>{fullName}</Text>
        <Pressable style={styles.status} hitSlop={10} onPress={handleToggle}>
          <Text>Attendance: </Text>
          <Text
            testID={fullName}
            style={[
              styles.statusText,
              {color: checked_in ? 'green' : 'tomato'},
            ]}>
            {checked_in ? 'In' : 'Out'}
          </Text>
        </Pressable>
      </View>

      {allClassroomsAccessible ? (
        <View style={styles.move}>
          <Pressable hitSlop={8} onPress={handleMove}>
            <Text style={styles.moveText} testID={`${fullName}-move`}>
              Move
            </Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 0.5,
    borderRadius: 10,
    alignItems: 'stretch',
  },
  image: {
    height: 100,
    width: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  details: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 5,
    paddingVertical: 10,
  },
  move: {
    justifyContent: 'flex-end',
    paddingRight: 15,
    paddingBottom: 5,
  },
  status: {
    flexDirection: 'row',
  },
  statusText: {
    textDecorationLine: 'underline',
  },
  moveText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
export default ChildItem;
