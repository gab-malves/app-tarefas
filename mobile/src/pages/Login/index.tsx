import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }: any) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (!login || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      const response = await api.post('/sessions', { login, password });
      const { token, user } = response.data;

      await AsyncStorage.setItem('@App:token', token);
      await AsyncStorage.setItem('@App:user', JSON.stringify(user));

      api.defaults.headers.authorization = `Bearer ${token}`;

      Alert.alert('Sucesso', `Bem-vindo, ${user.login}!`);
      navigation.replace('Dashboard');
    } catch (err) {
      Alert.alert('Erro', 'Falha no login. Verifique seus dados.');
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F0F2F5" barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.subtitle}>Faça login para continuar</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu usuário"
          placeholderTextColor="#999"
          value={login}
          onChangeText={setLogin}
          autoCapitalize="none"
          underlineColorAndroid="transparent" // Remove a linha preta nativa
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          underlineColorAndroid="transparent" // Remove a linha preta nativa
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={styles.linkText}>
            Não tem conta? <Text style={styles.linkBold}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    width: '100%',
  },
  label: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    marginLeft: 10,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 25, // Formato pílula
    height: 50,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: 'transparent',
    elevation: 2, // Sombra suave
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  button: {
    backgroundColor: '#6200ee',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 4,
    shadowColor: '#6200ee',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  linkButton: {
    marginTop: 25,
    alignItems: 'center',
  },
  linkText: {
    color: '#666',
    fontSize: 15,
  },
  linkBold: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
});
