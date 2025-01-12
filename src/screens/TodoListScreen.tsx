import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Button,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddTaskModal from "../components/AddTaskModal";
import TodoItem from "../components/TodoItem";
import { useIsFocused } from "@react-navigation/native";

interface Task {
  id: string;
  name: string;
  isCompleted: boolean;
  createdAt: string;
  dueDate: string | null;
}

const STORAGE_KEY = "@todo_list_tasks";

const TodoListScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("name");
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedTasks) {
          const parsedTasks = JSON.parse(storedTasks);
          setTasks(parsedTasks);
          setFilteredTasks(parsedTasks);
        }
      } catch (error) {
        console.error("Error loading tasks from AsyncStorage:", error);
      }
    };

    if (isFocused) {
      loadTasks();
    }
  }, [isFocused]);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.error("Error saving tasks to AsyncStorage:", error);
      }
    };

    saveTasks();
  }, [tasks]);

  useEffect(() => {
    let filtered = tasks;

    if (searchQuery.trim()) {
      filtered = filtered.filter((task) =>
        task.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortOption) {
      case "name":
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "status":
        filtered = [...filtered].sort(
          (a, b) => Number(a.isCompleted) - Number(b.isCompleted)
        );
        break;
      case "date":
        filtered = [...filtered].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "dueDate":
        filtered = [...filtered].sort((a, b) => {
          // If one of the dueDates are null it will be put in the end of the list
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;

          // Compare dates when they are defined
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        });
        break;
    }

    setFilteredTasks(filtered);
  }, [tasks, searchQuery, sortOption]);

  const addTask = (taskName: string, dueDate: string | null) => {
    const newTask: Task = {
      id: Date.now().toString(),
      name: taskName,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      dueDate,
    };
    setTasks((prev) => [...prev, newTask]);
    setModalVisible(false);
  };

  const editTask = (
    taskId: string,
    newTaskName: string,
    newDueDate: string | null
  ) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, name: newTaskName, dueDate: newDueDate }
          : task
      )
    );
  };

  const toggleTaskStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search tasks..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.sortOptions}>
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortOption === "name" && styles.selectedSort,
          ]}
          onPress={() => setSortOption("name")}
        >
          <Text>Sort by Name</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortOption === "status" && styles.selectedSort,
          ]}
          onPress={() => setSortOption("status")}
        >
          <Text>Sort by Status</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortOption === "date" && styles.selectedSort,
          ]}
          onPress={() => setSortOption("date")}
        >
          <Text>Sort by Date</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortOption === "dueDate" && styles.selectedSort,
          ]}
          onPress={() => setSortOption("dueDate")}
        >
          <Text>Sort by dueDate</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            taskName={item.name}
            isCompleted={item.isCompleted}
            dueDate={item.dueDate}
            onToggle={() => toggleTaskStatus(item.id)}
            onDelete={() => deleteTask(item.id)}
            onEdit={(newName, newDueDate) =>
              editTask(item.id, newName, newDueDate)
            }
          />
        )}
      />
      <Button title="Add Task" onPress={() => setModalVisible(true)} />
      <AddTaskModal
        visible={isModalVisible}
        onAdd={(taskName, dueDate) => addTask(taskName, dueDate)}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  sortOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sortButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
  },
  selectedSort: {
    backgroundColor: "#d3d3d3",
  },
});

export default TodoListScreen;
