import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../screens/LoginScreen";
import TodoListScreen from "../screens/TodoListScreen";
import CompletedTasksScreen from "../screens/CompletedTasksScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Todo List"
      component={TodoListScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Completed Tasks"
      component={CompletedTasksScreen}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Main" component={TabNavigator} />
  </Stack.Navigator>
);

export default AppNavigator;
