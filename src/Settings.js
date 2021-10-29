import React from "react";
import styled from "styled-components";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/core";

const Container = styled.View`
  flex: 1;
  background-color: #141412;
  padding: 24px;
`;

const FlexView = styled.View`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 0;
`;

const MenuText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  margin-left: 8px;
`;

const Hr = styled.View`
  width: 100%;
  height: 1px;
  background-color: #fff;
`;

const styles = StyleSheet.create({
  arrowIcon: {
    position: "absolute",
    right: 0,
  },
});

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const Settings = ({ navigation }) => {
  return (
    <Container>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#141212" />

      <FlexView>
        <MaterialCommunityIcons name="account" size={24} color="white" />
        <MenuText>내 정보</MenuText>
        <MaterialCommunityIcons
          name="chevron-right"
          size={30}
          color="white"
          style={styles.arrowIcon}
          onPress={() => navigation.navigate('User')}
        />
      </FlexView>

      <FlexView>
        <MaterialCommunityIcons
          name="youtube-subscription"
          size={24}
          color="white"
        />
        <MenuText>구독 관리</MenuText>
        <MaterialCommunityIcons
          name="chevron-right"
          size={30}
          color="white"
          style={styles.arrowIcon}
          onPress={() => navigation.navigate('Subscribe')}
        />
      </FlexView>

      <FlexView>
        <MaterialCommunityIcons name="bell" size={24} color="white" />
        <MenuText>알림 설정</MenuText>
        <MaterialCommunityIcons
          name="chevron-right"
          size={30}
          color="white"
          style={styles.arrowIcon}
          onPress={() => navigation.navigate('Notification')}
        />
      </FlexView>

      <FlexView>
        <MaterialCommunityIcons name="clipboard-text" size={24} color="white" />
        <MenuText>문의하기</MenuText>
        <MaterialCommunityIcons
          name="chevron-right"
          size={30}
          color="white"
          style={styles.arrowIcon}
          onPress={() => navigation.navigate('Qna')}
        />
      </FlexView>

      <FlexView>
        <MaterialCommunityIcons name="help-circle" size={24} color="white" />
        <MenuText>자주 묻는 질문</MenuText>
        <MaterialCommunityIcons
          name="chevron-right"
          size={30}
          color="white"
          style={styles.arrowIcon}
          onPress={() => navigation.navigate('Faq')}
        />
      </FlexView>

      <FlexView>
        <MaterialCommunityIcons name="forum" size={24} color="white" />
        <MenuText>공지사항</MenuText>
        <MaterialCommunityIcons
          name="chevron-right"
          size={30}
          color="white"
          style={styles.arrowIcon}
          onPress={() => navigation.navigate('Notice')}
        />
      </FlexView>

      <FlexView>
        <MaterialCommunityIcons
          name="bookmark-multiple"
          size={24}
          color="white"
        />
        <MenuText>버전정보</MenuText>
        <MaterialCommunityIcons
          name="chevron-right"
          size={30}
          color="white"
          style={styles.arrowIcon}
          onPress={() => navigation.navigate('Version')}
        />
      </FlexView>
    </Container>
  );
};

export default Settings;
