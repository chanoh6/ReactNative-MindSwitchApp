import React, { useState } from "react";
import { Button, Image, StatusBar, StyleSheet, Text, View } from "react-native";
import styled from "styled-components";

const SetBtnView = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const SetButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 45px
  margin: 0 auto;
  background-color: #42a5f5;
  border-radius: 30px;
`;

const ButtonTit = styled.Text`
  font-size: 15px;
  color: #fff;
`;

const FooterButton = ({ onPress, title }) => {
  return (
    <SetBtnView>
      <SetButton onPress={onPress}>
        <ButtonTit>{title}</ButtonTit>
      </SetButton>
    </SetBtnView>
  );
};

export default FooterButton;