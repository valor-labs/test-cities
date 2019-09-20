import axios from 'axios';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Form from '../components/Form';

export default class Cities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        axios({
            method: 'GET',
            url: 'https://humanitarianbooking.external-api.org/v1/cities/',
            headers: {
                'x-api-key': '',
                'Authorization': 'Token '
            }
        }).then(response => {
            console.log(response);
            this.setState({ data: 'ok: ' + response.data });
        }).catch(error => {
            console.log(error);
            this.setState({ data: error });
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.data}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    signupTextCont: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 16,
        flexDirection: 'row',
    },
    signupText: {
        color: '#12799f',
        fontSize: 16,
    },
    signupButton: {
        color: '#12799f',
        fontSize: 16,
        fontWeight: '500',
    }
});
