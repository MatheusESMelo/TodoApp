import React, { useState } from "react";
import {
  Modal,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface AddTaskModalProps {
  visible: boolean;
  onAdd: (taskName: string, dueDate: string | null) => void;
  onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  visible,
  onAdd,
  onClose,
}) => {
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const resetFields = () => {
    setTaskName("");
    setDueDate(null);
    setShowDatePicker(false);
  };

  const handleAddTask = () => {
    if (taskName.trim()) {
      onAdd(taskName.trim(), dueDate ? dueDate.toISOString() : null);
      resetFields();
      onClose();
    } else {
      alert("Please enter a task name.");
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Add New Task</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter task name"
                placeholderTextColor="#999"
                value={taskName}
                onChangeText={setTaskName}
              />
              <Button
                title={
                  dueDate
                    ? `Due Date: ${dueDate.toLocaleDateString()}`
                    : "Set Due Date"
                }
                onPress={() => setShowDatePicker(true)}
              />
              {showDatePicker && (
                <DateTimePicker
                  value={dueDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setShowDatePicker(false);
                    if (date) setDueDate(date);
                  }}
                />
              )}
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleAddTask}
                >
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    resetFields();
                    onClose();
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "90%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginRight: 5,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginLeft: 5,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AddTaskModal;
