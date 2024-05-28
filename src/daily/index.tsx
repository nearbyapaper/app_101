// src/components/DailyMission.tsx
import React, {useState} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Card, Text, Switch} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {UPDATE} from '../redux/types/dialy-type';
import {Mission} from '../redux/reducers/daily-reducer';
import AddModal from './add-modal';

const deviceWidth: number = Dimensions.get('window').width;

interface BoardProps {
  missions: Mission[];
  handleSwitchChange: (index: number, value: boolean) => void;
}

const MissionsBoard: React.FC<BoardProps> = ({
  missions,
  handleSwitchChange,
}) => {
  const [visiblePopup, setVisiblePopup] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Card style={styles.cardContainer}>
        <View style={styles.row}>
          <Text>Daily Mission</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setVisiblePopup(true)}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.alignCenter}>
          {missions.map((mission, index) => (
            <View key={index} style={styles.cardContent}>
              <Text>{mission.name}</Text>
              <Switch
                value={mission.isDone}
                onValueChange={value => handleSwitchChange(index, value)}
              />
            </View>
          ))}
        </View> */}
        {missions.length > 0 && (
          <FlatList
            data={missions}
            renderItem={({item, index}) => (
              <View key={index} style={styles.cardContent}>
                <Text>{item.name}</Text>
                <Switch
                  value={item.isDone}
                  onValueChange={value => handleSwitchChange(index, value)}
                />
              </View>
            )}
            keyExtractor={item => item.name}
          />
        )}
      </Card>
      <AddModal visible={visiblePopup} setVisible={setVisiblePopup} />
    </View>
  );
};

const DailyMission: React.FC = () => {
  const dispatch = useDispatch();
  const missionsReducerList = useSelector(
    (state: RootState) => state.dailyMission.missionList,
  );

  const handleSwitchChange = (index: number, value: boolean) => {
    const newMissions = missionsReducerList.map((mission, i) =>
      i === index ? {...mission, isDone: value} : mission,
    );

    dispatch({
      type: UPDATE,
      payload: newMissions,
    });
  };

  return (
    <ScrollView style={styles.scrollviewContainer} nestedScrollEnabled={true}>
      <View style={styles.boardContainer}>
        <MissionsBoard
          missions={missionsReducerList}
          handleSwitchChange={handleSwitchChange}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    padding: 8,
    marginTop: 16,
    width: deviceWidth * 0.9,
  },
  alignCenter: {
    alignItems: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
  },
  scrollviewContainer: {
    marginHorizontal: 18,
  },
  boardContainer: {
    flex: 1,
    alignItems: 'center',
  },
  addButton: {
    marginLeft: 16,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 5,
  },
  row: {flexDirection: 'row'},
});

export default DailyMission;
