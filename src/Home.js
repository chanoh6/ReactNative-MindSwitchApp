import { useIsFocused } from "@react-navigation/core";
import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import styled from "styled-components";

const PayOpenBtn = styled.TouchableOpacity`
  height: 50px;
  width: 60%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 1);
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const Home = ({ navigation }) => {
  return (
    <Container>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fff" />

      <PayOpenBtn onPress={() => navigation.navigate("Pay")}>
        <Text>음악 잠금 해제</Text>
      </PayOpenBtn>
    </Container>
  );
};

export default Home;
