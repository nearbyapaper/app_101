import {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {mainStyles} from '../styles/mainStyles';

const ExploreBusiness = () => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [haveCompetitor, setHaveCompetitor] = useState(false);
  const [haveLongValue, setHaveLongValue] = useState(false);
  const [haveShortValue, setHaveShortValue] = useState(false);

  return (
    <ScrollView style={mainStyles.scrollViewStyle}>
      <View style={mainStyles.colContainer}>
        <TextInput
          placeholder="Business Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Business Value"
          value={value}
          onChangeText={setValue}
        />
        <Switch
          value={haveCompetitor}
          onValueChange={setHaveCompetitor}
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={haveCompetitor ? '#f5dd4b' : '#f4f3f4'}
        />
        <Switch
          value={haveLongValue}
          onValueChange={setHaveLongValue}
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={haveLongValue ? '#f5dd4b' : '#f4f3f4'}
        />
        <Switch value={haveShortValue} onValueChange={setHaveShortValue} />
      </View>
    </ScrollView>
  );
};

export default ExploreBusiness;
