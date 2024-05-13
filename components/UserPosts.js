import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import Post from './Post';
import essaysStorage from '../storages/essaysStorage';
import {useNavigation} from '@react-navigation/native';
import { seeMyEssay } from '../api/essayApi';

function UserPosts() {
  const [essays, setEssays] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const loadEssays = async () => {
      //essaysStorage에서 가져오는 부분.  
      //try {
      //   const storedEssays = await essaysStorage.get();
      //   setEssays(storedEssays);
      // } catch (error) {
      //   console.error('Error loading essays:', error);
      // }
      try {
        const myEssays = await seeMyEssay();
        
        setEssays(myEssays);
        console.log("myEssays : ", essays);
      }catch(error){
        console.error('Error loading essays:', error);
      }

    };
    
    loadEssays();
  }, []);

  // const handleMyEssayPress = item => {
  //   console.log(item);
  //   navigation.navigate('MoveToMyEssay', {
  //     id: item.id,
  //     question: item.question,
  //     title: item.title,
  //     body: item.body,
  //     time: item.createdAt,
  //     isPublic: item.isPublic,
  //   });
  // };

  //글 순서 바꾸기
  const reverseOrder = () => {
    setEssays(prevEssays => [...prevEssays].reverse());
  };

  return (
    <>
      <Button title="Reverse Order" onPress={reverseOrder} />
      <FlatList
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        style={styles.list}
        data={essays}
        keyExtractor={item => item.id.toString()} //각 아이템의 고유 키 지정
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleMyEssayPress(item)}>
            <Post
              // id={item.id}
              //question={item.question}
              title={item.title}
              body={item.content}
              //time={item.createdAt}
            />
          </TouchableOpacity>
        )}
      />
    </>
  );
}

export default UserPosts;

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
});
