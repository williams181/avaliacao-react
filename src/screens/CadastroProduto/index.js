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

function ProductRegister({ navigation }) {

  const [nome, setNome] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [preco, setPreco] = useState('');

  const cadastro = async () => {
    await api.post(`/produto/cadastro`, {
      nome: nome,
      capacidade: capacidade,
      preco: preco,
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
      <View style={styles.input}>
        <View>
          <Text style={styles.texto}>Nome</Text>
          <Input style={styles.inputStyle}
            value={nome}
            onChangeText={value => setNome(value)}
          />
        </View>

        <View>
          <Text style={styles.texto}>Capacidade</Text>
          <Input style={styles.inputStyle}
            value={capacidade}
            onChangeText={value => setCapacidade(value)}
          />
        </View>

        <View>
          <Text style={styles.texto}>Preço {'(R$)'}</Text>
          <Input style={styles.inputStyle}
            value={preco}
            onChangeText={value => setPreco(value)}
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

export default ProductRegister;