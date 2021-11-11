import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import PushNotification, { Importance } from 'react-native-push-notification';
import NotificationHandler from '../services/NotificationHandler';

class FCMService {
    register = (onRegister, onNotification, onOpenNotification) => {
        this.checkPermission(onRegister);
        this.createNotificationListeners(onRegister, onNotification, onOpenNotification);
    };

    registerAppWithFCM = async () => {
        if (Platform.OS === 'ios') {
            await messaging().setAutoInitEnabled(true);
        }
    };

    checkPermission = (onRegister) => {
        messaging().hasPermission().then((enabled) => {
            if (enabled) {
                this.getToken(onRegister);
            } else {
                this.requestPermission(onRegister);
            }
        })
            .catch((error) => {
                console.log('[FCMService] Permission rejected ', error);
            });
    };

    getToken = (onRegister) => {
        messaging().getToken().then((fcmToken) => {
            if (fcmToken) {
                onRegister(fcmToken);
            } else {
                console.log('[FCMService] User does not have a device token');
            }
        })
            .catch((error) => {
                console.log('[FCMService] getToken rejected ', error);
            });
    };

    requestPermission = (onRegister) => {
        messaging().requestPermission().then(() => {
            this.getToken(onRegister);
        })
            .catch((error) => {
                console.log('[FCMService] Request Permission rejected ', error);
            });
    };

    deleteToken = () => {
        console.log('[FCMService] deletToken');
        messaging().deleteToken().catch((error) => {
            console.log('[FCMService] Delete Token error ', error);
        });
    };

    createNotificationListeners = (onRegister, onNotification, onOpenNotification) => {
        // 실행중이지만 현재화면은 다른 앱이 실행중이거나 아무것도 실행하지 않을 때
        messaging().onNotificationOpenedApp((remoteMessage) => {
            console.log('[FCMService] onNotificationOpenApp Notification caused app to open from background ', remoteMessage);

            if (remoteMessage) {
                const notification = remoteMessage.notification;
                onOpenNotification(notification);
            } else {
                console.log('background notification error');
            }
        });

        // 앱이 실행중이 아닐 때
        messaging().getInitialNotification().then((remoteMessage) => {
            console.log('[FCMService] getInitialNotification casued app to open from quit state : fcmremoteMessage : ', remoteMessage);

            if (remoteMessage) {
                const notification = remoteMessage.notification;
                onOpenNotification(notification);
            } else {
                console.log('quit state notification error');
            }
        });

        // 실행중이고 현재 화면일 때
        this.messageListener = messaging().onMessage(async (remoteMessage) => {
            console.log('[FCMService] A new FCM messsage arrived ', remoteMessage);

            if (remoteMessage) {
                let notification = null;
                if (Platform.OS === 'ios') {
                    notification = remoteMessage.data.notification;
                } else {
                    notification = remoteMessage.notification;
                }
                onNotification(notification);
            }
        });

        // Triggerd when have new token
        messaging().onTokenRefresh((fcmToken) => {
            console.log('[FCMService] New Token Refresh : ', fcmToken);
            onRegister(fcmToken);
        });
    };

    unRegister = () => {
        this.messageListener();
    };
};

export const fcmService = new FCMService();