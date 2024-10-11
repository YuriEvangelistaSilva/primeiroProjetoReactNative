import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default function ListProducts({ data, deleteItem, editItem }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Produto: {data.name}</Text>
            <Text style={styles.text}>Marca: {data.brand}</Text>
            <Text style={styles.text}>genero: {data.type}</Text>
            <Text style={styles.text}>preço:(R$) {data.price}</Text>
            <View style={styles.item}>
                <TouchableOpacity onPress={() => deleteItem(data.key)}>
                    <Icon name="trash" color="#A52A2A" size={20}>Excluir</Icon>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => editItem(data)}>
                    <Icon name="create" color="blue" size={20}>Editar</Icon>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        padding: 10,
        backgroundColor: '#FFF',
    },

    text: {
        color: 'black',
        fontSize: 17
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
}); 