import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite'
import { useNavigation } from '@react-navigation/native';


const GetAllBlog = () => {
    const db = SQLite.openDatabase('blogs.db')
    const [data, setData] = useState([])
    const navigation = useNavigation()

    const deleteBlog = (id) => {
        db.transaction(tx => {
            tx.executeSql("DELETE FROM blogs_table WHERE id=?", [id],
                (txObj, results) => {
                    // console.log('Results', results.rowsAffected);
                    alert("blog has been deleted successfully")
                    navigation.navigate("CreateBlog")
                }
            )
        })
    }

    useEffect(() => {
        db.transaction(
            tx => {
                tx.executeSql(
                    "select * from blogs_table",
                    [],
                    (_, { rows }) => {
                        
                        setData(rows._array)
                    },
                    (txObj, error) => console.log('Error ', error)

                );
            }
        );
    }, [deleteBlog])

  

    return (
        <View style={styles.container}>
            <Text style={styles.toptext}>All Blogs</Text>
            <FlatList
                data={data}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card} >
                        <Text style={styles.text}>title:{item.title} </Text>
                        <Text style={styles.text1}>Description:{item.descriptions} </Text>
                        <Text style={styles.text1}>likes:{item.likes} </Text>
                        <View style={styles.iconContainer}> 
                            <EvilIcons name="pencil" style={styles.icon} size={24} color="white" onPress={() => navigation.navigate("EditBlog",{id:item.id})} />
                            <AntDesign name="delete" onPress={() => deleteBlog(item.id)} style={styles.icon} size={24} color="white" />
                        </View>
                    </View>
                )} />
        </View>
    )
}

export default GetAllBlog;

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    },
    head: {

    },
    card: {
        marginTop: 15,
        marginBottom: 20,
        backgroundColor: "grey",
        width: "100%",
        height: 200,
        // marginHorizontal: 10,
        borderRadius: 15,

    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 12,
        marginTop: 12
    },
    text1: {
        fontSize: 16,
        marginLeft: 12,
        marginTop: 25
    },
    toptext: {
        marginLeft: 120,
        color: "grey",
        fontSize: 20,
        fontWeight: '600'
    },
    icon: {
        left: 200,
        top: 0,
        bottom: 0,
        marginLeft: 15,
    },
    iconContainer: {
        flexDirection: "row",
        marginLeft: 15,
        marginTop: 35

    }

})
