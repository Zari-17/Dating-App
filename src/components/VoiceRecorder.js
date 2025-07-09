import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

import Sound from 'react-native-sound';

import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';

const VoiceRecorder = ({audioPath, isRight, timeDuration}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const sound = new Sound(audioPath, '', error => {
    if (error) {
      console.log('Error loading sound: ', error);
    } else {
    }
  });

  const togglePlayPause = () => {
    if (isPlaying) {
      sound.pause();
    } else {
      sound.setVolume(1.0);
      sound.play(success => {
        if (success) {
          console.log('Playback finished');
          setCurrentTime(0);
          setIsPlaying(false);
        } else {
          setIsPlaying(false);
          console.log('Playback failed');
        }
      });
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        sound.getCurrentTime(seconds => {
          setCurrentTime(seconds);
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: !isRight ? '#f44336' : '#EAECEC',
        },
      ]}>
      <TouchableOpacity
        style={{marginTop: 10}}
        activeOpacity={0.8}
        onPress={() => togglePlayPause()}>
        <Icon
          name={isPlaying ? 'pause' : 'play'}
          size={20}
          color={isRight ? '#f44336' : '#EAECEC'}
        />
      </TouchableOpacity>
      <View style={{flex: 1, marginLeft: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: !isRight ? '#fff' : '#000', fontSize: 10}}>
            {/* {formatTime(timeDuration)} */}
          </Text>
          <Text style={{color: !isRight ? '#fff' : '#000', fontSize: 10}}>
            {formatTime(currentTime)}
          </Text>
        </View>

        <Slider
          style={{width: '90%', height: 10}}
          minimumValue={currentTime}
          maximumValue={timeDuration}
          minimumTrackTintColor="#000"
          maximumTrackTintColor={!isRight ? '#eee' : 'gray'}
        />
      </View>
    </View>
  );
};

const formatTime = timeInSeconds => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default VoiceRecorder;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    padding: 8,
    borderRadius: 10,
  },
});
