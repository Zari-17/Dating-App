import React from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import {Images} from '../assets/images';
const {height, width} = Dimensions.get('window');

const image = [
  {
    id: 1,
    picture: Images.Picture_1,
  },
  {
    id: 2,
    picture: Images.Picture_2,
  },
  {
    id: 3,
    picture: Images.Picture_3,
  },
  {
    id: 4,
    picture: Images.Picture_4,
  },
  {
    id: 5,
    picture: Images.Picture_5,
  },
  {
    id: 6,
    picture: Images.Picture_6,
  },
  {
    id: 7,
    picture: Images.Picture_7,
  },
  {
    id: 8,
    picture: Images.Picture_8,
  },
  {
    id: 9,
    picture: Images.Picture_9,
  },
  {
    id: 10,
    picture: Images.Picture_10,
  },
  {
    id: 11,
    picture: Images.Picture_11,
  },
  {
    id: 12,
    picture: Images.Picture_12,
  },
  {
    id: 13,
    picture: Images.Picture_13,
  },
  {
    id: 14,
    picture: Images.Picture_14,
  },
  {
    id: 15,
    picture: Images.Picture_15,
  },
  {
    id: 16,
    picture: Images.Picture_16,
  },
  {
    id: 17,
    picture: Images.Picture_17,
  },
  {
    id: 18,
    picture: Images.Picture_18,
  },
  {
    id: 19,
    picture: Images.Picture_19,
  },
  {
    id: 20,
    picture: Images.Picture_20,
  },
  {
    id: 21,
    picture: Images.Picture_21,
  },
  {
    id: 22,
    picture: Images.Picture_22,
  },
  {
    id: 23,
    picture: Images.Picture_23,
  },
  {
    id: 24,
    picture: Images.Picture_24,
  },
  {
    id: 25,
    picture: Images.Picture_25,
  },
  {
    id: 26,
    picture: Images.Picture_26,
  },
  {
    id: 27,
    picture: Images.Picture_27,
  },
  {
    id: 28,
    picture: Images.Picture_28,
  },
  {
    id: 29,
    picture: Images.Picture_29,
  },
  {
    id: 30,
    picture: Images.Picture_30,
  },
  {
    id: 31,
    picture: Images.Picture_31,
  },
  {
    id: 32,
    picture: Images.Picture_32,
  },
  {
    id: 33,
    picture: Images.Picture_33,
  },
  {
    id: 34,
    picture: Images.Picture_34,
  },
  {
    id: 35,
    picture: Images.Picture_35,
  },
  {
    id: 36,
    picture: Images.Picture_36,
  },
  {
    id: 37,
    picture: Images.Picture_37,
  },
  {
    id: 38,
    picture: Images.Picture_38,
  },
  {
    id: 39,
    picture: Images.Picture_39,
  },
  {
    id: 40,
    picture: Images.Picture_40,
  },
  {
    id: 41,
    picture: Images.Picture_41,
  },
  {
    id: 42,
    picture: Images.Picture_42,
  },
  {
    id: 43,
    picture: Images.Picture_43,
  },
  {
    id: 44,
    picture: Images.Picture_44,
  },
  {
    id: 45,
    picture: Images.Picture_45,
  },
  {
    id: 46,
    picture: Images.Picture_46,
  },
  {
    id: 47,
    picture: Images.Picture_47,
  },
  {
    id: 48,
    picture: Images.Picture_48,
  },
  {
    id: 49,
    picture: Images.Picture_49,
  },
  {
    id: 50,
    picture: Images.Picture_50,
  },
  {
    id: 51,
    picture: Images.Picture_51,
  },
  {
    id: 52,
    picture: Images.Picture_52,
  },
];

//
const Card = ({card, onPress, ...props}) => {
  let img = image.filter(item => item.id === Number(card?.user?.avatar));

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        width: width * 0.9,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
      }}
      className={'p-3 bg-white flex flex-row items-center rounded-lg mt-2'}>
      <Image
        source={img[0].picture}
        className={'w-12 h-12'}
        resizeMode={'contain'}
      />
      <Text className={'text-lg text-black font-semibold ml-4'}>
        {card?.user?.firstName} {card?.user?.lastName}
      </Text>
    </TouchableOpacity>
  );
};

export default Card;
