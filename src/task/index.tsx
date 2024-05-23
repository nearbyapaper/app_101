import React, {useState} from 'react';
import {View, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import CardTask from './card-task';

interface Task {
  id: string;
  name: string;
  type: string;
  status: string;
  detail: string;
  targetDate: string;
  createdDate?: string;
}

const Task: React.FC = (): JSX.Element => {
  const [taskList, setTaskList] = useState<Task[]>([]);

  const handleAddTask = () => {
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
    setTaskList([...taskList, newTask]);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <SafeAreaView style={styles.safeAreaView}>
          {taskList.length > 0 && (
            <FlatList
              data={taskList}
              renderItem={({item}) => (
                <CardTask
                  data={item}
                  id={item.id}
                  list={taskList}
                  setTaskList={setTaskList}
                />
              )}
              keyExtractor={item => item.id}
            />
          )}
        </SafeAreaView>
      </ScrollView>
      <FAB label="Add" style={styles.fab} onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  scrollView: {
    flexDirection: 'column',
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 8,
    right: 0,
    bottom: 0,
  },
});

export default Task;
