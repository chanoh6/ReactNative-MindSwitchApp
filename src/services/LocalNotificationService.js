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
    };

    createPushChannel = () => {
        // push 알림 채널
        PushNotification.createChannel(
            {
                channelId: "push-channel", // (required)
                channelName: "Push channel", // (required)
                channelDescription: "Push Notification channel", // (optional) default: undefined.
                soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
                importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
            },
            (created) => console.log(`createChannel 'push-channel' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
    };

    createBenefitChannel = () => {
        // 혜택 및 마케팅 알림 채널
        PushNotification.createChannel(
            {
                channelId: "benefit-channel", // (required)
                channelName: "benefit channel", // (required)
                channelDescription: "Benefit Notification channel", // (optional) default: undefined.
                soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
                importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
            },
            (created) => console.log(`createChannel 'benefit-channel' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
    }

    unRegister = () => {
        PushNotification.unregister();
    };

    showPushNotification = (id, title, message, data = {}, options = {}) => {
        PushNotification.localNotification({
            /* Android only properties */
            ...this.buildAndroidNotification(id, title, message, data, options),
            /* iOS and Android properties */
            channelId: 'push-channel',
            title: title || '', // (optional)
            message: message || '', // (required)
            playSound: options.playSound || false, // (optional) default: true
            soundName: options.soundName || 'defalut', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
            userInteraction: false,
        });
    };

    showBenefitNotification = (id, title, message, data = {}, options = {}) => {
        PushNotification.localNotification({
            /* Android only properties */
            ...this.buildAndroidNotification(id, title, message, data, options),
            /* iOS and Android properties */
            channelId: 'benefit-channel',
            title: title || '', // (optional)
            message: message || '', // (required)
            playSound: options.playSound || false, // (optional) default: true
            soundName: options.soundName || 'defalut', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
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

    requestPermissions = () => {
        return PushNotification.requestPermissions();
    }

    cancelAllLocalNotifications = () => {
        if (Platform.OS === 'ios') {
            PushNotificationIOS.removeAllDeliveredNotifications();
        } else {
            PushNotification.removeAllDeliveredNotifications();
        }
    };

    removeDeliveredNotificationByID = (id) => {
        console.log('[LocalNotificationService] removeDeliveredNotificationByID : ', id);

        PushNotification.cancelLocalNotification(id);
    };

    channelDelete = (channelId) => {
        console.log('[LocalNotificationService] channelDelete : ', channelId);

        PushNotification.deleteChannel(channelId);
    }

    getChannel = () => {
        console.log('[LocalNotificationService] getChannel');

        PushNotification.getChannels(function (channelId) {
            console.log(channelId);
        });
    }
};

export const localNotificationService = new LocalNotificationService();