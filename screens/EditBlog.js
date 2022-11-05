import React, { useState, useEffect } from "react";
import { Text, View, TextInput, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import * as SQLite from 'expo-sqlite'

const EditBlog = ({ route, navigation }) => {
    const db = SQLite.openDatabase('blogs.db')
    const [title, setTitle] = useState('')
    const [descriptions, setDescriptions] = useState('')
    const [likes, setLikes] = useState('')
    const [currentBlog, setCurrentBlog] = useState([])

    console.log(currentBlog[0].descriptions);
    const id = route.params.id
    // console.log(id);

    useEffect(() => {
        const getSingleBlog = () => {
            db.transaction(
                tx => {
                    tx.executeSql(
                        `select title,descriptions,likes from blogs_table where id =?`,
                        [id],
                        (_, { rows }) => {
                            // console.log(JSON.stringify(rows._array));
                            setCurrentBlog(rows._array)
                        },
                        (txObj, error) => console.log('Error ', error)
                    );
                }
            );
        }
        getSingleBlog()
    }, [])




    const editBlog = () => {
        db.transaction((tx) =>{
            tx.executeSql(
                `UPDATE blogs_table SET title = ?,descriptions = ?, likes=? WHERE id=?`,
                [title,descriptions,likes,id ],
                (tx, results) =>{
                    console.log(results);
                    if(results.rowsAffected >0){
                        alert('Blog Updated Successfully...')
                        navigation.navigate("AllBlog")
                    }else{
                        alert("Error")
                    }
                }
            )
        })
    }
    return (
        <View style={styles.container}>
            <Text
                style={styles.text}
            >Blog
            </Text>
          {currentBlog &&  
            <View style={styles.userRequest} key={currentBlog[0].id}>
                <TextInput
                    onChangeText={(value) => setTitle(value)}
                    style={styles.requestText}
                    
                    value={title}
                    defaultValue={currentBlog[0].title}
                />
                <TextInput
                    onChangeText={(value) => setDescriptions(value)}
                    style={styles.requestText}
                  
                    multiline
                    value={descriptions}
                    defaultValue={currentBlog[0].descriptions}
                />
                <TextInput
                    onChangeText={(value) => setLikes(value)}
                    style={styles.requestText}
                  
                    value={likes}
                    defaultValue={currentBlog[0].likes}
                />
                <TouchableOpacity
                    onPress={() => editBlog()}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                onPress={() => create()}
                style={styles.button}
                >
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity> */}
            </View>
        }
        </View>
    )
}

export default EditBlog

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#8cd98c",
        width: "100%",
        height: "100%"
    },
    userRequest: {
        marginVertical: 100,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 23,
        marginHorizontal: 10,
        width: Dimensions.get('screen').width - 20,
    },
    requestText: {
        width: "60%",
        height: 40,
        margin: 20,
        borderRadius: 15,
        backgroundColor: "white",
        color: "black",
        paddingLeft: 10,
        fontSize: 16,
        fontWeight: "bold"
    },
    button: {
        width: "60%",
        height: 30,
        margin: 20,
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: "#66cc66"
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    },
    text: {
        color: "white",
        textAlign: "center",
        marginTop: 100,
        fontWeight: "bold",
        fontSize: 30,
    },
    selectPicker: {
        width: 100,
        height: 50
    },
    optionTitle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 30,
    },
    item: {
        padding: 12
    }
})
