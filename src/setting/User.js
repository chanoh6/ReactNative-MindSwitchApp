import { useIsFocused } from "@react-navigation/core";
import React from "react";
import { StatusBar } from "react-native";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const StyledText = styled.Text`
  font-size: 30px;
`;

function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
}

const User = () => {
    return (
        <Container>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fff" />

            <StyledText>User</StyledText>
        </Container>
    );
};

export default User;
