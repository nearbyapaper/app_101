import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {View, Image, StyleSheet, ScrollView} from 'react-native';
import {mainStyles} from '../styles/mainStyles';
import VIText from '../utility/VIText';
import VIButton from '../utility/VIButton';
import {
  saveBusiness,
  loadBusinessStart,
  loadBusinessError,
} from '../redux/reducers/business-reducer'; // Import missing actions
import VITextInput from '../utility/VITextInput';

const HomePage = () => {
  const dispatch = useDispatch();
  const businessStore = useSelector(state => state.business); // Verify state shape
  const [name, setName] = useState('');

  const {currentBusiness} = businessStore || {};

  const gotoExplore = () => {
    dispatch(loadBusinessStart());

    try {
      const businessData = {
        name: name || 'Unnamed Business',
        value: '100,000',
        haveCompetitor: true,
        haveLongValue: false,
        youAcceptThisValue: true,
      };
      dispatch(saveBusiness(businessData)); // Ensure this action is dispatched correctly
    } catch (error) {
      dispatch(loadBusinessError(error.message)); // Dispatch error if something goes wrong
    }
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View style={mainStyles.colContainer}>
        <VIText
          title={'Rule 1 : อย่าขาดทุน'}
          myStyle={mainStyles.titleTextStyle}
        />
        <VIText
          title={'Rule 2 : อย่าลืมกฎข้อที่ 1'}
          myStyle={mainStyles.titleTextStyle}
        />
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <VIText title={'หุ้นคือธุรกิจ'} myStyle={mainStyles.titleTextStyle} />
        <VIText
          title={
            'ซื้อธุรกิจที่ดีและยอดเยี่ยม และซื้อราคาที่เหมาะสม หุ้นคือธุกิจ มันไม่สมเหตุสมผลเลยที่จะซื้อธุรกิจโดยที่เราไม่รู้ว่าธุรกิจนี้ทำอะไรและสร้างผลงานเป็นอย่างไร'
          }
        />
        <VIText
          title={
            'เราจะซื้อธุรกิจที่ชนะอย่างแน่นอน มีความได้เปรียบทางการแข่งขันอย่างยั่งยืน เธอต้องมองให้ลึกลงไปถึงจะพบเหมือนกับ "แหจับปลา" '
          }
          myStyle={mainStyles.titleTextStyle}
        />
        <View style={styles.inputContainer}>
          <VITextInput label={'Business Name'} value={name} action={setName} />
          <VIButton title={'Explore Business'} action={gotoExplore} />
        </View>
        <VIText
          title={
            'State check Business Name : ' + (currentBusiness?.name || 'N/A')
          }
          myStyle={mainStyles.titleTextStyle}
        />
      </View>
    </ScrollView>
  );
};

// Define styles in a StyleSheet
const styles = StyleSheet.create({
  container: {
    padding: 16, // Add some padding for better layout
  },
  logo: {
    width: 100,
    height: 100,
    marginVertical: 16,
    alignSelf: 'center',
  },
  inputContainer: {
    marginTop: 16,
    alignSelf: 'center',
  },
});

export default HomePage;
