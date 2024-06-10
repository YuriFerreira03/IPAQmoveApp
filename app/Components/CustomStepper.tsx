import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CustomStepper = ({ steps, activeStep }) => {
  return (
    <View style={styles.stepper}>
      {steps.map((label, index) => (
        <View key={index} style={styles.stepContainer}>
          <View
            style={[styles.circle, index === activeStep && styles.activeCircle]}
          >
            <Text
              style={[
                styles.stepLabel,
                index === activeStep && styles.activeStepLabel,
              ]}
            >
              {label}
            </Text>
          </View>
          {index < steps.length - 1 && (
            <View
              style={[styles.line, index === activeStep && styles.activeLine]}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  activeCircle: {
    backgroundColor: "#14E2C3",
  },
  stepLabel: {
    fontSize: 17,
    color: "#000",
  },
  activeStepLabel: {
    color: "#000",
  },
  line: {
    width: 40,
    height: 2,
    backgroundColor: "#ccc",
  },
  activeLine: {
    backgroundColor: "#14E2C3",
  },
});

export default CustomStepper;
