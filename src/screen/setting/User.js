import { useIsFocused } from "@react-navigation/core";
import React, { useState } from "react";
import { Button, Image, StatusBar, StyleSheet, Text, View } from "react-native";
import styled from "styled-components";
import Modal from "react-native-modal";
import FooterButton from "../../components/FooterButton";

const Container = styled.View`
  position: relative;
  flex: 1;
  background-color: #141212;
  padding: 24px;
  height: 100%;
`;

const StyledText = styled.Text`
  font-size: 14px;
  color: #fff;
  margin-top: 16px;
`;

const Input = styled.TextInput`
  width: 100%;
  height: 42px;
  background-color: #fff;
  margin-top: 12px;
  border-radius: 8px;
  padding: 0 16px 0 16px;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
`;

const EmailView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 42px;
  background-color: #fff;
  margin-top: 12px;
  border-radius: 8px;
  padding: 0 16px 0 16px;
`;

const EmailText = styled.Text`
  color: #000;
  font-size: 16px;
  font-weight: 700;
  margin-left: 8px;
`;

const AuthView = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 12px;
`;

const LogoutText = styled.Text`
  font-size: 14px;
  color: #D3D3D3;
  text-decoration: underline;
`;

const AuthText = styled.Text`
  font-size: 14px;
  color: #D3D3D3;
  text-decoration: underline;
  text-align: center;
  margin-top: 16px;
`;

const ModalView = styled.View`
  width: 100%;
  height: 250px;
  background-color: #282828;
  padding: 24px 16px;
  border-radius: 16px;
`;

const ModalTit = styled.Text`
  color: #fff;
  font-size: 18px;
  text-align: center;
  margin-top: 32px;
  font-weight: bold;
`;

const ModalBackText = styled.Text`
  font-size: 14px;
  color: #fff;
`;

const InpuNullText = styled.Text`
  font-size: 14px;
  color: #f05650;
  font-weight: 700;
  margin-top: 8px;
`;

const styles = StyleSheet.create({
  image: {
    zIndex: 10,
  },
  inputNull: {
    borderColor: '#f05650',
    borderWidth: 2,
  },
});

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const User = ({ navigation }) => {
  // ?????? ?????? ????????? ?????? input ????????? ??????
  const [textInputName, setTextInputName] = useState('');
  const [nameValid, setNameValid] = useState(false);

  const chkInputText = (text) => {
    if (text.trim().length === 0) {
      setNameValid(false);
    } else {
      setNameValid(true);
    }
    setTextInputName(text);
  };

  //State??? ???????????? Modal??? ??????
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Container>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#141212" />

      {/* ???????????? ????????? */}
      <Modal
        //isVisible Props??? State ?????? ???????????? On/off control
        isVisible={modalVisible}
        //??????????????? ????????? ????????? ????????? ??????
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        statusBarTranslucent={true}
        style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}
      >
        <ModalView>
          <ModalTit>????????? ???????????? ??????????</ModalTit>

          <FooterButton title="????????????" />

          <AuthView onPress={() => setModalVisible(false)}>
            <ModalBackText>????????????</ModalBackText>
          </AuthView>
        </ModalView>
      </Modal>

      <StyledText>?????? ?????? ?????????</StyledText>
      <Input style={!nameValid && styles.inputNull} onChangeText={(text) => chkInputText(text)} />
      {!nameValid && <InpuNullText>????????? ??????????????????.</InpuNullText>}

      <StyledText>????????? ??????</StyledText>
      <EmailView>
        <Image source={require("../../../assets/icon/kakao_logo.png")} style={styles.image} />
        <EmailText>Test@naver.com</EmailText>
      </EmailView>

      <AuthView onPress={() => setModalVisible(true)}>
        <LogoutText>????????????</LogoutText>
      </AuthView>

      <FooterButton title="?????? ??????" />

      <AuthView onPress={() => navigation.navigate("Leave")}>
        <AuthText>?????? ??????</AuthText>
      </AuthView>
    </Container >
  );
};

export default User;
