import {
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';
import {Images} from '../assets/images';
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({
  _handleBack,
  btnText,
  textColor = 'back',
  title,
  isWhite = false,
  iconName,
  isBack,
  onPress,
  onPress2,
  isSearch,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={_handleBack}
        className={'flex flex-row items-center'}>
        {isBack && (
          <Image
            source={Images.arrow}
            className={'w-6 h-6 ml-4'}
            resizeMode={'contain'}
          />
        )}

        <Text allowFontScaling={false} style={styles.txt}>
          {title}
        </Text>
      </TouchableOpacity>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {isSearch && (
          <TouchableOpacity
            // activeOpacity={0.7}
            style={styles.imgStyleCont}
            onPress={onPress2}>
            <Icon name={'search'} size={30} color="#f44336" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          // activeOpacity={0.7}
          style={styles.imgStyleCont}
          onPress={onPress}>
          <Icon name={iconName} size={30} color="#f44336" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: height * 0.01,
    justifyContent: 'space-between',
    alignSelf: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imgStyleCont: {
    width: width * 0.1,
    height: width * 0.1,
    // backgroundColor: 'red',
    marginRight: width * 0.02,
  },
  txt: {
    color: '#f44336',
    fontSize: width * 0.075,
    marginLeft: width * 0.04,
    fontWeight: 'bold',
  },
  backCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Header;
