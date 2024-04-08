import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';


const axiosInstance = axios.create({
  baseURL: 'https://autobiography-9d461.web.app',
});
//headers - 필요 X


export const signIn = async (email, password) => {
  try {
    console.log('email, password : ', email, password);
    const response = await axiosInstance.post('/auth/sign-in', {
      email,
      password,
    });


    const { success, accessToken, refreshToken } = response.data;

    console.log(
      'success:', success,
      'accessToken:', accessToken,
      'refreshToken:', refreshToken
    );

    await EncryptedStorage.setItem('accessToken', accessToken);
    await EncryptedStorage.setItem('refreshToken', refreshToken);
    await EncryptedStorage.setItem('email', email);

    const storedAccessToken = await EncryptedStorage.getItem('accessToken');
    console.log('로컬에서 가져온 값 : ', storedAccessToken);
  
  } catch (error) {
    console.error('일반 로그인 중 실패 : ', error);
  }
};

// 카카오 로그인 수정 필요!
export const kakaoLogin = async () => {
  try {
    const response = await axiosInstance.post(`${baseUrl}/auth/kakao/callback`, {
      token_type,
      access_token,
      expires_in,
      code,
    });
  } catch (error) {
    console.error('카카오 로그인 실패 : ', error);
  }
};

export const reissueTokens = async () => {
  try {
    const refreshToken = await EncryptedStorage.getItem("refreshToken");
    const response = await axiosInstance.post('/auth/renew', { refreshToken });
    return response.data; // 수정 필요
  } catch (error) {
    console.error('토큰 재발급 실패 : ', error);
    throw error;
  }
};

export const sign_out = async () => {
  try {
    const access_Token = await EncryptedStorage.getItem('accessToken');

    await axiosInstance.post('/auth/sign-out', {access_token}, 
    {
      headers: {
        Authorization: `Bearer ${access_Token}`,
      },
    });

    await EncryptedStorage.removeItem('refreshToken', 'accessToken');
    console.log('로그아웃 성공');
  } catch (error) {
    console.error('로그아웃 실패 : ', error);
  }
};