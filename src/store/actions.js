import { userAccount } from "../api/user";
import { isLoggedIn } from "../utils/auth"

export default {
    fetchUserProfile( {commit}) {
          if(!isLoggedIn()) return;
          return userAccount().then( res => {
            if(res.code === 200) {
                commit('updateUserData', { key: 'user', value: res.profile})
            }
          })
    }
}