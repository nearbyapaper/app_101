import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View} from 'react-native';
import {FAB} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';

import CardTask from './card-task';
import LocalNotification from '../notification/local-notification';

function Task(): JSX.Element {
  //   const [selectedStartDate, setSelectedStartDate] = useState(null);
  //   const startDate = selectedStartDate
  //     ? selectedStartDate.format('YYYY-MM-DD').toString()
  //     : '';
  const counterState = useSelector(state => state.counter);
  const {count} = counterState;
  const dispatch = useDispatch();

  const [taskList, setTaskList] = useState([]);

  const handleAddTask = () => {
    setTaskList([...taskList, {id: taskList.length + 1}]);
  };

  console.log('taskList length: ', taskList.length);
  console.log('taskList : ', taskList);

  console.log('count : ', count);

  const notification = new LocalNotification();

  return (
    <View style={{flexDirection: 'row', flex: 1}}>
      <ScrollView style={{flexDirection: 'column', flex: 1}}>
        <View>
          {taskList?.length > 0 &&
            taskList.map((item, idx) => {
              // console.log('item :: ', item);
              // console.log('idx :: ', idx);
              return (
                <CardTask
                  id={idx}
                  data={item}
                  list={taskList}
                  setTaskList={setTaskList}
                />
              );
            })}
        </View>
      </ScrollView>
      <FAB
        label="Add"
        style={{
          position: 'absolute',
          margin: 8,
          right: 0,
          bottom: 0,
        }}
        // onPress={handleAddTask}
        onPress={() => dispatch({type: 'INCREMENT'})}
      />
      <FAB
        label="Noti"
        style={{
          position: 'absolute',
          margin: 8,
          right: 90,
          bottom: 0,
        }}
        // onPress={() => notification.alertLocalNotification()}
        onPress={() => dispatch({type: 'DECREMENT'})}
      />
    </View>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default Task;
