import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Text, Chip, TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {deleteTask} from '../redux/actions/task-action';

interface Task {
  id: string;
  name: string;
  type: string;
  status: string;
  detail: string;
  targetDate: string;
  createdDate?: string;
}

interface CardTaskProps {
  data: Task;
  id: string;
  list: Task[];
  refreshTask: () => void;
}

const CardTask: React.FC<CardTaskProps> = ({data, id, list, refreshTask}) => {
  const [editable, setEditable] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    name: data.name,
    type: data.type,
    status: data.status,
    detail: data.detail,
    targetDate: data.targetDate,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setTaskDetails({
      name: data.name,
      type: data.type,
      status: data.status,
      detail: data.detail,
      targetDate: data.targetDate,
    });
  }, [data]);

  const handleEditOrSave = useCallback(() => {
    if (editable) {
      const updatedTask: Task = {...data, ...taskDetails};
      const updatedList = list.map(task =>
        task.id === id ? updatedTask : task,
      );

      dispatch({type: 'UPDATE_TASK', payload: updatedList});
    }
    setEditable(!editable);
  }, [editable, taskDetails, data, id, list, dispatch]);

  const handleDelete = useCallback(() => {
    const killTask = list.filter(task => task.id !== id);
    dispatch(deleteTask(killTask)).then((res: any) => {
      console.log('Task deleted successfully :' + res);
      if (res !== undefined) {
        refreshTask();
      }
    });
  }, [list, dispatch, id, refreshTask]);

  const handleChange = useCallback((field: keyof Task, value: string) => {
    setTaskDetails(prev => ({...prev, [field]: value}));
  }, []);

  return (
    <View>
      <Card style={styles.card}>
        <Text variant="bodyMedium">Task:</Text>
        <TextInput
          value={taskDetails.name}
          editable={editable}
          onChangeText={text => handleChange('name', text)}
          style={styles.input}
        />
        <Text variant="bodyMedium">Type:</Text>
        <TextInput
          value={taskDetails.type}
          editable={editable}
          onChangeText={text => handleChange('type', text)}
          style={styles.input}
        />
        <Text variant="bodyMedium">Status:</Text>
        <TextInput
          value={taskDetails.status}
          editable={editable}
          onChangeText={text => handleChange('status', text)}
          style={styles.input}
        />
        <Text variant="bodyMedium">
          Create: {data.createdDate?.toString() || new Date().toString()}
        </Text>
        <Text variant="bodyMedium">Detail:</Text>
        <TextInput
          value={taskDetails.detail}
          editable={editable}
          onChangeText={text => handleChange('detail', text)}
          style={styles.input}
        />
        <View style={styles.chipContainer}>
          <Chip onPress={handleEditOrSave} style={styles.chip}>
            {editable ? 'Save' : 'Edit'}
          </Chip>
          <Chip onPress={handleDelete} style={styles.chip}>
            Delete
          </Chip>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 16,
  },
  input: {
    height: 40,
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  chip: {
    marginRight: 8,
  },
});

export default CardTask;
