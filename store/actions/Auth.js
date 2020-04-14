import { SIGNUP, LOGIN } from './types'

export const signUp = (email, password) =>{
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDnZfiJ85V7hgcdug_KsPUlc7BI_PpOj0I',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });
            if (!response.ok) {
                // throw new Error('Something went wrong!');
                if (!response.ok) {
                    const errorResData = await response.json();
                    const errorMsg = errorResData.error.message;
                    // console.log(errorMsg)
                    let msg = 'Something went wrong';
                    if(errorMsg === 'EMAIL_EXISTS'){
                        msg = 'This Email is exist!'
                    }
                    throw new Error(msg)
                 }
            }
            
            const resData = await response.json();
            console.log('sign up',resData);
        dispatch({
            type: SIGNUP
        })
    }  
};

export const logIn = (email, password) =>{
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDnZfiJ85V7hgcdug_KsPUlc7BI_PpOj0I',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });
            if (!response.ok) {
               const errorResData = await response.json();
               const errorMsg = errorResData.error.message;
               let msg = 'Something went wrong';
               if(errorMsg === 'INVALID_EMAIL'){
                   msg = 'This Email Could not be found!'
               }else if(errorMsg === 'MISSING_PASSWORD'){
                   msg = 'This password in not valid!'
               }
            //    console.log('log in',msg);
               throw new Error(msg)
            }
            
            const resData = await response.json();
            console.log('sign up',resData);
        dispatch({
            type: LOGIN
        })
    }
    
};