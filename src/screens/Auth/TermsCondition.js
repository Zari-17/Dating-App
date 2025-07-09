import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, ScrollView, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

//local import

import Header from '../../components/Header';
import MyStatusBar from '../../components/StatusBar';

//third party library

const Index = ({navigation, ...props}) => {
  return (
    <>
      <MyStatusBar backgroundColor={'white'} />
      <SafeAreaView className={'flex-1 bg-[#F9F9F9]'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Header title={'Terms & Condition'} />
          <Text
            style={{width: width * 0.9}}
            className={'text-lg text-black flex self-center'}>
            <Text className={'font-bold'}>
              1. Acceptance of Terms of Use Agreement.{'\n'}
            </Text>
            By creating a Connect Date account, whether through a mobile device,
            mobile application or computer (collectively, the “Service”) you
            agree to be bound by (i) these Terms of Use, (ii) our Privacy
            Policy, Cookie Policy, Arbitration Procedures (if applicable to
            you), Safety Tips, and Community Guidelines, each of which is
            incorporated by reference into this Agreement, and (iii) any terms
            disclosed and agreed to by you if you purchase additional features,
            products or services we offer on the Service (collectively, this
            "Agreement"). If you do not accept and agree to be bound by all of
            the terms of this Agreement, please do not use the Service. We may
            make changes to this Agreement and to the Service from time to time.
            We may do this for a variety of reasons including to reflect changes
            in or requirements of the law, new features, or changes in business
            practices. The most recent version of this Agreement will be posted
            on the Service under Settings and also on goConnect Date.com, and
            you should regularly check for the most recent version. The most
            recent version is the version that applies. If the changes include
            material changes to your rights or obligations, we will notify you
            at least 30 days in advance of the changes (unless we’re unable to
            do so under applicable law) by reasonable means, which could include
            notification through the Service or via email. If you continue to
            use the Service after the changes become effective, then you agree
            to the revised Agreement.
            <Text className={'font-bold'}>
              {'\n'}2. Eligibility.{'\n'}
            </Text>
            You are not authorized to create an account or access or use the
            Service or systems it resides on unless all of the following are
            true: you are at least 18 years of age. you can form a binding
            contract with Connect Date, you are not a person who is barred from
            using the Service under the laws of the United States or any other
            applicable jurisdiction (for example, you do not appear on the U.S.
            Treasury Department’s list of Specially Designated Nationals or face
            any other similar prohibition), you will comply with this Agreement
            and all applicable local, state, national and international laws,
            rules and regulations, and you have never been convicted of a felony
            or indictable offense (or crime of similar severity), a sex crime,
            or any crime involving violence, and that you are not required to
            register as a sex offender with any state, federal or local sex
            offender registry.
            <Text className={'font-bold'}>
              {'\n'}3. Your Account.{'\n'}
            </Text>
            In order to use Connect Date, you may sign in using a number of
            ways, including by Facebook login. If you choose to use your
            Facebook login, you authorize us to access and use certain Facebook
            account information, including but not limited to your public
            Facebook profile. For more information regarding the information we
            collect from you and how we use it, please consult our Privacy
            Policy. You are responsible for maintaining the confidentiality of
            your login credentials you use to sign up for Connect Date, and you
            are solely responsible for all activities that occur under those
            credentials. If you think someone has gained access to your account,
            please immediately contact us.
            <Text className={'font-bold'}>
              {'\n'}4. Modifying the Service and Termination.{'\n'}
            </Text>
            Connect Date is always striving to improve the Service and bring you
            additional functionality that you will find engaging and useful.
            This means we may add new product features or enhancements from time
            to time as well as remove some features, and if these actions do not
            materially affect your rights or obligations, we may not provide you
            with notice before taking them. We may even suspend the Service
            entirely, in which event we will notify you in advance unless
            extenuating circumstances, such as safety or security concerns,
            prevent us from doing so. You may terminate your account at any
            time, for any reason, by following the instructions in "Settings" in
            the Service. However, if you use a third party payment account such
            as Apple’s App Store or iTunes Store, as applicable (“App Store”) or
            the Google Play Store, you will need to manage in app purchases
            through such an account to avoid additional billing. Connect Date
            may terminate your account at any time without notice if it believes
            that you have violated this Agreement. Upon such termination, you
            will not be entitled to any refund for purchases. For residents of
            the Republic of Korea, except in the case where we reasonably
            consider that (i) giving notice is legally prohibited (for instance,
            when providing notice would either violate applicable laws,
            regulations, or orders from regulatory authorities or compromise an
            ongoing investigation conducted by a regulatory authority) or (ii)
            any notice may cause harm to you, third parties, Connect Date,
            and/or our affiliates (for instance, when providing notice harms the
            security of the Service), we will without delay notify you of the
            reason for taking the relevant step. After your account is
            terminated, this Agreement will terminate, except that the following
            provisions will still apply to you and Connect Date: Section 4,
            Section 5, and Sections 12 through 19.
            <Text className={'font-bold'}>
              {'\n'}5. Safety; Your Interactions{'\n'}
            </Text>
            with Other Members. Though Connect Date strives to encourage a
            respectful member experience through features like the double opt-in
            that allows members to communicate only after they have both
            indicated interest in one another, Connect Date is not responsible
            for the conduct of any member on or off of the Service. You agree to
            use caution in all interactions with other members, particularly if
            you decide to communicate off the Service or meet in person. In
            addition, you agree to review and follow Connect Date’s Safety
            Tips prior to using the Service. You agree that you will not provide
            your financial information (for example, your credit card or bank
            account information), or wire or otherwise send money to other
            members. YOU ARE SOLELY RESPONSIBLE FOR YOUR INTERACTIONS WITH OTHER
            MEMBERS. YOU UNDERSTAND THAT Connect Date DOES NOT CONDUCT CRIMINAL
            BACKGROUND CHECKS ON ITS MEMBERS OR OTHERWISE INQUIRE INTO THE
            BACKGROUND OF ITS MEMBERS. Connect Date MAKES NO REPRESENTATIONS OR
            WARRANTIES AS TO THE CONDUCT OR COMPATIBILITY OF MEMBERS.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Index;
