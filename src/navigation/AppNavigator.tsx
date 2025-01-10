import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
// import TodoListScreen from '../screens/TodoListScreen'; TODO Future screens
// import CompletedTasksScreen from '../screens/CompletedTasksScreen'; TODO Future screens
import TestScreen from "../screens/TestScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* <Tab.Screen name="Todo List" component={TodoListScreen} /> TODO Future screens */}
        {/* <Tab.Screen name="Completed Tasks" component={CompletedTasksScreen} /> TODO Future screens */}
        <Tab.Screen name="TestScreen" component={TestScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
