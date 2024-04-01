import {React, useState} from 'react';
import {Button, TextInput, StyleSheet, View} from 'react-native';
import {signIn} from '../api/signinApi';

function SignInScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();

  const requestSignin = async () => {
    try {
      console.log('email, password : ', email, password);
      const response = await signIn(email, password);
      navigation.navigate('ModifyProfile');
      
    } catch (error) {
      console.error('일반 로그인 요청 실패 : ', error);
    }
    
  };

  return (
    <>
      <View>
        <TextInput
          placeholder="이메일"
          style={styles.input}
          value={email}
          onChangeText={value => setEmail(value)}
        />
        <TextInput
          placeholder="비밀번호"
          style={styles.input}
          value={password}
          onChangeText={value => setPassword(value)}
        />
      </View>
      <Button title="로그인" style={styles.button} onPress={requestSignin} />
    </>
  );
}

const styles = StyleSheet.create({
  block: {},
  input: {},
  button: {
    color: 'pink',
    backgroundColor: 'pink',
  },
});

export default SignInScreen;
