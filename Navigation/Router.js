import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
 import { NavigationContainer } from '@react-navigation/native'
import CreateBlog from "../screens/CreateBlog"
import GetAllBlog from "../screens/GetAllBlog"
import EditBlog from '../screens/EditBlog'

 const Stack = createStackNavigator()

 const Router = () =>{
       return(
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name={"CreateBlog"} component= {CreateBlog}  />
            <Stack.Screen name={"AllBlog"} component= {GetAllBlog}  />
            <Stack.Screen name={"EditBlog"} component= {EditBlog}  />
        </Stack.Navigator>
     </NavigationContainer>
       )
 }

 export default Router