import { useIsFocused } from "@react-navigation/core";
import React from "react";
import { StatusBar } from "react-native";
import styled from "styled-components";

const Container = styled.View`
    position: relative;
    flex: 1;
    background-color: #141212;
    padding: 24px;
    height: 100%;
`;

const MainText = styled.Text`
    font-size: 16px;
    font-weight: 700;
    line-height: 32px;
    color: #fff;
    margin-top: 24px;
`;

const SubText = styled.Text`
    font-size: 12px;
    font-weight: 500;
    line-height: 24px;
    color: #fff;
    margin-top: 16px;
`;

const SetBtnView = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const SetButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px 0;
  background-color: #42a5f5;
  border-radius: 30px;
`;

const ButtonTit = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #fff;
`;

function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
}

const Leave = ({ navigation }) => {
    return (
        <Container>
            <FocusAwareStatusBar barStyle="light-content" backgroundColor="#141212" />

            <MainText>
                마인드 스위치를 떠나기 전에{"\n"}한 번 더 생각해보세요.
            </MainText>

            <SubText>
                아직 들어보지 못한 콘텐츠들이 많이 남아있어요. 지금 계정을 삭제하면 프리미엄 콘텐츠를 들으실 수 없어요. 블림프를 다시 이용하면서 휴식 시간을 즐겨 보세요.
            </SubText>

            <SetBtnView>
                <SetButton>
                    <ButtonTit>계속 진행</ButtonTit>
                </SetButton>
            </SetBtnView>
        </Container>
    );
};

export default Leave;
