import React, {useContext, useEffect, useState, useCallback} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

import database from '@react-native-firebase/database';
import {AppContext} from '../context';
import {IAppData} from '../@types/baseTypes';
import ClassroomListItem from '../components/ClassroomListItem';

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {data, updateData} = useContext(AppContext);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const snapshot = await database().ref('/data/center').once('value');

      const newData: IAppData = snapshot.val();
      setLoading(false);

      if (updateData) {
        updateData(newData);
      }
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.home}>
      <Text style={styles.headerText}>Classrooms</Text>
      <FlatList
        data={data?.classrooms ?? []}
        renderItem={({item}) => (
          <ClassroomListItem name={item?.name} id={item?.id} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
  },
});
export default HomeScreen;
