import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { db, auth } from './firebaseConnection';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';

import { UsersList } from './users';

import { signOut } from 'firebase/auth'

export function FormUsers() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [cargo, setCargo] = useState('');
  const [users, setUsers] = useState('');

  const [showForm, setShowForm] = useState(true);
  const [isEditing, setIsEditing] = useState('');

  useEffect(() => {
    async function getDados() {
      const usersRef = collection(db, 'users');
      onSnapshot(usersRef, snapshot => {
        let lista = [];

        snapshot.forEach(doc => {
          lista.push({
            id: doc.id,
            nome: doc.data().nome,
            idade: doc.data().idade,
            cargo: doc.data().cargo,
          });
        });

        setUsers(lista);
      });
    }

    getDados();
  }, []);

  async function register() {
    await addDoc(collection(db, 'users'), {
      nome: nome,
      idade: idade,
      cargo: cargo,
    })
      .then(() => {
        console.log('CADASTRADO COM SUCESSO');
        setNome('');
        setIdade('');
        setCargo('');
      })
      .catch(err => {
        console.log(err);
      });
  }

  function toggle() {
    setShowForm(!showForm);
  }

  function editUser(data) {
    setNome(data.nome);
    setIdade(data.idade);
    setCargo(data.cargo);
    setIsEditing(data.id);
  }

  async function handleEditUser() {
    const docRef = doc(db, 'users', isEditing)
    await updateDoc(docRef, {
      nome: nome,
      idade: idade,
      cargo: cargo,
    })
    setNome('')
    setIdade('')
    setCargo('')
    setIsEditing('')
  }

  async function handleLogout() {
    await signOut(auth)
  }

  return (
    <View style={styles.container}>
      {showForm && (
        <View>
          <Text style={styles.title}> FIREBASE - CADASTRO </Text>
          <Text style={styles.text}> Nome </Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o seu nome"
            value={nome}
            onChangeText={text => setNome(text)}
          />

          <Text style={styles.text}> Idade </Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a sua idade"
            value={idade}
            onChangeText={text => setIdade(text)}
          />

          <Text style={styles.text}> Cargo </Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o seu cargo"
            value={cargo}
            onChangeText={text => setCargo(text)}
          />

          {isEditing !== '' ? (
            <TouchableOpacity style={styles.btn} onPress={handleEditUser}>
              <Text style={styles.btnText}>Editar Usuario</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.btn} onPress={register}>
              <Text style={styles.btnText}>Cadastrar</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <TouchableOpacity style={styles.btn} onPress={toggle}>
        <Text style={styles.btnText}>
          {showForm ? 'Esconder formulário' : 'Mostrar formulário'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.listText}>Usuários</Text>

      <FlatList
        style={styles.list}
        data={users}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <UsersList data={item} handleEdit={item => editUser(item)} />
        )}
      />

      <TouchableOpacity onPress={handleLogout} style={styles.btnLogout}>
        <Text style={styles.textBtn}>Sair da Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },

  text: {
    marginTop: 30,
    color: '#000',
    fontSize: 18,
    marginLeft: 4,
  },

  input: {
    borderWidth: 1,
    marginLeft: 8,
    marginRight: 8,
  },

  btn: {
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 7,
    marginTop: 10,
    marginLeft: 8,
    marginRight: 8,
  },

  btnText: {
    color: '#fff',
    textAlign: 'center',
  },

  listText: {
    fontSize: 20,
    color: '#000',
    marginTop: 15,
    marginLeft: 8,
  },

  list: {
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
  },

  btnLogout:{
    backgroundColor: 'red',
    alignSelf: 'flex-start',
    margin: 14,
    padding: 8,
    borderRadius: 5,
  },

  textBtn:{
    color:"#fff"
  }
});
