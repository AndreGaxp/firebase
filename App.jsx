import {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {db} from './src/firebaseConnection';
import {doc, getDoc, setDoc, collection, addDoc} from 'firebase/firestore';

export default function DBtest() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [cargo, setCargo] = useState('');
  const [showForm, setShowForm] = useState(true);

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

          <TouchableOpacity style={styles.btn} onPress={register}>
            <Text style={styles.btnText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.btn} onPress={toggle}>
        <Text style={styles.btnText}>
          {showForm ? 'Esconder formulário' : 'Mostrar formulário'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
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
});
