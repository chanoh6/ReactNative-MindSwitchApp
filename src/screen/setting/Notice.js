import { useIsFocused } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Animated, Easing, StatusBar, StyleSheet, View, FlatList } from "react-native";
import styled from "styled-components";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-community/async-storage";

const Container = styled.View`
  position: relative;
  flex: 1;
  background-color: #141212;
  height: 100%;
`;

const List = styled.View`
  position: relative;
  padding: 8px 24px;
`;

const ListTitWrap = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ListWrap = styled.View`
  display: flex;
  flex-direction: column;
`;

const ListTit = styled.Text`
  font-size: 16px;
  color: #fff;
`;

const ListDate = styled.Text`
  font-size: 14px;
  color: #808080;
`;

const New = styled.View`
  position: absolute;
  top: 6px;
  left: -16px;
  width: 8px;
  height: 8px;
  background-color: #DB4455;
  border-radius: 30px;
`;

const ContentWrap = styled.View`
  padding: 12px 0;
`;

const Content = styled.Text`
  font-size: 14px;
  color: #fff;
`;

const styles = StyleSheet.create({
  list: {
    borderBottomColor: '#808080',
    borderBottomWidth: 1,
  },
});

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const Notice = ({ onColor = '#DB4455', offColor = '#fff' }) => {
  // 새로운 공지사항 마크 표시 여부
  const [newNotice, setNewNotice] = useState(true);

  // 리스트 클릭
  const [isClick, setIsClick] = useState(false);

  // arrow animation
  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));

  // 공지사항 클릭 시 slide down animation
  const [dropDownAnimation, setDropDownAnimation] = useState(new Animated.Value(0));

  // asynstorage
  const [tasks, setTasks] = useState({});

  // asynstorage - setItem
  const _saveTasks = async tasks => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      setTasks(tasks);
    } catch (e) {
      console.error(e);
    }
  };

  // asynstorage - getItem
  const _loadTasks = async () => {
    const loadedTasks = await AsyncStorage.getItem('tasks');
    setTasks(JSON.parse(loadedTasks || '{}'));
  };

  // 리스트 클릭 함수
  const listClick = (id) => {
    if (id === contents[id].id) {
      // setNewNotice(false);
      console.log(id);
      setIsClick(!isClick);
      // _saveTasks(newNotice);
    }
  }

  // 화살표 아이콘 애니메이션 함수
  // const AnimatedIcon = Animated.createAnimatedComponent(Icon);
  const iconColor = isClick ? onColor : offColor;

  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });

  Animated.timing(rotateAnimation, {
    toValue: isClick ? 1 : 0,
    duration: 200,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start();

  // 공지사항 클릭 시 drop down animation 함수
  const interpolateDropDown = dropDownAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  Animated.timing(dropDownAnimation, {
    toValue: isClick ? 1 : 0,
    duration: 1000,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start();

  useEffect(() => {
    _loadTasks();
  }, []);

  // 공지사항 데이터
  const contents = [
    {
      id: 0,
      title: '마인드스위치 이벤트 당첨자 발표',
      date: '2021.11.15',
      body: `안녕하세요. 마인드스위치입니다.
여러분의 성원에 힘입어 000이벤트가 종료되었습니다.
            
많은 분들이 참여해주셔서 감사합니다.
당첨자 명단은 아래와 같습니다.

홍길동 1324

홍길동 1324

홍길동 1324

홍길동 1324`,
    },
    {
      id: 1,
      title: '마인드스위치 이벤트 당첨자 발표',
      date: '2021.11.15',
      body: `안녕하세요. 마인드스위치입니다.
여러분의 성원에 힘입어 000이벤트가 종료되었습니다.
          
많은 분들이 참여해주셔서 감사합니다.
당첨자 명단은 아래와 같습니다.

홍길동 1324

홍길동 1324

홍길동 1324

홍길동 1324`,
    },
    {
      id: 2,
      title: '마인드스위치 이벤트 당첨자 발표',
      date: '2021.11.15',
      body: `안녕하세요. 마인드스위치입니다.
여러분의 성원에 힘입어 000이벤트가 종료되었습니다.
            
많은 분들이 참여해주셔서 감사합니다.
당첨자 명단은 아래와 같습니다.

홍길동 1324

홍길동 1324

홍길동 1324

홍길동 1324`,
    },
    {
      id: 3,
      title: '마인드스위치 이벤트 당첨자 발표',
      date: '2021.11.15',
      body: `안녕하세요. 마인드스위치입니다.
여러분의 성원에 힘입어 000이벤트가 종료되었습니다.
            
많은 분들이 참여해주셔서 감사합니다.
당첨자 명단은 아래와 같습니다.

홍길동 1324

홍길동 1324

홍길동 1324

홍길동 1324`,
    },
    {
      id: 4,
      title: '마인드스위치 이벤트 당첨자 발표',
      date: '2021.11.15',
      body: `안녕하세요. 마인드스위치입니다.
여러분의 성원에 힘입어 000이벤트가 종료되었습니다.
            
많은 분들이 참여해주셔서 감사합니다.
당첨자 명단은 아래와 같습니다.

홍길동 1324

홍길동 1324

홍길동 1324

홍길동 1324`,
    },
  ];

  const renderItem = ({ item }) => (
    <List style={styles.list}>
      <ListTitWrap onPress={() => listClick(item.id)} activeOpacity={1}>
        <ListWrap>
          {newNotice && <New />}
          {/* {console.log('newNotice : ' + newNotice)}
          {console.log('tasks : ' + tasks)} */}
          <ListTit>{item.title}</ListTit>
          <ListDate>{item.date}</ListDate>
        </ListWrap>

        <Animated.View style={{ transform: [{ rotate: interpolateRotating }] }}>
          <Icon name="caret-up-outline" color={iconColor} size={16} />
        </Animated.View>
      </ListTitWrap>

      {isClick &&
        <ContentWrap>
          <Content>
            {item.body}
          </Content>
        </ContentWrap>
      }
    </List>
  );

  return (
    <Container>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#141212" />

      <FlatList data={contents} keyExtractor={notice => notice.id} renderItem={renderItem} />
    </Container>
  );
};

export default Notice;
