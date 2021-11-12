import React, { useState } from "react";
import {
  Image,
  Platform,
  StatusBar,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import styled from "styled-components";
import RNIap, {
  InAppPurchase,
  PurchaseError,
  SubscriptionPurchase,
  acknowledgePurchaseAndroid,
  consumePurchaseAndroid,
  finishTransaction,
  finishTransactionIOS,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from "react-native-iap";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

const itemSkus = Platform.select({
  ios: [
    "com.cooni.point1000",
    "com.cooni.point5000", // dooboolab
  ],
  android: [
    "com.mindswitch.inAppPurchases",
    // 'android.test.canceled',
    // 'android.test.refunded',
    // 'android.test.item_unavailable',
    // 'point_1000', '5000_point', // dooboolab
  ],
});

const itemSubs = Platform.select({
  ios: [
    "com.cooni.point1000",
    "com.cooni.point5000", // dooboolab
  ],
  android: [
    "test.sub1", // subscription
  ],
});

let purchaseUpdateSubscription;
let purchaseErrorSubscription;

const Container = styled.View`
  position: relative;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const BackgroundImg = styled.ImageBackground`
  position: relative;
  flex: 1;
  width: 100%;
  padding: 30px 36px 30px 36px;
`;

const CloseIcon = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 20px;
  top: 60px;
  width: 30px;
  height: 30px;
  border-radius: 50px;
  background-color: #495057;
  z-index: 10;
`;

const TextView = styled.ScrollView`
  height: 100%;
`;

const TitleText = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  line-height: 36px;
  margin-top: 70%;
  margin-bottom: 20px;
`;

const SubTitView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const SubTitText = styled.Text`
  font-size: 16px;
  color: #fff;
  margin-left: 8px;
`;

const PayView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
`;

const PayTextView = styled.TouchableOpacity`
  width: 48%;
  padding: 30px 16px;
  background-color: #495057;
  border-radius: 16px;
  ${({ active }) =>
    active &&
    `
    border: 5px;
    border-color: #fff;
    padding: 25px 11px;
  `}
`;

const PayTitText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin-top: 8px;
`;

const SubPayTitText = styled.Text`
  font-size: 12px;
  color: #fff;
  margin-top: 4px;
  margin-bottom: 8px;
`;

const PriceView = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 40px;
  margin-top: 8px;
`;

const PriceText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  text-align: right;
`;

const SubPriceText = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  text-align: right;
`;

const InfoText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  margin-top: 16px;
  line-height: 20px;
`;

const SubInfoText = styled.Text`
  font-size: 12px;
  color: #fff;
  margin-top: 32px;
  margin-bottom: 32px;
  text-align: center;
  padding: 0 16px;
`;

const PayButton = styled.TouchableOpacity`
  position: relative;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  padding: 16px 0;
  background-color: #42a5f5;
  border-radius: 30px;
`;

const ButtonTit = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #fff;
`;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
  },
});

function dateAdd(addDay) {
  var nowDate = new Date();
  var addDate = nowDate.getTime() + addDay * 24 * 60 * 60 * 1000;

  nowDate.setTime(addDate);

  var month = nowDate.getMonth() + 1;
  var date = nowDate.getDate() - 1;

  if (month < 10) {
    month = "0" + month;
  }

  if (date < 10) {
    date = "0" + date;
  }

  if (date === '00') {
    var endDt = new Date(nowDate.getFullYear(), nowDate.getMonth(), 0);
    month = nowDate.getMonth();
    date = endDt.getDate();
  }

  return month + "/" + date;
}

const Pay = ({ navigation }) => {
  const componentDidMount = async (): void => {
    try {
      await RNIap.initConnection();
      if (Platform.OS === "android") {
        await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
      } else {
        await RNIap.clearTransactionIOS();
      }
    } catch (err) {
      console.warn(err.code, err.message);
    }

    purchaseUpdateSubscription = purchaseUpdatedListener(
      async (purchase: InAppPurchase | SubscriptionPurchase) => {
        console.info("purchase", purchase);
        const receipt = purchase.transactionReceipt
          ? purchase.transactionReceipt
          : purchase.originalJson;
        console.info(receipt);
        if (receipt) {
          try {
            const ackResult = await finishTransaction(purchase);
            console.info("ackResult", ackResult);
          } catch (ackErr) {
            console.warn("ackErr", ackErr);
          }

          this.setState({ receipt }, () => this.goNext());
        }
      }
    );

    purchaseErrorSubscription = purchaseErrorListener(
      (error: PurchaseError) => {
        console.log("purchaseErrorListener", error);
        Alert.alert("purchase error", JSON.stringify(error));
      }
    );
  };

  const componentWillUnmount = (): void => {
    if (purchaseUpdateSubscription) {
      purchaseUpdateSubscription.remove();
      purchaseUpdateSubscription = null;
    }
    if (purchaseErrorSubscription) {
      purchaseErrorSubscription.remove();
      purchaseErrorSubscription = null;
    }
    // RNIap.endConnection();
  };

  const goNext = (): void => {
    Alert.alert("Receipt", this.state.receipt);
  };

  const getItems = async (): void => {
    try {
      const products = await RNIap.getProducts(itemSkus);
      // const products = await RNIap.getSubscriptions(itemSkus);
      console.log("Products", products);
      this.setState({ productList: products });
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  const getSubscriptions = async (): void => {
    try {
      const products = await RNIap.getSubscriptions(itemSubs);
      console.log("Products", products);
      this.setState({ productList: products });
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  const getAvailablePurchases = async (): void => {
    try {
      console.info(
        "Get available purchases (non-consumable or unconsumed consumable)"
      );
      const purchases = await RNIap.getAvailablePurchases();
      console.info("Available purchases :: ", purchases);
      if (purchases && purchases.length > 0) {
        this.setState({
          availableItemsMessage: `Got ${purchases.length} items.`,
          receipt: purchases[0].transactionReceipt,
        });
      }
    } catch (err) {
      console.warn(err.code, err.message);
      Alert.alert(err.message);
    }
  };

  // Version 3 apis
  const requestPurchase = async (sku): void => {
    try {
      RNIap.requestPurchase(sku);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  const requestSubscription = async (sku): void => {
    try {
      RNIap.requestSubscription(sku);
    } catch (err) {
      Alert.alert(err.message);
    }
  };

  // const {productList, receipt, availableItemsMessage} = this.state;
  // const receipt100 = receipt.substring(0, 100);

  // 상품 목록
  const products = [
    {
      id: 0,
      title: "1년",
      day: 7,
      price: "￦ 47,000",
      monthPrice: "(￦3,916원/월)",
    },
    {
      id: 1,
      title: "1개월",
      day: 3,
      price: "￦ 7,900",
      monthPrice: "(￦3,916원/월)",
    },
  ];

  const [active, setActive] = useState(products[0].id);

  return (
    <Container>
      <StatusBar
        backgroundColor={"transparent"}
        translucent={true}
        barStyle="light-content"
      />

      <BackgroundImg source={require("../assets/backgroundImg.jpg")}>
        <LinearGradient
          // Background Linear Gradient
          colors={[
            "rgba(0, 0, 0, 0)",
            "rgba(0, 0, 0, 0.9)",
            "rgba(0, 0, 0, 1)",
          ]}
          style={styles.background}
        />
        <CloseIcon onPress={() => navigation.goBack()}>
          <Image source={require("../assets/icon/close_white.png")} />
        </CloseIcon>

        <TextView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <TitleText>
            모든 콘텐츠를{"\n"}제한 없이 이용하세요{"\n"}
            {products[active].day}일 간 무료입니다!
          </TitleText>

          <SubTitView>
            <Image source={require("../assets/icon/check_white.png")} />
            <SubTitText>휴식과 집중을 도와주는 사운드 콘텐츠</SubTitText>
          </SubTitView>

          <SubTitView>
            <Image source={require("../assets/icon/check_white.png")} />
            <SubTitText>일상과 삶을 돌아볼 수 있는 클래스</SubTitText>
          </SubTitView>

          <SubTitView>
            <Image source={require("../assets/icon/check_white.png")} />
            <SubTitText>매주 새로운 콘텐츠가 업데이트 됩니다</SubTitText>
          </SubTitView>

          <PayView>
            {products.map((product) => (
              <PayTextView
                activeOpacity={1}
                key={product.id}
                active={active === product.id}
                onPress={() => setActive(product.id)}
              >
                <PayTitText>{product.title}</PayTitText>

                <SubPayTitText>무료 체험 {product.day}일 이후</SubPayTitText>

                <PriceView>
                  <PriceText>{product.price}</PriceText>
                  <SubPriceText>{product.monthPrice}</SubPriceText>
                </PriceView>
              </PayTextView>
            ))}
          </PayView>

          <InfoText>
            {dateAdd(products[active].day).slice(0, 2)}월{" "}
            {dateAdd(products[active].day).slice(3, 5)}일 체험 만료 전까지
            언제든 해지할 수 있어요
          </InfoText>

          <SubInfoText>
            체험 기간이 종료되기 최소 24시간 전에 자동 갱신을 끄지 않으면 멤버십
            구독이 자동으로 갱신 됩니다.
          </SubInfoText>
        </TextView>

        <PayButton
        // onPress={(): void => this.requestSubscription(product.productId)}
        >
          <ButtonTit>무료 체험 및 구독 시작하기</ButtonTit>
        </PayButton>
        {/* <FooterButton title="무료 체험 및 구독 시작하기" /> */}
      </BackgroundImg>
    </Container>
  );
};

export default Pay;
