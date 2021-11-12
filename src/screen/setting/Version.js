import { useIsFocused } from "@react-navigation/core";
import React from "react";
import { Image, StatusBar } from "react-native";
import styled from "styled-components";

const Container = styled.View`
  position: relative;
  flex: 1;
  background-color: #141212;
  align-items: center;
  justify-content: center;
  padding: 24px;
  height: 100%;
  margin-top: -80px;
`;

const VersionText = styled.Text`
  font-size: 14px;
  color: #fff;
  margin-top: 16px;
  margin-bottom: 32px;
`;

const TermContainer = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  padding: 8px; 0;
  border-radius: 32px;
  margin-top: 8px;
  width: 70%;
`;

const TermText = styled.Text`
  font-size: 16px;
  color: #fff;
`;

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const Version = () => {
  return (
    <Container>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#141212" />

      <Image source={require("../../../assets/mindswitch_logo.png")} />

      <VersionText>버전 1.0.0</VersionText>

      <TermContainer>
        <TermText>이용약관</TermText>
      </TermContainer>

      <TermContainer>
        <TermText>개인정보 처리방침</TermText>
      </TermContainer>
    </Container>
  );
};

export default Version;
