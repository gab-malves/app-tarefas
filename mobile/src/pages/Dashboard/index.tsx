import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';

interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

export default function Dashboard({ navigation }: any) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    async function loadData() {
      const userStorage = await AsyncStorage.getItem('@App:user');
      if (userStorage) {
        const user = JSON.parse(userStorage);
        setUserName(user.login || 'Usuário');
      }
      loadTasks();
    }
    loadData();
  }, []);

  async function loadTasks() {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível carregar as tarefas.');
    }
  }

  async function handleAddTask() {
    if (!newTask) return;
    try {
      await api.post('/tasks', { title: newTask });
      setNewTask('');
      loadTasks();
    } catch (err) {
      Alert.alert('Erro', 'Erro ao criar tarefa.');
    }
  }

  async function handleToggleTask(id: string, completed: boolean) {
    try {
      const newTasks = tasks.map(task =>
        task._id === id ? { ...task, completed: !completed } : task,
      );
      setTasks(newTasks);
      await api.put(`/tasks/${id}`, { completed: !completed });
    } catch (err) {
      Alert.alert('Erro', 'Erro ao atualizar tarefa.');
      loadTasks();
    }
  }

  async function handleDeleteTask(id: string) {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      Alert.alert('Erro', 'Erro ao apagar tarefa.');
    }
  }

  async function handleLogout() {
    await AsyncStorage.clear();
    navigation.replace('Login');
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6200ee" barStyle="light-content" />

      {/* Cabeçalho Roxo Moderno */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greetingText}>Olá,</Text>
            <Text style={styles.userNameText}>{userName}</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Input Flutuante (Sobrepõe o cabeçalho) */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Adicionar nova tarefa..."
          placeholderTextColor="#999"
          value={newTask}
          onChangeText={setNewTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Lista */}
      <View style={styles.content}>
        <Text style={styles.listTitle}>Minhas Tarefas</Text>
        <FlatList
          data={tasks}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={[styles.card, item.completed && styles.cardDone]}>
              <TouchableOpacity
                style={[styles.checkBox, item.completed && styles.checkBoxDone]}
                onPress={() => handleToggleTask(item._id, item.completed)}
              >
                {item.completed && <Text style={styles.checkIcon}>✓</Text>}
              </TouchableOpacity>

              <Text
                style={[styles.taskText, item.completed && styles.taskTextDone]}
                numberOfLines={2}
              >
                {item.title}
              </Text>

              <TouchableOpacity
                onPress={() => handleDeleteTask(item._id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteIcon}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F2F5' },

  // Header
  headerContainer: {
    backgroundColor: '#6200ee',
    height: 140,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingText: { color: '#e0e0e0', fontSize: 16 },
  userNameText: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  logoutButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  logoutText: { color: '#FFF', fontWeight: '600', fontSize: 14 },

  // Input Area
  inputWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: -25, // Faz o input subir e ficar "flutuando" entre o roxo e o cinza
  },
  input: {
    flex: 1,
    backgroundColor: '#FFF',
    height: 50,
    borderRadius: 25, // Bem redondo
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
    elevation: 4, // Sombra no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginRight: 10,
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#03DAC6', // Cor de destaque (Teal)
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  plusText: { color: '#000', fontSize: 28, marginTop: -2 },

  // List Content
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },

  // Cards
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardDone: { opacity: 0.6, backgroundColor: '#f9f9f9', elevation: 0 },

  // Checkbox Customizado
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#6200ee',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxDone: { backgroundColor: '#6200ee' },
  checkIcon: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },

  // Texto
  taskText: { flex: 1, fontSize: 16, color: '#333' },
  taskTextDone: { textDecorationLine: 'line-through', color: '#888' },

  // Botão Apagar
  deleteButton: { padding: 5 },
  deleteIcon: { fontSize: 18, color: '#FF5252' },
});
