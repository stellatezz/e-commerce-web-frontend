import React, { useReducer, createContext, useEffect } from "react";
import axios from 'axios';
import { useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';

export const AuthStateContext = createContext();
export const AuthDispatchContext = createContext();

const authInitState = {
  isLoggedIn: false,
  isAdmin: false,
  user: 'Guest',
  userID: 0,
  sessionID: null,
  token: null,
  csrfNonce: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      let user = action.username;
      let userID = action.uid;
      let flag = action.flag;
      let isAdmin = false;

      //console.log(state);
      if (flag === 1) {
        isAdmin = true;
      }

      return {
        ...state,
        isLoggedIn: true,
        isAdmin: isAdmin,
        user: user,
        userID: userID,
      };
    case 'LOGOUT':
      //window.location.reload();
      return {
        isLoggedIn: false,
        isAdmin: false,
        user: 'Guest',
        userID: 0,
      };
    case 'CSRF':
      //window.location.reload();
      let nonce = action.csrf;
      return {
        ...state,
        csrfNonce: nonce,
      };
    default:
      throw new Error();
  };
};

export function login(dispatch, username, uid, flag) {
  return dispatch({
    type: "LOGIN_SUCCESS",
    username: username,
    uid: uid,
    flag: flag,
  });
};

export function logout(dispatch) {
  return dispatch({
    type: "LOGOUT",
  });
};

export function loadcsrf(dispatch, nonce) {
  return dispatch({
    type: "CSRF",
    csrf: nonce,
  });
};

export default function AuthProvider({children}) {
  // let savedAuthInitState;
  // let authData = Cookies.get("auth");
  // console.log(authData);
  // let newAuthData;
  // let auth;
  // if (authData !== undefined) {
  //   newAuthData = authData.replaceAll("'", '"');
  //   auth = JSON.parse(newAuthData);
  //   let isAdmin = false;
  //   let sessionID = null;
  //   let token = null;
  //   let csrfNonce = null;

  //   if ("token" in auth) {
  //     isAdmin = true;
  //     token = auth.token;
  //   }
  //   sessionID = auth.PHPSESSID;
  //   csrfNonce = auth.csrf_nonce;
  //   savedAuthInitState = {
  //     isLoggedIn: true,
  //     isAdmin: isAdmin,
  //     user: auth.username,
  //     userID: auth.uid,
  //     sessionID: sessionID,
  //     token: token,
  //     csrfNonce: csrfNonce,
  //   };
  // } else {
  //   savedAuthInitState = authInitState;
  // }

  const [state, dispatch] = useReducer(reducer, authInitState);

  const vaildateSession = async () => {
    let formData = new FormData();
    // formData.append('session', sessionID);
    // formData.append('token', token);
    //console.log(sessionID);
    //console.log(state);
    try {
        await axios({
          crossDomain: true,
          method: "post",
          withCredentials: true,
          url: `https://secure.s37.ierg4210.ie.cuhk.edu.hk:3000/api/user/vaildate`,
          headers: { "Content-Type": "multipart/form-data", "Accept": "application/json" },
        }).then(({data})=>{
          //console.log(data.status);
          if (data.status <= 0) {
            dispatch({
              type: "LOGOUT",
            });
          } else {
            dispatch({
              type: "CSRF",
              csrf: data.csrf_nonce,
            });
          }
          if (data.status === '1') {
            let username = data.username;
            let uid = data.uid;
            let flag = data.flag;
            // let authData = Cookies.get('auth');
            // let newAuthData = authData.replaceAll("'", '"');
            // let auth = JSON.parse(newAuthData);
            login(dispatch, username, uid, flag);
          }
        });
        //console.log(response)
      } catch(error) {
        //console.log(error)
      }
  }

  useEffect(() => {
    vaildateSession();
  }, []);

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
}
