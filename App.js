import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from "react-native";
import axios from "axios";

import t from "tcomb-form-native";

const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

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
      color: "white",
      fontSize: 18,
      marginBottom: 3,
      fontWeight: "800",
    },
    // the style applied when a validation error occours
    error: {
      color: "red",
      fontSize: 18,
      marginBottom: 3,
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
          Alert.alert(response.data.Prediction);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          resizeMode={"stretch"} // or cover
          style={{ flex: 1 }} // must be passed from the parent, the number may vary depending upon your screen size
          source={require("./assets/iris.jpg")}
          imageStyle={{ opacity: 0.8 }}
        >
          <View style={styles.container}>
            <View
              style={{ alignItems: "center", fontSize: 50, marginBottom: 30 }}
            >
              <Text style={{ fontSize: 30, fontWeight: "800" }}>
                Iris Flower Predictor
              </Text>
            </View>
            <Form ref={(c) => (this._form = c)} type={Iris} options={options} />

            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  width: 200,
                  height: 50,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                }}
                onPress={this.handleSubmit}
              >
                <Text style={{ fontSize: 30 }}>Predict!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "rgba(255,0,0,0.5)",
    marginTop: 0,
    padding: 20,
    backgroundColor: "transparent",
  },
});
