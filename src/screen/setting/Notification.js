import { useIsFocused } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Alert, Image, StatusBar, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components";
import { localNotificationService } from "../../services/LocalNotificationService";
import FooterButton from "../../components/FooterButton";
import AsyncStorage from '@react-native-community/async-storage';
import SwitchToggle from "../../components/SwitchToggle";

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

// const pushSelects = ['on', 'off'];
// const benefitSelects = ['on', 'off'];

const Notification = ({ navigation }) => {
  // const [push, setPush] = useState(pushSelects[1]);
  // const [benefit, setBenefit] = useState(benefitSelects[1]);
  const [tasks, setTasks] = useState({});
  const [isPushToggle, setIsPushToggle] = useState(false);
  const [isBenenfitToggle, setIsBenefitToggle] = useState(false);

  // Toggle ?????? ??????
  const _pushToggleSwitch = () => {
    setIsPushToggle(!isPushToggle);
  };

  const _benefitToggleSwitch = () => {
    setIsBenefitToggle(!isBenenfitToggle);
  };

  // Push ?????? ?????? ??????
  function onPushClick(select) {
    setPush(select);
    if (select === 'off') {
      localNotificationService.channelDelete('push-channel');
    } else if (select === 'on') {
      localNotificationService.createPushChannel();
    }
  };

  // ?????? ?????? ?????? ??????
  function onBenefitClick(select) {
    setBenefit(select);
    if (select === 'off') {
      localNotificationService.channelDelete('benefit-channel');
    } else if (select === 'on') {
      localNotificationService.createBenefitChannel();
    }
  }

  // ?????? ?????? ?????? ??????
  const _saveTask = async tasks => {
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
        <Image source={require("../../../assets/lightbulb.gif")} style={styles.image} />
      </ImageView>

      <FlexView>
        <MaterialCommunityIcons name="bell-outline" size={24} color="white" />

        <FlexText>PUSH ?????? ??????</FlexText>

        <BtnFlexView>
          {/* {pushSelects.map((select, index) => (
            <ToggleBtn
              key={select}
              active={push === select}
              onPress={() => _pushTask(select)}
              style={(index === 0) && { marginRight: 16 }}
            >
              <ToggleText>{select}</ToggleText>
            </ToggleBtn>
          ))} */}
          <SwitchToggle isOn={isPushToggle} onToggle={_pushToggleSwitch} />
        </BtnFlexView>
      </FlexView>

      <InfoText>????????? ????????? ?????? ???????????? ???????????????!</InfoText>

      <FlexView>
        <MaterialCommunityIcons name="shopping-outline" size={24} color="white" />

        <FlexText>?????? ??? ????????? ??????</FlexText>

        <BtnFlexView>
          {/* {benefitSelects.map((select, index) => (
            <ToggleBtn
              key={select}
              active={benefit === select}
              onPress={() => onBenefitClick(select)}
              style={(index === 0) && { marginRight: 16 }}
            >
              <ToggleText>{select}</ToggleText>
            </ToggleBtn>
          ))} */}
          <SwitchToggle isOn={isBenenfitToggle} onToggle={_benefitToggleSwitch} />
        </BtnFlexView>
      </FlexView>

      <InfoText>????????? ????????? ????????? ??????????????????.</InfoText>

      <FooterButton title="?????? ??????" />
    </Container>
  );
};

export default Notification;
