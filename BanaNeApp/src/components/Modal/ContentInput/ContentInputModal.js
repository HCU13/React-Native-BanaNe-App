import {StyleSheet, Text, View, TextInput, Dimensions} from 'react-native';
import React, {useState} from 'react';
import Button from '../../Button/Button';
import Modal from 'react-native-modal';

const ContentInputModal = ({visible, onClose, onSend}) => {
  const [text, setText] = React.useState('');

  function handleSend() {
    if(!text){
      return;
    }

    onSend(text);
    setText('')
  }

  return (
    <Modal
    style={styles.modal}
      isVisible={visible}
      swipeDirection='down'
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonpress={onClose}>
      <View style={styles.container}>
        <View style={styles.input_container}>
        <TextInput placeholder="Metin giriniz" onChangeText={setText} multiline/>
        </View>
        <Button text="Gönder" onPress={handleSend} />
      </View>
    </Modal>
  );
};

export default ContentInputModal;

const deviceSize = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    margin:0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: deviceSize.height / 3,
  },
  modal:{
    justifyContent:'flex-end',
    margin:0
  },
  input_container:{
    flex:1,
  }
});
