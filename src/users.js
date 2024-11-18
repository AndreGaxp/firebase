import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from './firebaseConnection';
import { deleteDoc, doc } from 'firebase/firestore';

export function UsersList({ data, handleEdit }) {

  async function delet() {
    const docRef = doc(db, 'users', data.id)
    await deleteDoc(docRef)
  }

  async function edit() {
    handleEdit(data)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.item}>Nome: {data.nome}</Text>
      <Text style={styles.item}>Idade: {data.idade}</Text>
      <Text style={styles.item}>Cargo: {data.cargo}</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={delet}>
        <Text style={styles.btnText}> Deletar Usuario</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnEdit}
        onPress={edit}>
        <Text style={styles.btnText}> Editar Usuario</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 5,
    marginBottom: 15,
  },

  item: {
    color: '#000',
    fontSize: 16,
  },

  btn: {
    backgroundColor: '#b3361e',
    alignSelf: 'flex-start',
    borderRadius: 5,
    padding: 4,
    marginTop: 5,
  },

  btnText: {
    color: '#fff',
    padding: 3,
  },

  btnEdit: {
    backgroundColor: '#000',
    alignSelf: 'flex-start',
    borderRadius: 5,
    padding: 4,
    marginTop: 5,
  }
})