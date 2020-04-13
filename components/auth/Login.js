import React,{ useState, useCallback, useReducer } from 'react'
import { StyleSheet, View, Button, ActivityIndicator } from 'react-native'

import Input from '../UI/Input'

import Colors from '../../constants/colors'

import { useDispatch } from 'react-redux'
import * as authActions from '../../store/actions/Auth'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues
      };
    }
    return state;
  };


const Login = () => {
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email:'',
            password:''
        },
        inputValidities: {
          email: false,
          password: false
        },
        formIsValid: false
      });

    const authHandler = async () =>{
        setIsLoading(true);
        await dispatch(authActions.logIn(
                formState.inputValues.email,
                formState.inputValues.password
            ));
        setIsLoading(false);
    };

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
          dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
          });
        },
        [dispatchFormState]
      );
        
    return (
        <View>
            <Input
                id="email"
                label="E-Mail"
                keyboardType="email-address"
                required
                email
                Icon="email"
                autoCapitalize="none"
                errorText="Please Enter a valid email address!"
                onInputChange={inputChangeHandler}
                initialValue=""
            />
            <Input
                id="password"
                label="password"
                keyboardType="default"
                secureTextEntry
                required
                minLength={6}
                Icon="eye-off"
                autoCapitalize="none"
                errorText="Your password is not valid!"
                onInputChange={inputChangeHandler}
                initialValue=""
            />
            <View style={styles.btnContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={Colors.secondary} />
                ) : (
                    <Button 
                        title="Log in" 
                        color={Colors.primary} 
                        onPress={authHandler} 
                    />
                )}
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    btnContainer:{
        margin:10
    }
})
