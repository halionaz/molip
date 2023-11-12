// 유니크한 ID 부여를 위한 함수
// (임시!)

const pid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export default pid;