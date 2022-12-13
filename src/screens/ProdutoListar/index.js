import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Avatar, Card, Input, Button, ListItem } from 'react-native-elements';
import { showMessage, hideMessage } from "react-native-flash-message";
import React, { useState, useEffect, useCallback } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import FlashMessage from "react-native-flash-message";
import Img from '../../aseets/Product/image.png';
import Plus from '../../aseets/Icon/plus.png';
import { StatusBar } from 'expo-status-bar';
import api from '../../services/api';
import styles from './styles';

function ProductList({ navigation }) {

  const [produto, setProduto] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});

  const lista = async () => {
    await api.get(`/produtos`)
      .then(response => {
        console.log(response.data)
        setProduto(response.data)
      })
      .catch(e => {
        console.error("erro: " + e);
      });
    setSelectedProduct('')
  }

  useEffect(() => {
    lista()
  }, []);

  return (
    <View style={styles.container}>
      <FlashMessage position="top" />
      <ScrollView style={styles.scroll}>
        <View style={styles.contactList}>
          <View style={styles.titleList}>
            <TouchableOpacity onPress={() => navigation.navigate('Cadastro de Produto')}>
              <Avatar rounded source={Plus} />
            </TouchableOpacity>
          </View>

          <Card style={styles.cardWitdh}>
            <Card.Divider />
            {
              produto.map((u, i) => {
                return (
                  <TouchableOpacity onPress={() => navigation.navigate('Produto', {
                    productId: u.id
                  })}>
                    <View key={i} style={styles.imgSize}>
                      <Image
                        style={styles.imgWidth}
                        // resizeMode="cover"
                        source={Img}
                      />
                      <Text style={styles.texto}>Produto:{' '}{u.nome}</Text>
                      <Text style={styles.texto}>Armazenamento:{' '}{u.capacidade}</Text>
                      <Text style={styles.texto}>Valor:{' '}{u.preco}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            }
          </Card>

        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}

export default ProductList;