import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import React, { useState, useEffect, useCallback } from 'react';
import { Avatar, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import FlashMessage from "react-native-flash-message";
import Profile from '../../aseets/Profile/avatar.png';
import { StatusBar } from 'expo-status-bar';
import api from '../../services/api';
import styles from './styles';

function Register({ navigation }) {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const cadastro = async () => {
    await api.post("usuario/Cadastro", {
      nome: nome,
      email: email,
      senha: senha,
    }).then(async response => {
      try {
        showMessage({
          message: "Sucesso!",
          type: "info",
        });
        navigation.navigate("Login")
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
      <View style={styles.input}>

        <View>
          <Text style={styles.texto}>Nome</Text>
          <Input style={styles.inputStyle}
            value={nome}
            onChangeText={value => setNome(value)}
          />
        </View>

        <View>
          <Text style={styles.texto}>Email</Text>
          <Input style={styles.inputStyle}
            value={email}
            onChangeText={value => setEmail(value)}
          />
        </View>

        <View>
          <Text style={styles.texto}>Senha</Text>
          <Input style={styles.inputStyle}
            value={senha}
            onChangeText={value => setSenha(value)}
          />
        </View>

        <View>
          <TouchableOpacity onPress={cadastro}>
            <View style={styles.buttonStyle}>
              <Button buttonStyle={styles.buttonColor1}
              />
              <Text style={styles.textoButton1}>Salvar</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>

      <StatusBar style="auto" />
    </View>
  );
}

export default Register;