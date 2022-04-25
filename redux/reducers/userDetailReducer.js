const initialState = {
  data: [],
  editUserDetail: [],
  deletedUserDetail: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_DETAIL':
      console.log("__NIK user redux testing" + action.payload);
      return {
        ...state,
        data: action.payload
      };
    case 'DELETE_USER_DETAIL':
      const arr = state.data.filter(e=> e.id !== action.id && e )
      const arrDelete = state.data.filter(e=> e.id === action.id && e )
      console.log("_dp delete redux user data" + action.id);
      return {
        ...state,
        data: arr,
        deletedUserDetail: arrDelete
      }
    case 'EDIT_USER_DETAIL':
      const array = state.data.filter(e=> e.id === action.id && e )
      console.log(array);
      console.log("_Edit User redux detail" + action.id);
      return {
        ...state,
        editUserDetail: array
      }
    case 'UPDATE_USER_DETAIL':
      console.log(action.payload);
      const updatedArr = state.data.map((e) => {
        if(e.id === action.payload.id) {
            return {
              ...action.payload
            }
        } else {
          return e
        }
      })
      console.log("update data in redux" + action.payload);
      return { 
        ...state,
        data: updatedArr,
        editUserDetail: action.payload
      }
    default: return state
  }
}

export default reducer