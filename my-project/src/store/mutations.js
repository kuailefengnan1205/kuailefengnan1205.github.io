const mutations = {
    add(state,num){
        state.count+=num
    },
    dele(state,num){
        state.count-=num
    },
    isname(state){
        if (sessionStorage.username) {
          state.isName = true;
        } else {
           state.isName = false;
        }
      },
      counts(state){
        
      }
}
export default mutations