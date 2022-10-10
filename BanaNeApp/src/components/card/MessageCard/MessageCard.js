import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React from 'react';
import {formatDistance, parseISO} from 'date-fns';
import {tr} from 'date-fns/locale';
import colors from '../../../Styles/colors';

const MessageCard = ({message,onBanane}) => {
  const formattedDate = formatDistance(parseISO(message.date), new Date(), {
    addSuffix: true,
    locale:tr,
  });
  return (
    <View style={styles.container}>
    <View style={styles.inner_container}>
      <Text style={styles.user}>{message.username}</Text>
      <Text style={styles.date}>{formattedDate}</Text>
    </View>
    <Text style={styles.title}>{message.text}</Text>

    <View style={styles.footer}>
      <TouchableOpacity style={styles.dislike_container} onPress={onBanane}>
        {!!message.dislike && (
          <View style={styles.dislike_count_container}>
            <Text style={styles.dislike_count_text}>{message.dislike}</Text>
          </View>
        )}
        <Text style={styles.dislike_text}> bana ne?</Text>
      </TouchableOpacity>
    </View>

  </View>
  );
};

export default MessageCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkgreen,
    padding: 5,
    marginHorizontal: 5,
    marginVertical: 8,
    borderRadius: 10,
    elevation:8,
    shadowColor:"black"
  },
  inner_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  user: {
    fontSize: 18,
    color: 'white',
  },
  date: {
    fontSize: 18,
    color: 'white',
    fontStyle: 'italic',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  footer:{
      flex:1,
      flexDirection:"row",
      justifyContent:"flex-end",
      alignItems:"center"
  },
  dislike_container:{
      flexDirection:'row',
      backgroundColor:"white",
      padding:5,
      borderRadius:25,
      justifyContent:"center",
      alignItems:"center"
    },
  dislike_count_container:{
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:colors.darkgreen,
      borderRadius:25,
      padding:3,
  },
  dislike_count_text:{
      color:"white",
      fontWeight:"bold",
  },
  dislike_text:{
      color:colors.darkgreen,
      fontWeight:"bold"
  },
});
