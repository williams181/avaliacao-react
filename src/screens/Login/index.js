import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import React, { useState, useEffect, useCallback } from 'react';
import { Avatar, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Profile from '../../aseets/Profile/profile.png';
import FlashMessage from "react-native-flash-message";
import { StatusBar } from 'expo-status-bar';
import api from '../../services/api';
import styles from './styles';

function Login({ navigation }) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const login = async () => {
    await api.post(`usuario/login`, {
      email: email,
      senha: senha,
    }).then(async response => {
      try {
        showMessage({
          message: "Sucesso!",
          type: "info",
        });
        navigation.navigate("Lista de Produtos")
      } catch (e) {
        console.log("error: ", e)
        setTimeout(() => {
        }, 500)
      }
    }).catch(e => {
      setTimeout(() => {
      }, 500)
      showMessage({
        message: "Erro!",
        type: "info",
      });
    })
  }

  return (
    <View style={styles.container}>
      <FlashMessage position="top" />
      <View style={styles.avatar}>
        <Avatar
          size="xlarge"
          rounded
          title="CR"
          source={Profile}
        />
      </View>
      <View style={styles.input}>
        <View>
          <Text style={styles.texto}>Login</Text>
          <Input style={styles.inputStyle}
            value={email}
            onChangeText={value => setEmail(value)}
          />
        </View>

        <View>
          <Text style={styles.texto}>Senha</Text>
          <Input style={styles.inputStyle}
            secureTextEntry={true}
            onChangeText={value => setSenha(value)}
          />
        </View>

        <View>
          <TouchableOpacity onPress={login}>
            <View style={styles.buttonStyle}>
              <Button buttonStyle={styles.buttonColor1}
              />
              <Text style={styles.textoButton1}>Login</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Cadastro de Usuário')}>
            <View style={styles.buttonStyle}>
              <Button buttonStyle={styles.buttonColor2}
              />
              <Text style={styles.textoButton2}>Cadastre-se</Text>
            </View>
          </TouchableOpacity>

        </View>

      </View>

      <StatusBar style="auto" />
    </View>
  );
}

export default Login;