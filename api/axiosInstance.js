import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const baseURL = 'https://autobiography-9d461.web.app';
const axiosInstance = axios.create({ baseURL });



const reissueToken = async () => {
    try {
        const refreshToken = await EncryptedStorage.getItem('refreshToken');

        if (!refreshToken) {
            throw new Error('refreshToken이 존재하지 않습니다.');
        }
        const response = await axios.post(`${baseURL}/auth/renew`, { refreshToken });
        const newAccessToken= response.data.accessToken;
       
        await EncryptedStorage.setItem('accessToken', newAccessToken);

        return newAccessToken;
    } catch (error) {
        console.error('토큰 재발급 실패:', error);
        throw error;
    }
};

axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            const accessToken = await EncryptedStorage.getItem('accessToken');
            config.headers['Content-Type'] = 'application/json';
            config.headers['Authorization'] = accessToken;

            console.log('원래 요청 config:', config);
            return config;
        } catch (error) {
            console.error('요청 인터셉터 오류:', error);
            return Promise.reject(error);
        }
    },
    (error) => {
        console.error('요청 인터셉터 오류:', error);
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => response,
    async function(error) {
      // error.response가 존재하는지 확인
      console.log(error.response.status);
      if (error.response && error.response.status === 401) {
        try {
          console.log("error :", error.response.status);
          const newAccessToken = await reissueToken();
          console.log("새 토큰 : ", newAccessToken);
          if (newAccessToken) {
            // error.config가 존재하는지 확인하고, 새로운 토큰으로 헤더 설정
            if (error.config && error.config.headers) {
              error.config.headers['Authorization'] = newAccessToken;
              // 수정된 요청을 재시도
              return axios.request(error.config);
            } else {
              // error.config 또는 error.config.headers가 없는 경우
              throw new Error('요청을 재시도하기 위한 필요한 정보가 부족합니다.');
            }
          } else {
            // 재발급된 토큰이 없는 경우
            throw new Error('재발급된 토큰이 유효하지 않습니다.');
          }
        } catch (reissueError) {
          console.log("토큰 재발급 실패:", reissueError);
          throw reissueError;
        }
      } 
      
      
      
      else {
        // 다른 종류의 에러에 대한 처리
        console.log("new error:", error);
        // error.response가 없는 경우에 대한 추가적인 처리가 필요할 수 있음
        if (!error.response) {
          console.error('서버로부터의 응답이 없습니다.');
        }
        return Promise.reject(error);
      }
    }
  );

export default axiosInstance;