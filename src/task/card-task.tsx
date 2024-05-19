import React, {useState} from 'react';
import {View} from 'react-native';
import {Card, Text, Chip, TextInput} from 'react-native-paper';

function CardTask(props): JSX.Element {
  //   const startDate = selectedStartDate
  //     ? selectedStartDate.format('YYYY-MM-DD').toString()
  //     : '';

  const {data, id, setTaskList, list} = props || '';

  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(data?.name || '');
  const [type, setType] = useState(data?.type || '');
  const [status, setStatus] = useState(data?.status || '');
  const [detail, setDetail] = useState(data?.detail || '');
  const [targetDate, setTargetDate] = useState(data?.targetDate || '');

  console.log('props :', props);
  console.log('key :', id);

  const handleEditOrSave = () => {
    if (editable) {
      const taskData = {
        id: id,
        name: name,
        type: type,
        status: status,
        createdDate: data.createdDate,
        targetDate: targetDate,
        detail: detail,
      };

      let tempList = [...list];
      tempList[id] = taskData;
      setTaskList(tempList);
    }
    setEditable(!editable);
  };

  const handleDelete = () => {
    let tempList = [...list];
    console.log('bf delete', tempList);
    console.log('id', id);
    tempList = tempList.filter(t => t.id !== id + 1);
    console.log('handle delete', tempList);

    // setTaskList(...tempList);
  };

  return (
    <View>
      <Card style={{margin: 16, padding: 16}}>
        <Text variant="bodyMedium">Task :</Text>
        <TextInput
          editable={editable}
          onChangeText={text => setName(text)}
          style={{height: 40, marginBottom: 4}}
        />
        <Text variant="bodyMedium">Type :</Text>
        <TextInput
          editable={editable}
          onChangeText={text => setType(text)}
          style={{height: 40, marginBottom: 4}}
        />
        <Text variant="bodyMedium">Status : </Text>
        <TextInput
          editable={editable}
          onChangeText={text => setStatus(text)}
          style={{height: 40, marginBottom: 4}}
        />
        <Text variant="bodyMedium">
          Create : {data?.createdDate?.toString() || new Date().toString()}
        </Text>
        <Text variant="bodyMedium">Detail : </Text>
        <TextInput
          editable={editable}
          onChangeText={text => setDetail(text)}
          style={{height: 40, marginBottom: 4}}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 8,
          }}>
          <Chip onPress={handleEditOrSave} style={{marginRight: 8}}>
            {!editable ? 'Edit' : 'Save'}
          </Chip>
          <Chip onPress={handleDelete}>Delete</Chip>
        </View>
      </Card>
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

export default CardTask;
