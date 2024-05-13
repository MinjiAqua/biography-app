import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import MainEssay from '../components/MainEssay';
import essaysStorage from '../storages/essaysStorage';
import {useNavigation} from '@react-navigation/native';
import usersStorage from '../storages/usersStorage';

function HomeHeader() {
  return (
    <View style={styles.homeHeader}>
      <Text>어플 로고</Text>
    </View>
  );
}

function MenuTab() {
  return (
    <View style={styles.menuTab}>
      <Text style={styles.newest}>최신글</Text>
      <View style={styles.line}></View>
    </View>
  );
}
//스크롤 뷰 넣을 것.
function HomeScreen() {
  const navigation = useNavigation();
  //글, 프로필 이미지, 닉네임 
  const [essays, setEssays] = useState([]);
  const [image, setImage] = useState();
  const [nickname, setNickname] = useState();

  useEffect(() => {
    const loadEssays = async () => {
      try {
        //로컬 스토리지에서 가져오는 코드.  
        //const storedEssays = await essaysStorage.get();
        // const filteredEssays = storedEssays
        //   .filter(item => item.isPublic)
        //   .reverse();
        // setEssays(filteredEssays);

        //서버에서 가져오는 코드
        
      } catch (error) {
        console.error('Error loading essays:', error);
      }
    };

    const loadUser = async () => {
      try {
        const image = await usersStorage.getImage();
        const nickname = await usersStorage.getNickname();
        setImage(image);
        setNickname(nickname);
      } catch (error) {
        console.error('Error loading user:', error);
      }
    };
    loadEssays();
    loadUser();
  }, []);

  const handleEssayPress = item => {
    navigation.navigate('MoveToEssay', {
      question: item.question,
      title: item.title,
      body: item.body,
      time: item.createdAt,
      nickname: nickname,
      image: image,
    });
  };

  return (
    <View style={styles.block}>
      <HomeHeader />
      <MenuTab />

      <View style={styles.essay}>
        <FlatList
          data={essays}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleEssayPress(item)}>
              <MainEssay
                question={item.question}
                title={item.title}
                body={item.body}
                time={item.createdAt}
                nickname={nickname}
                image={image}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  essay: {
    marginTop: 10,
  },
  homeHeader: {
    height: 50,
  },
  menuTab: {
    height: 30,
    alignItems: 'center',
  },
  essayZone: {
    alignItems: 'center',
  },
  line: {
    height: 2,
    width: '20%',
    backgroundColor: '#EC8F8F',
    borderStyle: 'dotted',
  },

  //텍스트
  newest: {
    fontSize: 20,
    paddingBottom: 8,
  },
});
export default HomeScreen;
