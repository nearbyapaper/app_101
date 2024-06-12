import React, {useEffect, useState, useCallback} from 'react';
import {View, FlatList, SafeAreaView, StyleSheet, Text} from 'react-native';
import {FAB} from 'react-native-paper';
import CardTask from './card-task';
import {getTask, createTask, Task} from '../redux/actions/task-action';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {ADD_TASK} from '../redux/types/task-type';

const MyTask: React.FC = (): JSX.Element => {
  const taskListReducer = useSelector(
    (state: RootState) => state.task.taskList,
  );
  const userLogin = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [taskList, setTaskList] = useState<Task[]>([]);

  useEffect(() => {
    getUserTask();
  }, []);

  useEffect(() => {
    setTaskList(taskListReducer);
  }, [taskListReducer]);

  // console.log('taskListReducer :: ' + taskListReducer);
  // console.log('taskList :: ' + taskList);

  const handleAddTask = useCallback(() => {
    const taskId: string = (
      taskList?.length +
      1 +
      new Date().getTime()
    ).toString();
    if (userLogin?.username) {
      const newTask: Task = {
        id: taskId,
        name: '',
        type: '',
        status: '',
        detail: '',
        targetDate: '',
        createdDate: new Date().toString(),
        createdUser: userLogin.username,
      };
      dispatch({type: ADD_TASK, payload: newTask});
      dispatch(createTask(newTask)).then((res: any) => {
        if (res !== undefined) {
          getUserTask();
        }
      });
    }
  }, [dispatch, getUserTask, taskList, userLogin?.username]);

  const getUserTask = useCallback(() => {
    if (userLogin?.username) {
      dispatch(getTask(userLogin.username));
    }
  }, [dispatch, userLogin?.username]);

  const renderItem = useCallback(
    ({item}: {item: Task}) => (
      <CardTask
        data={item}
        id={item.id}
        list={taskList}
        refreshTask={getUserTask}
      />
    ),
    [getUserTask, taskList],
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
