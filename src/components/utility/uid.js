// 유니크한 ID 부여를 위한 함수

const uid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export default uid;