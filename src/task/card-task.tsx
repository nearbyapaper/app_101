import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Text, Chip, TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {deleteTask, updateTask} from '../redux/actions/task-action';
import {APP_THEME} from '../theme';

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
      dispatch(updateTask(updatedTask)).then((res: any) => {
        if (res !== undefined) {
          refreshTask();
        }
      });
    }
    setEditable(!editable);
  }, [editable, taskDetails, data, id, list, dispatch]);

  const handleDelete = useCallback(() => {
    const killTask = list.filter(task => task.id === id);
    if (killTask?.length > 0 && killTask) {
      const delTask = killTask[0];
      dispatch(deleteTask(delTask)).then((res: any) => {
        if (res !== undefined) {
          refreshTask();
        }
      });
    }
  }, [list, dispatch, id, refreshTask]);

  const handleChange = useCallback((field: keyof Task, value: string) => {
    setTaskDetails(prev => ({...prev, [field]: value}));
  }, []);

  return (
    <View>
      <Card style={styles.card}>
        <Text style={styles.textLabel} variant="bodyMedium">
          Task:
        </Text>
        <TextInput
          value={taskDetails.name}
          editable={editable}
          onChangeText={text => handleChange('name', text)}
          autoCapitalize="none"
          style={styles.input}
        />
        <Text style={styles.textLabel} variant="bodyMedium">
          Type:
        </Text>
        <TextInput
          value={taskDetails.type}
          editable={editable}
          onChangeText={text => handleChange('type', text)}
          autoCapitalize="none"
          style={styles.input}
        />
        <Text style={styles.textLabel} variant="bodyMedium">
          Status:
        </Text>
        <TextInput
          value={taskDetails.status}
          editable={editable}
          onChangeText={text => handleChange('status', text)}
          autoCapitalize="none"
          style={styles.input}
        />
        <Text style={styles.textLabel} variant="bodyMedium">
          Create: {data.createdDate?.toString() || new Date().toString()}
        </Text>
        <Text style={styles.textLabel} variant="bodyMedium">
          Detail:
        </Text>
        <TextInput
          value={taskDetails.detail}
          editable={editable}
          onChangeText={text => handleChange('detail', text)}
          autoCapitalize="none"
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
    color: APP_THEME.primaryColor,
  },
  input: {
    height: 40,
    marginBottom: 8,
    color: APP_THEME.textColorBlack,
    fontSize: APP_THEME.textSizeMedium,
  },
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  chip: {
    marginRight: 8,
  },
  textLabel: {
    color: APP_THEME.textColorBlack,
    fontSize: APP_THEME.textSizeMedium,
  },
});

export default CardTask;
