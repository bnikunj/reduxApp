export const loginAuthUser = (token, item) => {

  return {
      type: 'LOGIN_USER',
      authToken:token,
      user:item,
  }
}

export const logoutAuthUser = () => {
  return {
    type: 'LOGOUT_USER'
  }
}

export const userDetailTable = (userAllData) => {
  return {
    type: 'GET_USER_DETAIL',
    payload: userAllData,
  }
}

export const editUserDetail = (id) => {
  return {
    type: 'EDIT_USER_DETAIL',
    id: id,
  }
}


export const deleteUserDetail = (id) => {
  return {
    type: 'DELETE_USER_DETAIL',
    id: id,
  }
}

export const updateUserDetail = (data) => {
  return {
    type: 'UPDATE_USER_DETAIL',
    payload: data,
  }
}