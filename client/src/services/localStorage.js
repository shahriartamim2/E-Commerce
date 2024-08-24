// Function to save userInfo state into local storage
const  saveUserInfo = (userInfo)=> {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

// Function to clear userInfo state from local storage
const  clearUserInfo = () => {
    localStorage.removeItem('userInfo');
}

const getUserInfo = () => { 
    return JSON.parse(localStorage.getItem('userInfo'));
}


export { saveUserInfo, clearUserInfo, getUserInfo };