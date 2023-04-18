import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function Popup(props) {
  return (
    <View style={styles.overlay}>
      <View style={styles.floatingBox}>
        <Text style={[styles.sectionTitle, { textAlign: "center" }]}>
          {props.message}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => props.setShowConfirmation(false)}
            style={[
              styles.confirmButton,
              { backgroundColor: "#33383F", marginRight: 20 },
            ]}
          >
            <Text style={styles.whiteText}>
              {props.cancelMessage ? props.cancelMessage : "Cancel"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.actionFunction();
              props.setShowConfirmation(false);
            }}
            style={[
              styles.confirmButton,
              { backgroundColor: props.confirmButtonColor, marginLeft: 20 },
            ]}
          >
            <Text>
              {props.confirmMessage ? props.confirmMessage : "Confirm"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export const styles = StyleSheet.create({
  // containers
  floatingBox: {
    backgroundColor: "#171722",
    padding: 20,
    borderRadius: 5,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(5,5,10,0.7)",
    zIndex: 998,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // texts
  whiteText: {
    color: "#FFFFFF",
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "bold",
  },

  // buttons
  newTaskBtn: {
    backgroundColor: "#28B985",
    marginTop: 20,
    marginBottom: 20,
    zIndex: 2,
  },
  actionBtn: {
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "75%",
  },
  backBtn: {
    zIndex: 2,
    position: "relative",
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  confirmButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
