import {React, useState} from 'react';
import {View, StyleSheet, Button, Text} from 'react-native';
import UserPosts from '../components/UserPosts';
import UserProfile from '../components/UserProfile';
import { seeMyEssay } from '../api/essayApi';

function MyPage({navigation}) {
  const moveToListScreen = () => {
    navigation.navigate('List');
  };
  const moveToProfileSetupScreen = () => {
    navigation.navigate('SetupProfile');
  };
  const moveToModifyProfileScreen = () => {
    navigation.navigate('ModifyProfile');
  };
  const moveToSettingScreen = () =>{
    navigation.navigate('Setting');
  };

  const [text, setText] = useState('');
  const showMyEssay = async () => {
    try {
        const result = await seeMyEssay(); 
        setText(result);
        console.log("결과값",result);
        return text;
    } catch (error) {
        console.error('내 글을 불러오는 중에 오류 발생:', error);
        throw error;
    }
};
//<UserProfile />
  return (
    <View style={styles.block}>
      <Button title="Move to ListScreen" onPress={moveToListScreen} />
      <Button title="Move to SetupProfile" onPress={moveToProfileSetupScreen} />
      <Button
        title="Move to ModifyProfile"
        onPress={moveToModifyProfileScreen}
      />
      
      <Button title="내 글 보기" onPress={showMyEssay}/>
      <Button title="Move to SettingScreen" onPress={moveToSettingScreen}/>
      <Text>{text}</Text>
      <UserPosts />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

export default MyPage;
