import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

function Post({question, title, body, time}) {
  const formatDate = time => {
    const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
    const formattedDate = new Date(time).toLocaleString(undefined, options);
    const [year, month, day] = formattedDate.split(/\D+/);

    return `${year}.${month}.${day}`;
  };
  //<Text style={styles.body}>{formatDate(time)}</Text>
  //<Text style={styles.question}>{question}</Text>
  return (
    <View style={styles.item}>
      <View>
        
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
      <Image
        style={styles.image}
        source={{
          uri: 'https://likethiz.com/data/file/gallery/2077540943_90KxelSh_13f1251162a192e90feb5359ae276044abce20de.jpg',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {padding: 15, alignsItems: 'center', flexDirection: 'row'},
  question: {flex: 1, fontSize: 12, color: '#808080'},
  title: {
    flex: 1,
    padding: 3,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  body: {flex: 1, fontSize: 14, color: '#505050'},
  image: {borderRadius: 20, flex: 1},
});

export default Post;
