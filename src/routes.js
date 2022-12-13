import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Plus from './aseets/Icon/plus.png';
import Login from './screens/Login';
import UserRegister from './screens/CadastroUsuario';
import ProductRegister from './screens/CadastroProduto';
import ProductList from './screens/ProdutoListar';
import ProductUpdate from './screens/ProdutoAtualizar';

const Tabs = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tab() {
    return (
        <Tabs.Navigator>
            <Tabs.Screen
                name="Lista de Produtos"
                component={ProductList}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => (
                        <View>
                            <Image source={Plus} />
                        </View>
                    ),
                }}
            />
        </Tabs.Navigator>
    );
}

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Lista de Produtos" component={ProductList} />
                <Stack.Screen name="Cadastro de Produto" component={ProductRegister} />
                <Stack.Screen name="Cadastro de Usuário" component={UserRegister} />
                <Stack.Screen name="Produto" component={ProductUpdate} />
                <Stack.Screen options={{ headerShown: false }} name="Tab" component={Tab} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;