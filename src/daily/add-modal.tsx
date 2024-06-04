import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Modal from 'react-native-modal/dist/modal';
import {ADD} from '../redux/types/dialy-type';
import {useDispatch, useSelector} from 'react-redux';
import {Mission} from '../redux/reducers/daily-reducer';
import {RootState} from '../redux/store';

export interface ModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const AddModal: React.FC<ModalProps> = ({visible, setVisible}) => {
  const [name, setName] = useState<string>('');
  const dispatch = useDispatch();
  const missionList = useSelector(
    (state: RootState) => state.dailyMission.missionList,
  );
  const handleSave = () => {
    const newMission: Mission = {
      name,
      isDone: false,
      index: missionList.length,
    };

    dispatch({
      type: ADD,
      payload: newMission,
    });
    setVisible(false);
    setName('');
  };

  useEffect(() => {
    return () => {
      console.log('clean up state');
      setName('');
    };
  }, []);

  return (
    <Modal
      hasBackdrop={true}
      backdropOpacity={0.6}
      backdropColor={'black'}
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
      style={styles.modal}>
      <View style={styles.modalView}>
        <View style={styles.container}>
          <Text style={styles.modalText}>Name :</Text>
          <TextInput
            value={name}
            onChangeText={val => setName(val)}
            style={styles.inputTextName}
          />
        </View>
        <View>
          <TouchableOpacity onPress={handleSave} style={styles.okButton}>
            <Text>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modal: {flex: 1, margin: 0, justifyContent: 'flex-end'},
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  okButton: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  inputTextName: {
    width: '60%',
    borderWidth: 1,
    padding: 10,
    marginLeft: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

export default AddModal;
