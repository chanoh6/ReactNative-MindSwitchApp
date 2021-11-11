import PushNotification, { Importance } from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { Platform } from "react-native";

class LocalNotificationService {
    configure = (onOpenNotification) => {
        PushNotification.configure({
            onRegister: function (token) {
                console.log('[LocalNotificationService] onRegister : localtoken : ', token);
            },

            onNotification: function (notification) {
                console.log('[LocalNotificationService] onNotification : ', notification);

                if (!notification?.data) {
                    return;
                }
                notification.userInteraction = true;
                onOpenNotification(Platform.OS === 'ios' ? notification.data.item : notification.data);

                // Only call callback if not from foreground
                if (Platform.OS === 'ios') {
                    notification.finish(PushNotificationIOS.FetchResult.NoData);
                }
            },

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             */
            requestPermissions: true,
        });
        PushNotification.createChannel(
            {
                channelId: "default-channel-id", // (required)
                channelName: "Default channel", // (required)
                channelDescription: "A default channel", // (optional) default: undefined.
                soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
                importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
            },
            (created) => console.log(`createChannel 'default-channel-id' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
    };

    unRegister = () => {
        PushNotification.unregister();
    };

    showNotification = (id, title, message, data = {}, options = {}) => {
        PushNotification.localNotification({
            /* Android only properties */
            ...this.buildAndroidNotification(id, title, message, data, options),
            /* iOS and Android properties */
            channelId: 'default-channel-id',
            title: title || '', // (optional)
            message: message || '', // (required)
            userInfo: { screen: 'home' }, // (optional) default: {} (using null throws a JSON value '<null>' error)
            playSound: options.playSound || false, // (optional) default: true
            soundName: options.soundName || 'defalut', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
            number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
            userInteraction: false,
        });
    };

    buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
        return {
            id: id,
            authCannel: true,
            largeIcon: options.largeIcon || 'ic_launcher',
            smallIcon: options.smallIcon || 'ic_notification',
            bigText: message || '',
            subText: title || '',
            vibrate: options.vibrate || true,
            vibration: options.vibration || 300,
            priority: options.priority || 'high',
            importance: options.importance || 'high',
            data: data,
        };
    };

    cancelAllLocalNotifications = () => {
        if (Platform.OS === 'ios') {
            PushNotificationIOS.removeAllDeliveredNotifications();
        } else {
            PushNotification.removeAllDeliveredNotifications();
        }
    };

    removeDeliveredNotificationByID = (notification) => {
        console.log('[LocalNotificationService] removeDeliveredNotificationByID : ', notification);

        PushNotification.cancelLocalNotification({ id: `${notificationId}` });
    };
};

export const localNotificationService = new LocalNotificationService();