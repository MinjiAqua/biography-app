import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const baseURl = 'https://autobiography-9d461.web.app';

export const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${baseURl}/auth/sign-in`, {
      email: email,
      password: password,
    });

    const success = response.data.success;
    const access_token = response.data.accessToken;
    const refresh_token = response.data.refreshToken;

    console.log(
      'success',
      success,
      'access_token : ',
      access_token,
      'refresh_token : ',
      refresh_token,
    );

    await EncryptedStorage.setItem('accessToken', access_token);
    await EncryptedStorage.setItem('refreshToken', refresh_token);
    await EncryptedStorage.setItem('email', email);

    let accessToken= await EncryptedStorage.getItem('accessToken');

    console.log('로컬에서 가져온 값 : ', accessToken);
  
  } catch (error) {
    console.error('일반 로그인 중 실패 : ', error);
  }
};

//카카오 로그인은 잘 모르겠다.
export const kakaoLogin = async () => {
  try {
    const response = await axios.post(`${baseUrl}/auth/kakao/callback`, {
      token_type,
      access_token,
      expires_in,
      code,
    });
  } catch (error) {}
};


export const reissueTokens = async() => {
  const refreshToken = EncryptedStorage.getItem("refreshToken");
  const response = await axios.post(`${baseURl}/auth/renew`,{refreshToken});
  return response.data; //수정 필요
}


export const sign_out = async () => {
  try {
    const access_token = await EncryptedStorage.getItem('accessToken');

    await axios.post(
      `{baseUrl}/auth/sign-out`,
      {access_token},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    await EncryptedStorage.removeItem('refreshToken', 'accessToken');
    console.log('로그아웃 성공 : ', error);
  } catch (error) {
    console.error('로그아웃 실패 : ', error);
  }
};
