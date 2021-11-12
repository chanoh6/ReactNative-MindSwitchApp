import { useIsFocused } from "@react-navigation/core";
import React, { useState } from "react";
import { Button, Image, StatusBar, StyleSheet, Text, View } from "react-native";
import styled from "styled-components";
import Modal from "react-native-modal";
import FooterButton from "../components/FooterButton";

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
  // 이름 또는 닉네임 입력 input 유효값 체크
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

  //State를 이용하여 Modal을 제어
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Container>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#141212" />

      {/* 로그아웃 모달창 */}
      <Modal
        //isVisible Props에 State 값을 물려주어 On/off control
        isVisible={modalVisible}
        //아이폰에서 모달창 동작시 깜박임 해결
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        statusBarTranslucent={true}
        style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}
      >
        <ModalView>
          <ModalTit>계정을 로그아웃 할까요?</ModalTit>

          <FooterButton title="로그아웃" />

          <AuthView onPress={() => setModalVisible(false)}>
            <ModalBackText>돌아가기</ModalBackText>
          </AuthView>
        </ModalView>
      </Modal>

      <StyledText>이름 또는 닉네임</StyledText>
      <Input style={!nameValid && styles.inputNull} onChangeText={(text) => chkInputText(text)} />
      {!nameValid && <InpuNullText>이름을 입력해주세요.</InpuNullText>}

      <StyledText>이메일 주소</StyledText>
      <EmailView>
        <Image source={require("../../assets/icon/kakao_logo.png")} style={styles.image} />
        <EmailText>Test@naver.com</EmailText>
      </EmailView>

      <AuthView onPress={() => setModalVisible(true)}>
        <LogoutText>로그아웃</LogoutText>
      </AuthView>

      <FooterButton title="설정 완료" />

      <AuthView onPress={() => navigation.navigate("Leave")}>
        <AuthText>계정 탈퇴</AuthText>
      </AuthView>
    </Container >
  );
};

export default User;
