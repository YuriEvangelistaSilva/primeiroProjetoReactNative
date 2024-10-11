import React, { useState, useEffect, useRef } from "react";

import firebase from "../services/connectionFirebase";

import {View,Text,StyleSheet,TouchableOpacity,Keyboard,FlatList,ActivityIndicator,Alert, Modal} from "react-native";

import { TextInput } from "react-native-paper";
import ListStores from "./ListStore";

const Separator = () => {
    return <View style={styles.separator} />;
};

export default function Store() {

    const [nameStore, setNameStore] = useState('');
    const [city, setCity] = useState('');
    const [endereco, setEndereco] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [deletingKey, setDeletingKey] = useState(null);

    const [key, setKey] = useState('');
    const [Stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const inputRef = useRef(null);

    useEffect(() => {
        async function search() {
            await firebase.database().ref('stores').on('value', (snapshot) => {
                setStores([]);
                snapshot.forEach((chilItem) => {
                    let data = {
                        //de acordo com a chave de cada item busca os valores 
                        //cadastrados na relação e atribui nos dados 
                        key: chilItem.key,
                        nameStore: chilItem.val().nameStore,
                        city: chilItem.val().city,
                        endereco: chilItem.val().endereco,
                        tel: chilItem.val().tel,
                        email: chilItem.val().email,
                    };
                    setStores(oldArray => [...oldArray, data].reverse());
                })
                setLoading(false);
            })
        }
        search();
    }, []);

    function handleDelete(key) {
        if (!key) {
          console.log("Chave inválida.");
          return;
        }
        
        setDeletingKey(key);
        setModalVisible(true);
        
      }
      
      function confirmDelete() {
        firebase.database().ref('stores').child(deletingKey).remove().then(() => {
                //todos os itens que forem diferentes daquele que foi deletado
                //serão atribuidos no array
                const findStores = Stores.filter(item => item.key !== deletingKey)
                setStores(findStores)
            })
          .catch(error => {
            console.error("Erro ao excluir item: ", error);
            Alert.alert("Erro", "Não foi possível excluir o item. Por favor, tente novamente mais tarde.");
          });
        setModalVisible(false);
      }
    //função para editar 
    function handleEdit(data) {
        setKey(data.key),
            setNameStore(data.nameStore),
            setCity(data.city),
            setEndereco(data.endereco),
            setTel(data.tel),
            setEmail(data.email)
    }
    function validaEmail(email){
      const isValid = /\S+@\S+\.\S+/.test(email);
      return isValid;
  }
    //nameStore: nameStore, city: city, endereco: endereco, tel: tel, email: email
    async function insertUpdate() {

      if(nameStore.trim() === ''){
        alert('Insira o nome da loja')
        return;
    } if(city.trim() === ''){
      alert('Insira nome da cidade')
      return;
    }
      if(endereco.trim() === ''){
      alert('Insira o endereço da loja')
      return;
    }
    if(tel.trim() === ''){
      alert('Insira o telefone da loja')
      return;
    }
    if(email.trim() === ''){
      alert('Insira o email da loja')
      return;
    }
    if(!validaEmail(email)){
      alert('Formato Email inválido. Porfavor insira um email valido da loja');
      return;
  }
        
        //editar dados 
        if ((key !== '')) {
            firebase.database().ref('stores').child(key).update({
                nameStore: nameStore, city: city, endereco: endereco, tel: tel, email: email
            })
            //para o teclado do celular fixo abaixo do formulário (não flutuante) 
            Keyboard.dismiss();
            alert('Loja alterado com sucesso');
            clearData();
            setKey('');
            return;
        }

        //cadastrar dados - insert 
        let stor = await firebase.database().ref('stores');
        let keystore = stor.push().key; //cadastar os dados 

        stor.child(keystore).set({
            nameStore: nameStore,
            city: city,
            endereco: endereco,
            tel: tel,
            email: email,
        });
        alert('Loja Inserido!');
        clearData();
    }
    function clearData() {
        setNameStore('');
        setCity('');
        setEndereco('');
        setTel('');
        setEmail('');
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Nome da loja"
                left={<TextInput.Icon icon="store" />}
                maxLength={40}
                style={styles.input}
                onChangeText={(texto) => setNameStore(texto)}
                value={nameStore}
                ref={inputRef}
            />
            <Separator />
            <TextInput
                placeholder="Cidade"
                left={<TextInput.Icon icon="city" />}
                style={styles.input}
                onChangeText={(texto) => setCity(texto)}
                value={city}
                ref={inputRef}
            />
            <Separator />
            <TextInput
                placeholder="Endereço"
                left={<TextInput.Icon icon="home-map-marker" />}
                style={styles.input}
                onChangeText={(texto) => setEndereco(texto)}
                value={endereco}
                ref={inputRef}
            />
            <Separator />
            <TextInput
                placeholder="telefone"
                left={<TextInput.Icon icon="cellphone" />}
                style={styles.input}
                onChangeText={(texto) => setTel(texto)}
                value={tel}
                ref={inputRef}
            />
            <Separator />
            <TextInput
                placeholder="Email"
                left={<TextInput.Icon icon="email" />}
                style={styles.input}
                onChangeText={(texto) => setEmail(texto)}
                value={email}
                ref={inputRef}
            />
            <Separator />
            <TouchableOpacity onPress={insertUpdate} style={styles.button} activeOpacity={0.5}>
                <Text style={styles.buttonTextStyle}>Salvar</Text>
            </TouchableOpacity>
            <View>
                <Text style={styles.listar}>Listagem de lojas</Text>
            </View>
            {loading ? (
                <ActivityIndicator color="#121212" size={45} />
            ) : (
                <FlatList
                keyExtractor={(item) => item.key}
                data={Stores}
                renderItem={({ item }) => (
                  <ListStores 
                    data={item}
                    deleteItem={handleDelete}
                    editItem={handleEdit}
                        />
                    )}
                />
            )}
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Tem certeza que deseja excluir este item?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={[styles.modalButtonText,styles.deleteButtonNo]}>Nao</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={confirmDelete}>
                <Text style={[styles.modalButtonText, styles.deleteButtonYes]}>Sim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9370DB',
    },
    input: {
        borderWidth: 1,
        borderColor: '#121212',
        height: 40,
        fontSize: 13,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        borderRadius: 8
    },
    separator: {
        marginVertical: 5,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3ea6f2',
        borderWidth: 0.5,
        height: 40,
      justifyContent: 'center',
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10,
    },

    buttonImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
    },

    buttonTextStyle: {
        color: '#fff',
        marginBottom: 4,
       textAlign: 'center',
        fontSize: 20

    },

    buttonIconSeparatorStyle: {
        backgroundColor: '#fff',
        width: 1,
        height: 20,
    },

    listar: {
        fontSize: 20,
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      modalContent: {
        backgroundColor: "#4682B4", // Cor azul aço
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
      },
      modalText: {  
        color: "#FFFFFF",      
        marginBottom: 10,
        alignItems: "center",
      },
      modalButtons: {
        flexDirection: "row",
        justifyContent: "center",
      },
      modalButton: {
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 6,
        minWidth: 100,
        alignItems: "center",
      },
      deleteButtonYes: {
        backgroundColor:"#32CD32",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 6,
      },
      deleteButtonNo: {
      backgroundColor: "#FF0000", 
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 6,
      },
      modalButtonText: {
        color: "#FFFFFF",
        fontSize: 16
      },
}); 