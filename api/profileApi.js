// profileApi 기존 코드. 전체 복사. 

import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const baseUrl = 'https://autobiography-9d461.web.app';

export const createProfile = async (nickname, introduce, profilePicture) => {
  let accessToken = await EncryptedStorage.getItem('accessToken');
  let useremail = await EncryptedStorage.getItem('email');
  console.log("useremail", useremail);
  console.log("토큰받아오기 : ", accessToken);
  try {
    const response = await axios.put(
      `${baseUrl}/api/profile`,
      JSON.stringify({
        nickname: nickname,
        introduce: introduce,
        profilePicture: profilePicture,
        username : useremail,
      }),
      {
        headers: {
        Authorization: `Bearer ${accessToken}`, 
        'Content-Type': 'application/json'
      }},
    );

    console.log('프로필이 성공적으로 저장되었습니다 : ', response.data);
    return response.data;
  } catch (error) {
    console.log("오류 : ", error);
}};

export const updateProfile = async (nickname, introduce, profilePicture) => {
  try {
    let accessToken = await EncryptedStorage.getItem('accessToken');
    console.log('accessToken : ', accessToken);
    const response = await axios.put(
      `${baseUrl}/api/profile`,
      {
        nickname: nickname,
        introduce: introduce,
        profilePicture: profilePicture,
      },
      {headers: {Authorization: `Bearer ${accessToken}`}},
    );

    console.log('프로필이 성공적으로 수정되었습니다: ', response.date);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status == 401) {
      try {
        const refreshToken = await EncryptedStorage.getItem('refreshToken');
        const refreshResponse = await axios.put(`${baseUrl}/auth/renew`, {
          refreshToken: refreshToken,
        });
        accessToken = refreshResponse.data.accessToken;
        //다시 재요청 보내기
        await EncryptedStorage.setItem('accessToken', accessToken);
        const response = await axios.put(
          `${baseUrl}/api/profile`,
          {
            nickname: nickname,
            introduce: introduce,
            profilePicture: profilePicture,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        console.log('프로필이 성공적으로 저장되었습니다. ', response.data);
      } catch (refreshError) {
        console.error('액세스 토큰 갱신 중 에러 발생 : ', refreshError);
        throw refreshError;
      }
    } else {
      console.error('게시글을 올리는 도중 오류 발생함:', error);
      throw error;
    }
  }
};
