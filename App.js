import React, { Component } from "react";
import { View, StyleSheet, Button } from "react-native";
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
const formUrlEncoded = (x) =>
  Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, "");

export default class App extends Component {
  handleSubmit = () => {
    const value = this._form.getValue();
    console.log("value: ", value.sepalWidth);

    axios({
      url: "https://iris-predict-duka.herokuapp.com/predict",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: formUrlEncoded({
        sepal_length: value.sepalLenght,
        sepal_width: value.sepalWidth,
        petal_lenght: value.petalLenght,
        petalw_idth: value.petalWidth,
      }),
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Form ref={(c) => (this._form = c)} type={Iris} options={options} />
        <Button title="Process" onPress={this.handleSubmit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 50,
    padding: 20,
    backgroundColor: "#ffffff",
  },
});
