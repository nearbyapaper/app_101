import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Text, Chip, TextInput} from 'react-native-paper';

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
  setTaskList: (list: Task[]) => void;
}

const CardTask: React.FC<CardTaskProps> = ({data, id, list, setTaskList}) => {
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(data.name);
  const [type, setType] = useState(data.type);
  const [status, setStatus] = useState(data.status);
  const [detail, setDetail] = useState(data.detail);
  const [targetDate, setTargetDate] = useState(data.targetDate);

  useEffect(() => {
    setName(data.name);
    setType(data.type);
    setStatus(data.status);
    setDetail(data.detail);
    setTargetDate(data.targetDate);
  }, [data]);

  const handleEditOrSave = () => {
    if (editable) {
      const updatedTask: Task = {
        ...data,
        name,
        type,
        status,
        detail,
        targetDate,
      };

      const updatedList = list.map(task =>
        task.id === id ? updatedTask : task,
      );
      setTaskList(updatedList);
    }
    setEditable(!editable);
  };

  const handleDelete = () => {
    const updatedList = list.filter(task => task.id !== id);
    setTaskList(updatedList);
  };

  return (
    <View>
      <Card style={styles.card}>
        <Text variant="bodyMedium">Task :</Text>
        <TextInput
          value={name}
          editable={editable}
          onChangeText={setName}
          style={styles.input}
        />
        <Text variant="bodyMedium">Type :</Text>
        <TextInput
          value={type}
          editable={editable}
          onChangeText={setType}
          style={styles.input}
        />
        <Text variant="bodyMedium">Status : </Text>
        <TextInput
          value={status}
          editable={editable}
          onChangeText={setStatus}
          style={styles.input}
        />
        <Text variant="bodyMedium">
          Create : {data.createdDate?.toString() || new Date().toString()}
        </Text>
        <Text variant="bodyMedium">Detail : </Text>
        <TextInput
          value={detail}
          editable={editable}
          onChangeText={setDetail}
          style={styles.input}
        />
        <View style={styles.chipContainer}>
          <Chip onPress={handleEditOrSave} style={styles.chip}>
            {!editable ? 'Edit' : 'Save'}
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
    marginBottom: 4,
  },
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  chip: {
    marginRight: 8,
  },
});

export default CardTask;
