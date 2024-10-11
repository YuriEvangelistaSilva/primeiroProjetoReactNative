import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default function ListStores({ data, deleteItem, editItem }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>nome loja: {data.nameStore}</Text>
            <Text style={styles.text}>cidade: {data.city}</Text>
            <Text style={styles.text}>endereço: {data.endereco}</Text>
            <Text style={styles.text}>email: {data.email}</Text>
            <Text style={styles.text}>tel: {data.tel}</Text>
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