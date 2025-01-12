import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface TodoItemProps {
  taskName: string;
  isCompleted: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (newTaskName: string, newDueDate?: Date | null) => void;
  disableEdit?: boolean;
  dueDate?: string | null;
}

const TodoItem: React.FC<TodoItemProps> = ({
  taskName,
  isCompleted,
  onToggle,
  onDelete,
  onEdit,
  disableEdit = false,
  dueDate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskName, setNewTaskName] = useState(taskName);
  const [dueDateNew, setDueDateNew] = useState<Date | null>(
    dueDate ? new Date(dueDate) : null
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    if (newTaskName.trim()) {
      onEdit(newTaskName, dueDateNew);
      setIsEditing(false);
    } else {
      Alert.alert("Invalid Input", "Task name cannot be empty.");
    }
  };

  const handleCloseModal = () => {
    Alert.alert("Discard Changes?", "Your changes will not be saved.", [
      { text: "Cancel", style: "cancel" },
      { text: "Discard", onPress: () => setIsEditing(false) },
    ]);
  };

  const completedStyle = isCompleted ? { backgroundColor: "#e0f7fa" } : {};

  return (
    <View style={[styles.container, completedStyle]}>
      <TouchableOpacity style={styles.checkbox} onPress={onToggle}>
        {isCompleted && <View style={styles.checked} />}
      </TouchableOpacity>
      <View style={{ flexDirection: "column" }}>
        <Text style={[styles.taskName, isCompleted && styles.completedTask]}>
          {taskName}
        </Text>
        {dueDate && (
          <Text style={styles.dueDateText}>
            Due: {new Date(dueDate).toLocaleDateString()}
          </Text>
        )}
      </View>
      {!disableEdit && (
        <Button
          title="Edit"
          color="#2196F3"
          onPress={() => setIsEditing(true)}
        />
      )}
      <View style={{ marginLeft: 4 }}>
        <Button title="Delete" color="#f44336" onPress={onDelete} />
      </View>

      {/* Modal de edição */}
      <Modal visible={isEditing} animationType="fade" transparent>
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={handleCloseModal}
        >
          <View
            style={styles.modalContent}
            onStartShouldSetResponder={() => true}
          >
            <Text style={styles.modalTitle}>Edit Task</Text>
            <TextInput
              style={styles.input}
              value={newTaskName}
              onChangeText={setNewTaskName}
              placeholder="Enter new task name"
            />
            <Button
              title={
                dueDateNew && !isNaN(new Date(dueDateNew).getTime())
                  ? `Due Date: ${new Date(dueDateNew).toLocaleDateString()}`
                  : "Set Due Date"
              }
              onPress={() => setShowDatePicker(true)}
            />

            {showDatePicker && (
              <DateTimePicker
                value={dueDateNew || new Date()}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  setShowDatePicker(false);
                  if (date) setDueDateNew(date);
                }}
              />
            )}
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.addButton} onPress={handleSave}>
                <Text style={styles.addButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCloseModal}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#4CAF50",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checked: {
    width: 12,
    height: 12,
    backgroundColor: "#4CAF50",
  },
  taskName: {
    flex: 1,
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  dueDateText: {
    fontSize: 14,
    color: "#757575",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#f44336",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TodoItem;
