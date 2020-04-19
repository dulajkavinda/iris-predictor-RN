import React, { Component } from "react";
import { View, StyleSheet, Button, Text, Alert } from "react-native";
import axios from "axios";

import t from "tcomb-form-native";

const Form = t.form.Form;

const Iris = t.struct({
  sepalLenght: t.Number,
  sepalWidth: t.Number,
  petalLength: t.Number,
  petalWidth: t.Number,
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10,
    },
  },
  controlLabel: {
    normal: {
      color: "blue",
      fontSize: 18,
      marginBottom: 7,
      fontWeight: "600",
    },
    // the style applied when a validation error occours
    error: {
      color: "red",
      fontSize: 18,
      marginBottom: 7,
      fontWeight: "600",
    },
  },
};

const options = {
  fields: {
    petalLenght: {
      label: "Agree to Terms",
    },
  },
  stylesheet: formStyles,
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Prediction: "",
    };
  }

  handleSubmit = () => {
    const value = this._form.getValue();

    axios
      .post("https://iris-predict-duka.herokuapp.com/predict/", {
        sepal_length: value.sepalLenght,
        sepal_width: value.sepalWidth,
        petal_length: value.petalLength,
        petal_width: value.petalWidth,
      })
      .then(
        (response) => {
          console.log(response.data.Prediction);
          this.setState({ Prediction: response.data.Prediction });
          giAlert.alert(response.data.Prediction);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: "center", fontSize: 50, marginBottom: 30 }}>
          <Text style={{ fontSize: 25, fontWeight: "800" }}>
            Iris Flower Detector
          </Text>
        </View>

        <Form ref={(c) => (this._form = c)} type={Iris} options={options} />
        <Button
          style={{ padding: 30, color: "red" }}
          title="Process"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",

    marginTop: 10,
    padding: 20,
    backgroundColor: "#ffffff",
  },
});
