import { useIsFocused } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Alert, Image, StatusBar, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components";
import { localNotificationService } from "../services/LocalNotificationService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FooterButton from "../components/FooterButton";

const Container = styled.View`
  position: relative;
  flex: 1;
  background-color: #141212;
  padding: 24px;
  height: 100%;
`;

const ImageView = styled.View`
  margin: 0 auto;
  width: 200px;
  height: 200px;
`;

const FlexView = styled.View`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 0;
`;

const FlexText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  margin-left: 8px;
`;

const BtnFlexView = styled.View`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ToggleBtn = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 32px;
  background-color: #282828;
  border-radius: 50px;
  ${({ active }) =>
    active &&
    `
    background-color: #fff;
  `}
`;

const ToggleText = styled.Text`
  font-size: 14px;
  color: #000;
  font-weight: bold;
`;

const InfoText = styled.Text`
  font-size: 12px;
  color: gray;
  text-align: center;
  margin-bottom: 16px;
`;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const pushSelects = ['on', 'off'];
const benefitSelects = ['on', 'off'];

const Notification = ({ navigation, i }) => {
  const [push, setPush] = useState(pushSelects[1]);
  const [benefit, setBenefit] = useState(benefitSelects[1]);
  const [tasks, setTasks] = useState({});

  // Push 알림 버튼 동작
  function onPushClick(select) {
    setPush(select);
    if (select === 'off') {
      localNotificationService.channelDelete('push-channel');
    } else if (select === 'on') {
      localNotificationService.createPushChannel();
    }
  };

  // 혜택 알림 버튼 동작
  function onBenefitClick(select) {
    setBenefit(select);
    if (select === 'off') {
      localNotificationService.channelDelete('benefit-channel');
    } else if (select === 'on') {
      localNotificationService.createBenefitChannel();
    }
  }

  // 설정 완료 버튼 동작
  const _saveTasks = async tasks => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      setTasks(tasks);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#141212" />

      <ImageView>
        <Image source={require("../../assets/lightbulb.gif")} style={styles.image} />
      </ImageView>

      <FlexView>
        <MaterialCommunityIcons name="bell-outline" size={24} color="white" />

        <FlexText>PUSH 알림 받기</FlexText>

        <BtnFlexView>
          {pushSelects.map((select, index) => (
            <ToggleBtn
              key={select}
              active={push === select}
              onPress={() => onPushClick(select)}
              style={(index === 0) && { marginRight: 16 }}
            >
              <ToggleText>{select}</ToggleText>
            </ToggleBtn>
          ))}
        </BtnFlexView>
      </FlexView>

      <InfoText>새로운 소식과 추천 콘텐츠를 만나보세요!</InfoText>

      <FlexView>
        <MaterialCommunityIcons name="shopping-outline" size={24} color="white" />

        <FlexText>혜택 및 마케팅 알림</FlexText>

        <BtnFlexView>
          {benefitSelects.map((select, index) => (
            <ToggleBtn
              key={select}
              active={benefit === select}
              onPress={() => onBenefitClick(select)}
              style={(index === 0) && { marginRight: 16 }}
            >
              <ToggleText>{select}</ToggleText>
            </ToggleBtn>
          ))}
        </BtnFlexView>
      </FlexView>

      <InfoText>다양한 혜택을 푸시로 알려드립니다.</InfoText>

      <FooterButton title="설정 완료" />
    </Container>
  );
};

export default Notification;
