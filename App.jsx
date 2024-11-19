import {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {FormUsers} from './src/FormUsers';
import {auth} from './src/firebaseConnection';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

export default function DBtest() {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user) {
        setAuthUser({
          email: user.email,
          uid: user.uid,
        });

        setLoading(false)
        return;
      }

      setAuthUser(null);
      setLoading(false)
    });
  }, []);

  async function handleCreateUser() {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
  }

  async function handleLogin() {
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log('USUARIO LOGADO');
    console.log(user);
    setAuthUser({
      email: user.user.email,
      uid: user.user.uid,
    });
  }

  async function handleLogout() {
    await signOut(auth);
    setAuthUser(null);
  }

  if (authUser) {
    return (
      <View style={styles.container}>
        <FormUsers />
      </View>
    );
  }
  return (
    <View style={styles.container}>

    {loading && <Text style={styles.carregando}>Carregando informações...</Text>}

      <Text style={styles.txtInput}>Email: </Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Text style={styles.txtInput}>Senha: </Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={password}
        onChangeText={text => setpassword(text)}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Fazer Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={handleCreateUser}>
        <Text style={styles.btnText}>Criar uma conta</Text>
      </TouchableOpacity>

      {authUser && (
        <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
          <Text style={styles.btnText}>Sair da conta</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },

  txtInput: {
    marginLeft: 8,
    fontSize: 18,
    color: '#000',
  },

  input: {
    marginLeft: 8,
    marginRight: 8,
    borderWidth: 1,
    marginBottom: 14,
  },

  btn: {
    backgroundColor: '#000',
    marginRight: 8,
    marginLeft: 8,
    padding: 8,
    marginBottom: 8,
  },

  btnText: {
    color: '#fff',
    textAlign: 'center',
  },

  usuario: {
    fontSize: 16,
    color: '#000',
    marginLeft: 8,
    marginBottom: 15,
  },

  btnLogout: {
    backgroundColor: '#ff0000',
    marginRight: 8,
    marginLeft: 8,
    padding: 8,
    marginBottom: 8,
  },

  carregando:{
    fontSize: 20,
    marginLeft: 8,
    color: '#000',
    marginBottom: 8,
  }
});
