import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TodoItem from "../components/TodoItem";

interface Task {
  id: string;
  name: string;
  isCompleted: boolean;
}

const STORAGE_KEY = "@todo_list_tasks";

const CompletedTasksScreen: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const isFocused = useIsFocused();

  // Load tasks from AsyncStorage
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
      loadCompletedTasks();
    }
  }, [isFocused]);

  const deleteTask = (id: string) => {
    setCompletedTasks((prev) => prev.filter((task) => task.id !== id));

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

    updateStorage();
  };

  return (
    <View style={styles.container}>
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
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default CompletedTasksScreen;
