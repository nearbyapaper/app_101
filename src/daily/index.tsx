import React, {useEffect, useState} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Card, Text, Switch} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {dailyMissionReducer} from '../redux/reducers/daily-reducer';
import {RootState} from '../redux/store';

interface Mission {
  name: string;
  isDone: boolean;
  index: number;
}

interface BoardProps {
  missions: Mission[];
  handleSwitchChange: (index: number, value: boolean) => void;
}

const deviceWidth: number = Dimensions.get('window').width;

const MissionsBoard: React.FC<BoardProps> = ({
  missions,
  handleSwitchChange,
}) => {
  return (
    <View style={styles.container}>
      <Card style={styles.cardContainer}>
        <Text>Daily Mission</Text>
        <View style={styles.alignCenter}>
          {missions.map((mission, index) => (
            <View key={index} style={styles.cardContent}>
              <Text>{mission.name}</Text>
              <Switch
                value={mission.isDone}
                onValueChange={value => handleSwitchChange(index, value)}
              />
            </View>
          ))}
        </View>
      </Card>
    </View>
  );
};

const DailyMission: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const missionsList = useSelector((state: RootState) => state.dailyMission);
  const counter = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  console.log('missionsList : ', missionsList);
  console.log('counter : ', counter);

  useEffect(() => {
    const data: Mission[] = [
      {
        name: 'Mission 1',
        isDone: false,
        index: 0,
      },
      {
        name: 'Mission 2',
        isDone: false,
        index: 1,
      },
      {
        name: 'Mission 3',
        isDone: false,
        index: 2,
      },
      {
        name: 'Mission 4',
        isDone: false,
        index: 3,
      },
      {
        name: 'Mission 5',
        isDone: false,
        index: 0,
      },
    ];
    setMissions(data);
  }, []);

  const handleSwitchChange = (index: number, value: boolean) => {
    setMissions(prevMissions => {
      const newMissions = [...prevMissions];
      newMissions[index].isDone = value;
      return newMissions;
    });
  };

  return (
    <ScrollView style={styles.scrollviewContainer}>
      <View style={styles.boardContainer}>
        <MissionsBoard
          missions={missions}
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
});

export default DailyMission;
