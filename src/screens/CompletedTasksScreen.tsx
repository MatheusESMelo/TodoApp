import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, SafeAreaView, Text } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TodoItem from "../components/TodoItem";

interface Task {
  id: string;
  name: string;
  isCompleted: boolean;
}

// Key used for storing and retrieving tasks in AsyncStorage
const STORAGE_KEY = "@todo_list_tasks";

const CompletedTasksScreen: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  // Hook to determine if the screen is currently focused
  const isFocused = useIsFocused();

  // useEffect to load completed tasks from AsyncStorage whenever the screen is focused
  useEffect(() => {
    const loadCompletedTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedTasks) {
          const allTasks = JSON.parse(storedTasks);
          const completed = allTasks.filter((task: Task) => task.isCompleted);
          setCompletedTasks(completed);
        }
      } catch (error) {
        console.error("Failed to load completed tasks:", error);
      }
    };

    if (isFocused) {
      loadCompletedTasks(); // Load tasks when screen is focused
    }
  }, [isFocused]);

  // Function to delete a task from the list and update AsyncStorage
  const deleteTask = (id: string) => {
    setCompletedTasks((prev) => prev.filter((task) => task.id !== id));

    // Async function to update the stored tasks in AsyncStorage
    const updateStorage = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedTasks) {
          const allTasks = JSON.parse(storedTasks).filter(
            (task: Task) => task.id !== id
          );
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(allTasks));
        }
      } catch (error) {
        console.error("Failed to update tasks:", error);
      }
    };

    updateStorage(); // Call the async function to update storage
  };

  return (
    <SafeAreaView style={styles.containerSafeAreaView}>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Completed Tasks</Text>
        <FlatList
          data={completedTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoItem
              taskName={item.name}
              isCompleted={item.isCompleted}
              onToggle={() => {}}
              onDelete={() => deleteTask(item.id)}
              disableEdit={true}
              onEdit={() => {}}
              dueDate={item.dueDate}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerSafeAreaView: {
    flex: 1,
    paddingTop: 24,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    zIndex: 9,
  },
});

export default CompletedTasksScreen;
