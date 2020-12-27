import {API} from '../config';

export const signup = user => {
    //console.log(name, email, password);
    return fetch(`${API}/register`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)    
    })  
    .catch(err => {
        console.log('signup error: ',err);
    })
}

export const signin = user => {
    //console.log(name, email, password);
    return fetch(`${API}/login`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)    
    })
    .then( response => {
        return response.json();
    })
    .catch(err => {
        console.log('signin error: ',err);
    })
}

export const signout = (next) => {
    if (typeof window != undefined){
        localStorage.removeItem("jwt");
        next();
        return fetch(`${API}/logout`, {
            method: 'GET',
        })
        .then(response => {
            console.log("logout ", response)
        })
        .catch(err => console.log(err))
    }
    
}

export const decodeJWT = (token) => {
    return fetch(`${API}/decodeJWT`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(token)    
    })
    .then( response => {
        console.log("response from api:",response);
        return response.json();
    })
    .catch(err => {
        console.log('token decoding error: ',err);
    })
}

export const forgotPasswordEmail = (email) => {
    console.log("email recieved", email);
    return fetch(`${API}/forgot-password`,{
      method: "POST",
      headers: {
          Accept: 'application/json',
          "Content-Type": "application/json"
      },
      
      body: JSON.stringify(email)
    })
    .then( response => {
        console.log("email successfully sent:",response);
        return response.json();
    })
    .catch(err => {
        console.log('error calling email sending api: ',err);
    })
}

export const resetPassword = (params) => {
    console.log("password recieved", params);
    return fetch(`${API}/reset-password/${params.id}/${params.token}`,{
      method: "POST",
      headers: {
          Accept: 'application/json',
          "Content-Type": "application/json"
      },
      
      body: JSON.stringify({"password":params.password})
    })
    .then( response => {
        console.log("password succesfully changed :",response);
        return response.json();
    })
    .catch(err => {
        console.log('error calling email sending api: ',err);
    })
}

export const authenticate = (data, next) => {
    if(typeof window !== 'undefined'){
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
}

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};