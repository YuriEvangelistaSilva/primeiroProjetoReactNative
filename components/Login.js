import {
    StyleSheet, View, Image, SafeAreaView,
    TouchableOpacity, Text, ImageBackground
} from 'react-native';
import React, { useState } from 'react';
import Logo from '../assets/usericon.png'
import fundo from '../assets/fundoGamer.jpg'
import {  TextInput } from 'react-native-paper';
import firebase from '../services/connectionFirebase';

const Separator = () => {
    return <View style={styles.separator} />;
}


export default function Login({changeStatus}) {

    const [type, setType] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    function validaEmail(email){
        const isValid = /\S+@\S+\.\S+/.test(email);
        return isValid;
    }

    //verifica se loga ou cadastra
    function handleLogin() {
        if(email.trim() === '' || password.trim() === '' ){
            alert('Campo(s) em branco')
            return;
        }
        else if(!validaEmail(email)){
            alert('Formato Email inválido. Porfavor insira um email valido');
            return;
        }
        if (type === 'login') {
          // Aqui fazemos o login
          const user = firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
              changeStatus(user.user.uid)
            })
            .catch((err) => {
              console.log(err);
              alert('usuário ou senha errados ou conta não cadastrada');
              return;
            })
     
        } else {
          // Aqui cadastramos o usuario 
          const user = firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
              changeStatus(user.user.uid)
            })
            .catch((err) => {
              console.log(err);
              alert('usuario ou senha errados');
              return;
            })
        }
      }
    const verDados = () => {
        console.log(email, password)
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={fundo}>
            <SafeAreaView style={styles.container}>
                <Image
                    source={Logo} style={styles.image}>
                </Image>
                <Separator />

                <TextInput
                    label="Email:"
                    type="flat"
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    label="Senha:"
                    type="flat"
                    style={styles.input}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                />
                <TouchableOpacity
                    style={[styles.handleLogin,
                    {
                        backgroundColor: type === 'login' ?
                            '#3ea6f2' : '#3ea6f2'
                    }]}
                    onPress={handleLogin}>
                    <Text style={styles.loginText}>
                        {type === 'login' ? 'Acessar' : 'Cadastrar'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setType(type => type === 'login' ? 'cadastrar' : 'login')} >
                    <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color:'#fff' }}>
                        {type === 'login' ? 'Criar uma conta?' : 'Já possuo uma conta!'}
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
            </ImageBackground>
        </View>
        
        
    )
}
const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        flex: 1,
        alignItems: 'center'    
    },
    input: {
        width: '75%',
        marginBottom: 20
    },
    image: {
       backgroundColor: '#fff',
        width: 330, height: 330,
        margin: 20,
        borderRadius: '100em',
    },
    handleLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        marginBottom: 10,
        borderTopLeftRadius:10,
      },
      loginText: {
        color: '#fff',
        fontSize: 30,
        
    }
        
      });