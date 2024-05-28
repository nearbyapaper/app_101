import React, {useEffect, useState, useCallback} from 'react';
import {View, FlatList, SafeAreaView, StyleSheet, Text} from 'react-native';
import {FAB} from 'react-native-paper';
import CardTask from './card-task';
import {Task} from '../redux/actions/task-action';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {ADD_TASK} from '../redux/types/task-type';

const MyTask: React.FC = (): JSX.Element => {
  const taskListReducer = useSelector(
    (state: RootState) => state.task.taskList,
  );
  const dispatch = useDispatch();
  const [taskList, setTaskList] = useState<Task[]>(taskListReducer);

  useEffect(() => {
    setTaskList(taskListReducer);
  }, [taskListReducer]);

  const handleAddTask = useCallback(() => {
    const taskId: string = (
      taskList.length +
      1 +
      new Date().getTime()
    ).toString();
    const newTask: Task = {
      id: taskId,
      name: '',
      type: '',
      status: '',
      detail: '',
      targetDate: '',
      createdDate: new Date().toString(),
    };
    dispatch({type: ADD_TASK, payload: newTask});
  }, [dispatch, taskList.length]);

  const renderItem = useCallback(
    ({item}: any) => <CardTask data={item} id={item.id} list={taskList} />,
    [taskList],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={taskList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <View style={styles.emptyList}>
            <Text>No Tasks Available</Text>
          </View>
        }
        contentContainerStyle={styles.contentContainer}
      />
      <FAB label="Add" style={styles.fab} onPress={handleAddTask} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default MyTask;
