import React ,{useState} from "react";
import { Text, View, TextInput, StyleSheet ,Dimensions, TouchableOpacity } from "react-native";
import * as SQLite from 'expo-sqlite'
import { useNavigation } from "@react-navigation/native";


const CreateBlog = () => {
    const db = SQLite.openDatabase('blogs.db')
    const [title, setTitle] = useState('')
    const [descriptions,setDescriptions] = useState('')
    const [likes, setLikes] = useState('')
    const navigation = useNavigation()
  
    console.log(title, descriptions,likes);
    const createBlog = ()=>{

        if (title == '' || descriptions == '' || likes == '') {
            alert('Please Enter All the Values');
          } else {
       
        db.transaction(tx =>{
            tx.executeSql(
                "CREATE TABLE if not exists blogs_table(id INTEGER PRIMARY KEY,title TEXT,descriptions TEXT, likes TEXT);",
              );
              
            tx.executeSql(  
                'INSERT INTO blogs_table(title,descriptions,likes) values (?,?,?)',[title,descriptions,likes],
                (textObj,result)=>(
                    console.log(result)
                )
            ,(textObj,error) =>(
                console.log("error",error)
            )
        )
    })}}
    return (
        <View style={styles.container}>
            <Text
                style={styles.text}
            >BLOG
            </Text>
            <View style={styles.userRequest}>
                <TextInput
                    onChangeText={(value) => setTitle(value)}
                    style={styles.requestText}
                    placeholder="Title"
                    value={title}
                />
                <TextInput
                    onChangeText={(value) => setDescriptions(value)}
                    style={styles.requestText}
                    placeholder="Descriptions"
                    multiline
                    value={descriptions}
                />
                <TextInput
                    onChangeText={(value) => setLikes(value)}
                    style={styles.requestText}
                    placeholder="Likes"
                    value={likes}
                />
                <TouchableOpacity
                onPress={() => createBlog()}
                style={styles.button}
                >
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => navigation.navigate("AllBlog")}
                style={styles.button}
                >
                    <Text style={styles.buttonText}>View</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CreateBlog


const styles = StyleSheet.create({
    container:{
        backgroundColor: "#8cd98c",
        width:"100%",
        height:"100%"
    },
    userRequest:{
        marginVertical:100,
        justifyContent:'center',
        alignItems:"center",
        borderRadius:23,
        marginHorizontal:10,
        width:Dimensions.get('screen').width - 20,
    },
    requestText:{
        width:"60%",
        height:40,
        margin:20,
        borderRadius:15,
        backgroundColor: "white",
        color: "black",
        paddingLeft:10,
        fontSize: 16,
        fontWeight:"bold"
    },
    button:{
        width:"60%",
        height:30,
        margin:20,
        borderRadius:15,
        alignItems:'center',
        backgroundColor:"#66cc66"
    },
    buttonText:{
        color:"white",
        fontWeight:"bold",
        fontSize:20
    },
    text:{
        color: "white",
        textAlign:"center",
        marginTop:100,
        fontWeight:"bold",
        fontSize:30,
        },
    selectPicker:{
        width: 100,
        height:50
        },
    optionTitle:{
        color:"white",
        fontWeight:"bold",
        fontSize:30,
    },
    item:{
       padding: 12 
    }
})
