import React, {useEffect, useState, useCallback} from 'react';
import {View, FlatList, SafeAreaView, StyleSheet, Text} from 'react-native';
import {FAB} from 'react-native-paper';
import CardTask from './card-task';
import {getTask, createTask, Task} from '../redux/actions/task-action';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {ADD_TASK} from '../redux/types/task-type';
import CallAPIHandler from '../utility/call-api-handler';
import {APP_THEME} from '../theme';

const MyTask: React.FC = (): JSX.Element => {
  const taskListReducer = useSelector(
    (state: RootState) => state.task.taskList,
  );
  const taskLoading = useSelector((state: RootState) => state.task.loading);
  const errorResp = useSelector((state: RootState) => state.task.error);
  const taskError = errorResp !== null;
  const taskNotFound = errorResp === null && taskListReducer?.length === 0;
  const userLogin = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [taskList, setTaskList] = useState<Task[]>([]);

  const getUserTask = useCallback(() => {
    if (userLogin?.username) {
      dispatch(getTask(userLogin.username));
    }
  }, [dispatch, userLogin?.username]);

  useEffect(() => {
    getUserTask();
  }, [getUserTask]);

  useEffect(() => {
    setTaskList(taskListReducer);
  }, [taskListReducer]);

  const handleAddTask = useCallback(() => {
    const taskId = (taskList?.length + 1 + new Date().getTime()).toString();
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
      dispatch(createTask(newTask))
        .then((res: any) => {
          if (res !== undefined) {
            getUserTask();
          }
        })
        .catch((error: any) => {
          console.error('Error creating task: ', error);
        });
    }
  }, [dispatch, getUserTask, taskList, userLogin?.username]);

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
      <CallAPIHandler
        isLoading={taskLoading}
        isError={taskError}
        isNotFound={taskNotFound}
        errorMessage={errorResp !== null && errorResp ? errorResp : ''}
        callback={getUserTask}>
        <FlatList
          data={taskList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <View style={styles.emptyList}>
              <Text style={styles.textEmpty}>No Tasks Available</Text>
            </View>
          }
          contentContainerStyle={styles.contentContainer}
        />
        <FAB label="Add" style={styles.fab} onPress={handleAddTask} />
      </CallAPIHandler>
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
  textEmpty: {
    color: APP_THEME.textColorBlack,
    fontSize: APP_THEME.textSizeLarge,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default MyTask;
