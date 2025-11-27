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

export default function Cadastro({ navigation }: any) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister() {
    if (!login || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      await api.post('/users', { login, password });
      Alert.alert('Sucesso', 'Conta criada! Faça login agora.');
      navigation.goBack();
    } catch (err: any) {
      const message =
        err.response?.data?.error || 'Não foi possível criar a conta.';
      Alert.alert('Erro', message);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F0F2F5" barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Nova Conta</Text>
        <Text style={styles.subtitle}>
          Organize suas tarefas de forma fácil
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Escolha seu usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: joaosilva"
          placeholderTextColor="#999"
          value={login}
          onChangeText={setLogin}
          autoCapitalize="none"
          underlineColorAndroid="transparent" // Remove a linha nativa do Android
        />

        <Text style={styles.label}>Escolha sua senha</Text>
        <TextInput
          style={styles.input}
          placeholder="No mínimo 6 caracteres"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          underlineColorAndroid="transparent" // Remove a linha nativa do Android
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>CRIAR CONTA</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.linkText}>
            Já tem conta? <Text style={styles.linkBold}>Faça Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F0F2F5',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
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
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  button: {
    backgroundColor: '#03DAC6', // Usando a cor secundária (Teal) para diferenciar do Login
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 4,
    shadowColor: '#03DAC6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#000', // Texto preto fica melhor no Teal
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  linkButton: {
    marginTop: 25,
    alignItems: 'center',
    padding: 10,
  },
  linkText: {
    color: '#666',
    fontSize: 15,
  },
  linkBold: {
    color: '#03DAC6', // Combinando com o botão
    fontWeight: 'bold',
  },
});
