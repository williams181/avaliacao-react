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

function ContactUpdate({ navigation, route }) {

  const [nome, setNome] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [preco, setPreco] = useState('');

  let productId = route.params.productId

  const updateProduct = async (productId, nome, capacidade, preco) => {
    await api.put(`/produto/${productId}`, {
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

  const deleteProduct = async (productId) => {
    await api.delete(`/produto/${productId}`, {
    }).then(() => {
      try {
        navigation.navigate("Lista de Produtos")
      } catch (e) {
        console.log("error: ", e)
        setTimeout(() => {
        }, 500)
      }
    }).catch(e => {
      setTimeout(() => {
      }, 500)
    })
  }

  const productInfo = async (productId) => {
    await api.get(`/produto/${productId}`)
      .then(response => {
        console.log(response.data)
        setNome(response.data.nome)
        setCapacidade(response.data.capacidade)
        setPreco(response.data.preco)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const getProductInfoCallback = useCallback(async (productId) => {
    await productInfo(productId)
  })

  useEffect(() => {
    getProductInfoCallback(productId)
  }, [])

  return (
    <View style={styles.container}>
      <FlashMessage position="top" />
      <View style={styles.input}>
        <View>
          <Text style={styles.texto}>Nome{nome}</Text>
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
          <TouchableOpacity onPress={() => updateProduct(
            productId, nome, capacidade, preco
          )}>
            <View style={styles.buttonStyle}>
              <Button buttonStyle={styles.buttonColor1}
              />
              <Text style={styles.textoButton1}>Alterar</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.excluir}>
          <TouchableOpacity onPress={() => deleteProduct(productId)}>
            <View style={styles.buttonStyle}>
              <Button buttonStyle={styles.buttonColor2}
              />
              <Text style={styles.textoButton2}>Excluir</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>

      <StatusBar style="auto" />
    </View>
  );
}

export default ContactUpdate;