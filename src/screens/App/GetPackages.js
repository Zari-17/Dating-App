import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
  Alert,
  Platform,
} from 'react-native';
const {width, height} = Dimensions.get('window');

//local import
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';
import Loader from '../../components/Loader.component';
import Header from '../../components/Header';
import MyStatusBar from '../../components/StatusBar';

//third party library
import {useSelector, useDispatch} from 'react-redux';
import {WebView} from 'react-native-webview';

import {useIAP, requestPurchase} from 'react-native-iap';
//f03ceedf7d2d4c99aa3ea75d9b2cabae
const Index = ({navigation, ...props}) => {
  const [data, setData] = useState([]);
  const [isShowWebView, setisShowWebView] = useState(false);
  const [url, setUrl] = useState('');
  const [isLoader, setIsLoader] = useState(false);

  const user = useSelector(state => state.userReducer.userData);
  const config = {
    headers: {
      Authorization: `Bearer ` + user?.token,
    },
  };
  useEffect(() => {
    getPackages();
  }, []);

  const getPackages = () => {
    setIsLoader(true);
    axios
      .get(`${BaseURL.GET_PLANS}`, config)
      .then(res => {
        setData(res.data.content.subscriptionProducts);
        setIsLoader(false);
      })
      .catch(err => {
        setIsLoader(false);
      });
  };

  const createPayment = priceId => {
    setIsLoader(true);
    let params = {
      priceId: priceId,
    };
    axios
      .post(`${BaseURL.CREATE_SUBSCRIPTION}`, params, config)
      .then(res => {
        setUrl(res.data.content.sessionUrl);
        setisShowWebView(true);
        setIsLoader(false);
      })
      .catch(err => {
        setIsLoader(false);
        console.log(err);
      });
  };

  const handlePaymentConfirm = data => {
    if (data == 'http://localhost:3001/completion') {
      setisShowWebView(false);
      Alert.alert('Subscription Done');
      navigation.goBack();
      // location update
    } else if (data === 'http://localhost:3001/failure') {
      setisShowWebView(false);
      Alert.alert('Payment Failed');
    }
  };

  return (
    <>
      <MyStatusBar backgroundColor={'white'} />
      <SafeAreaView className={'flex-1 bg-[#F9F9F9]'}>
        {isShowWebView && (
          <View
            style={{
              width: width,
              height: height,
              zIndex: 100,
              position: 'absolute',
            }}>
            <WebView
              source={{
                uri: url,
              }}
              style={{
                width: width,
                height: height,
                zIndex: 100,
                position: 'absolute',
              }}
              onNavigationStateChange={event => {
                handlePaymentConfirm(event.url);
              }}
              onError={event => {}}
            />
          </View>
        )}
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Header
            title={'Get Premium'}
            iconName={'bell'}
            onPress={() => navigation.navigate('Notification')}
            isBack
            _handleBack={() => navigation.goBack()}
          />

          <View style={{height: height * 0.05}} />
          <FlatList
            data={data}
            renderItem={({item, index}) => {
              return (
                <View
                  key={index}
                  style={{width: width * 0.95}}
                  className={
                    'p-4 py-8 border-[#f44336] border-2 rounded-lg flex self-center justify-center items-center mt-3'
                  }>
                  <Text className={'text-3xl font-bold text-[#f44336] mb-2'}>
                    {item.name}
                  </Text>
                  <Text className={'text-lg font-bold text-black mb-2'}>
                    <Text className={'text-[#f44336]'}>$</Text>{' '}
                    {item.prices.unit_amount / 100} USD/Recurring
                  </Text>
                  <TouchableOpacity
                    onPress={() => createPayment(item.prices.id)}
                    activeOpacity={0.7}
                    className={
                      'w-80 py-3 flex justify-center items-center bg-[#f44336] rounded-lg'
                    }>
                    <Text className={'text-xl font-bold text-white'}>
                      Subscribe
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </ScrollView>
      </SafeAreaView>
      {isLoader && <Loader />}
      {/* <Alert
        isVisible={showalert}
        onPress={() => {
          setshowalert(false);
          setalertTxt('');
        }}
        message={alertTxt}
      /> */}
    </>
  );
};

export default Index;

// import React, {useEffect, useState} from 'react';
// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   Platform,
//   TouchableOpacity,
//   SafeAreaView,
//   ActivityIndicator,
// } from 'react-native';

// import {
//   PurchaseError,
//   requestSubscription,
//   useIAP,
//   validateReceiptIos,
// } from 'react-native-iap';

// const errorLog = ({message, error}) => {
//   console.error('An error happened', message, error);
// };

// const isIos = Platform.OS === 'ios';

// //product id from appstoreconnect app->subscriptions
// const subscriptionSkus = Platform.select({
//   ios: ['signup_1_dollar'],
// });

// const Index = ({navigation, ...props}) => {
//   //useIAP - easy way to access react-native-iap methods to
//   //get your products, purchases, subscriptions, callback
//   //and error handlers.
//   const {
//     connected,
//     subscriptions, //returns subscriptions for this app.
//     getSubscriptions, //Gets available subsctiptions for this app.
//     currentPurchase, //current purchase for the tranasction
//     finishTransaction,
//     purchaseHistory, //return the purchase history of the user on the device (sandbox user in dev)
//     getPurchaseHistory, //gets users purchase history
//   } = useIAP();

//   const [loading, setLoading] = useState(false);

//   const handleGetPurchaseHistory = async () => {
//     try {
//       await getPurchaseHistory();
//     } catch (error) {
//       errorLog({message: 'handleGetPurchaseHistory', error});
//     }
//   };

//   useEffect(() => {
//     handleGetPurchaseHistory();
//   }, [connected]);

//   const handleGetSubscriptions = async () => {
//     try {
//       await getSubscriptions({skus: subscriptionSkus});
//     } catch (error) {
//       errorLog({message: 'handleGetSubscriptions', error});
//     }
//   };

//   useEffect(() => {
//     handleGetSubscriptions();
//   }, [connected]);

//   useEffect(() => {
//     // ... listen if connected, purchaseHistory and subscriptions exist
//     if (
//       purchaseHistory.find(
//         x => x.productId === (subscriptionSkus[0] || subscriptionSkus[1]),
//       )
//     ) {
//       navigation.navigate('Home');
//     }
//   }, [connected, purchaseHistory, subscriptions]);

//   const handleBuySubscription = async productId => {
//     try {
//       await requestSubscription({
//         sku: productId,
//       });
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       if (error instanceof PurchaseError) {
//         errorLog({message: `[${error.code}]: ${error.message}`, error});
//       } else {
//         errorLog({message: 'handleBuySubscription', error});
//       }
//     }
//   };

//   useEffect(() => {
//     const checkCurrentPurchase = async purchase => {
//       if (purchase) {
//         try {
//           const receipt = purchase.transactionReceipt;
//           if (receipt) {
//             if (Platform.OS === 'ios') {
//               const isTestEnvironment = __DEV__;

//               //send receipt body to apple server to validete
//               const appleReceiptResponse = await validateReceiptIos(
//                 {
//                   'receipt-data': receipt,
//                   password: 'f03ceedf7d2d4c99aa3ea75d9b2cabae',
//                 },
//                 isTestEnvironment,
//               );

//               //if receipt is valid
//               if (appleReceiptResponse) {
//                 const {status} = appleReceiptResponse;
//                 if (status) {
//                   navigation.navigate('Home');
//                 }
//               }

//               return;
//             }
//           }
//         } catch (error) {
//           console.log('error', error);
//         }
//       }
//     };
//     checkCurrentPurchase(currentPurchase);
//   }, [currentPurchase, finishTransaction]);

//   return (
//     <SafeAreaView>
//       <ScrollView>
//         <View style={{padding: 10}}>
//           <Text
//             style={{
//               fontSize: 28,
//               textAlign: 'center',
//               paddingBottom: 15,
//               color: 'black',
//               fontWeight: 'bold',
//             }}>
//             Subscribe
//           </Text>
//           <Text style={styles.listItem}>
//             Subscribe to some cool stuff today.
//           </Text>
//           <Text
//             style={
//               (styles.listItem,
//               {
//                 fontWeight: '500',
//                 textAlign: 'center',
//                 marginTop: 10,
//                 fontSize: 18,
//               })
//             }>
//             Choose your membership plan.
//           </Text>
//           <View style={{marginTop: 10}}>
//             {subscriptions.map((subscription, index) => {
//               const owned = purchaseHistory.find(
//                 s => s?.productId === subscription.productId,
//               );
//               console.log('subscriptions', subscription?.productId);
//               return (
//                 <View style={styles.box} key={index}>
//                   {subscription?.introductoryPriceSubscriptionPeriodIOS && (
//                     <>
//                       <Text style={styles.specialTag}>SPECIAL OFFER</Text>
//                     </>
//                   )}
//                   <View
//                     style={{
//                       flex: 1,
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                       marginTop: 10,
//                     }}>
//                     <Text
//                       style={{
//                         paddingBottom: 10,
//                         fontWeight: 'bold',
//                         fontSize: 18,
//                         textTransform: 'uppercase',
//                       }}>
//                       {subscription?.title}
//                     </Text>
//                     <Text
//                       style={{
//                         paddingBottom: 20,
//                         fontWeight: 'bold',
//                         fontSize: 18,
//                       }}>
//                       {subscription?.localizedPrice}
//                     </Text>
//                   </View>
//                   {subscription?.introductoryPriceSubscriptionPeriodIOS && (
//                     <Text>
//                       Free for 1{' '}
//                       {subscription?.introductoryPriceSubscriptionPeriodIOS}
//                     </Text>
//                   )}
//                   <Text style={{paddingBottom: 20}}>
//                     {subscription?.description}
//                   </Text>
//                   {owned && (
//                     <Text style={{textAlign: 'center', marginBottom: 10}}>
//                       You are Subscribed to this plan!
//                     </Text>
//                   )}
//                   {owned && (
//                     <TouchableOpacity
//                       style={[styles.button, {backgroundColor: '#0071bc'}]}
//                       onPress={() => {
//                         navigation.navigate('Home');
//                       }}>
//                       <Text style={styles.buttonText}>Continue to App</Text>
//                     </TouchableOpacity>
//                   )}
//                   {loading && <ActivityIndicator size="large" />}
//                   {!loading && !owned && isIos && (
//                     <TouchableOpacity
//                       style={styles.button}
//                       onPress={() => {
//                         setLoading(true);
//                         handleBuySubscription(subscription.productId);
//                       }}>
//                       <Text style={styles.buttonText}>Subscribe</Text>
//                     </TouchableOpacity>
//                   )}
//                 </View>
//               );
//             })}
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };
// export default Index;

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 20,
//   },
//   listItem: {
//     fontSize: 16,
//     paddingLeft: 8,
//     paddingBottom: 3,
//     textAlign: 'center',
//     color: 'black',
//   },
//   box: {
//     margin: 10,
//     marginBottom: 5,
//     padding: 10,
//     backgroundColor: 'white',
//     borderRadius: 7,
//     shadowColor: 'rgba(0, 0, 0, 0.45)',
//     shadowOffset: {height: 16, width: 0},
//     shadowOpacity: 0.1,
//     shadowRadius: 12,
//   },
//   button: {
//     alignItems: 'center',
//     backgroundColor: 'mediumseagreen',
//     borderRadius: 8,
//     padding: 10,
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'white',
//     textTransform: 'uppercase',
//   },
//   specialTag: {
//     color: 'white',
//     backgroundColor: 'crimson',
//     width: 125,
//     padding: 4,
//     fontWeight: 'bold',
//     fontSize: 12,
//     borderRadius: 7,
//     marginBottom: 2,
//   },
// });
