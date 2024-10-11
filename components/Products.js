import React, { useState, useEffect, useRef } from "react";

import firebase from "../services/connectionFirebase";
import ListProducts from './ListProducts';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  FlatList,
  ActivityIndicator,
  Alert, Modal
} from "react-native";

import { TextInput } from "react-native-paper";

const Separator = () => {
  return <View style={styles.separator} />;
};

export default function Products() {
  const [key, setKey] = useState('');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [deletingKey, setDeletingKey] = useState(null);
  useEffect(() => {
    async function search() {
      await firebase.database().ref('games').on('value', (snapshot) => {
        setProducts([]);
        snapshot.forEach((chilItem) => {
          let data = {
            //de acordo com a chave de cada item busca os valores 
            //cadastrados na relação e atribui nos dados 
            key: chilItem.key,
            name: chilItem.val().name,
            brand: chilItem.val().brand,
            type: chilItem.val().type,
            price: chilItem.val().price,
          };
          setProducts(oldArray => [...oldArray, data].reverse());
        })
        setLoading(false);
      })
    }
    search();
  }, []);

  //função para excluir um item 
  function handleDelete(key) {
    if (!key) {
      console.log("Chave inválida.");
      return;
    }
    setDeletingKey(key);
    setModalVisible(true);
  }
  function confirmDelete() {
    firebase.database().ref('games').child(deletingKey).remove().then(() => {
      //todos os itens que forem diferentes daquele que foi deletado
      //serão atribuidos no array
      const findGames = games.filter(item => item.key !== deletingKey)
      setStores(findGames)
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
      setName(data.name),
      setBrand(data.brand),
      setType(data.type),
      setPrice(data.price)
  }
  //      if(name.trim() === '' || brand.trim() === '' || price.trim() === '' || type.trim() === ''){

  //método para inserir ou alterar os dados na coleção bike 
  async function insertUpdate() {
    if (name.trim() === '') {
      alert('Insira o nome')
      return;
    } if (brand.trim() === '') {
      alert('Insira nome so estudio')
      return;
    }
    if (price.trim() === '') {
      alert('Insira preço')
      return;
    }
    if (type.trim() === '') {
      alert('Insira genero')
      return;
    }

    //editar dados 
    if (
      (key !== '')

    ) {
      firebase.database().ref('games').child(key).update({
        name: name, brand: brand, price: price, type: type
      })
      //para o teclado do celular fixo abaixo do formulário (não flutuante) 
      Keyboard.dismiss();
      alert('Produto alterado com sucesso');
      clearData();
      setKey('');
      return;
    }
    //cadastrar dados - insert 
    let prod = await firebase.database().ref('games');
    let keyprod = prod.push().key; //cadastar os dados 

    prod.child(keyprod).set({
      name: name,
      brand: brand,
      type: type,
      price: price,
    })
    alert('Produto Inserido!');
    clearData();
  }
  function clearData() {
    setName('');
    setBrand('');
    setType('');
    setPrice('');
  }
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome do game"
        left={<TextInput.Icon icon="gamepad-variant" />}
        maxLength={40}
        style={styles.input}
        onChangeText={(texto) => setName(texto)}
        value={name}
        ref={inputRef}
      />
      <Separator />
      <TextInput
        placeholder="Studio"
        left={<TextInput.Icon icon="briefcase-account" />}
        style={styles.input}
        onChangeText={(texto) => setBrand(texto)}
        value={brand}
        ref={inputRef}
      />
      <Separator />
      <TextInput
        placeholder="Genero"
        left={<TextInput.Icon icon="star-settings" />}
        style={styles.input}
        onChangeText={(texto) => setType(texto)}
        value={type}
        ref={inputRef}
      />
      <Separator />
      <TextInput
        placeholder="Preço"
        left={<TextInput.Icon icon="sack" />}
        style={styles.input}
        onChangeText={(texto) => setPrice(texto)}
        value={price}
        ref={inputRef}
      />
      <Separator />
      <TouchableOpacity onPress={insertUpdate} style={styles.button} activeOpacity={0.5}>
        <Text style={styles.buttonTextStyle}>Salvar</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.listar}>Listagem de Produtos</Text>
      </View>
      {loading ? (
        <ActivityIndicator color="#121212" size={45} />
      ) : (
        <FlatList
          keyExtractor={item => item.key}
          data={products}
          renderItem={({ item }) => (
            <ListProducts data={item} deleteItem={handleDelete}
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
                style={[styles.modalButton, styles.deleteButtonNo]}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text style={styles.modalButtonText}>Nao</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButtonYes]}
                onPress={confirmDelete}>
                <Text style={styles.modalButtonText}>Sim</Text>
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
    backgroundColor: "#32CD32",
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