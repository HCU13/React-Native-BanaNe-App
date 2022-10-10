import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState} from 'react';
import FloatingButton from '../../components/FloatingButton/FloatingButton';
import ContentInputModal from '../../components/Modal/ContentInput/ContentInputModal';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {parse} from '@babel/core';
import parseContentData from '../../components/utils/parseContentData';
import MessageCard from '../../../src/components/card/MessageCard/MessageCard';

const Messages = () => {
  const [inputModalVisible, setInputModalVisible] = React.useState(false);
  const [contanetList, setcontanetList] = React.useState([]);

  React.useEffect(() => {
    database()
      .ref('/messages/')
      .on('value', snapshot => {
        const contentData = snapshot.val();

        if (!contentData) {
          return;
        }

        const parsedData = parseContentData(contentData);
        setcontanetList(parsedData);
      });
  }, []);

  function handleInputToogle() {
    setInputModalVisible(!inputModalVisible);
  }
  function handleSendContent(content) {
    handleInputToogle();
    sendContent(content);
  }

  function sendContent(content) {
    const usermail = auth().currentUser.email;

    const contentObj = {
      text: content,
      username: usermail.split('@')[0],
      date: new Date().toISOString(),
      dislike:0,
    };
    database().ref('/messages/').push(contentObj);
  }
  function handleBanane(item) {
    database()
      .ref(`messages/${item.id}/`)
      .update({dislike: item.dislike + 1});
  }

  const renderContent = ({item}) => (
    <MessageCard message={item} onBanane={() => handleBanane(item)} />
  );

  return (
    <View style={styles.container}>
      <FlatList data={contanetList} renderItem={renderContent} />
      <FloatingButton icon="plus" onPress={handleInputToogle} />
      <ContentInputModal
        visible={inputModalVisible}
        onClose={handleInputToogle}
        onSend={handleSendContent}
      />
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
