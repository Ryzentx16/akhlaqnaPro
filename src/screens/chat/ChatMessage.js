import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import Colors from "./Colors";

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function calcTime(offset) {
  // create Date object for current location
  var d = new Date();

  // convert to msec
  // subtract local time zone offset
  // get UTC time in msec
  var utc = d.getTime() + d.getTimezoneOffset() * 60000;

  // create new Date object for different city
  // using supplied offset
  var nd = new Date(utc + 3600000 * offset);

  // return time as a string
  return nd.toLocaleString();
}

function getPostDuration(postDate) {
  // var postDate = new Date(post.createdAt).getTime();
  // var currDate = new Date().getTime();
  // var postDuration = new Date(currDate - postDate);

  var postDate = new Date(postDate).getTime();
  var currDate = new Date(calcTime("+3")).getTime();
  var duration = currDate - postDate;

  var days = Math.floor(duration / (1000 * 60 * 60 * 24));
  var hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((duration % (1000 * 60)) / 1000);

  var durationString = "";

  if (days > 90) {
    var date = new Date(postDate);

    durationString =
      date.getDate() +
      " " +
      month[date.getMonth()] +
      " " +
      date.getFullYear().toString().substr(-2);
  } else if (days > 30 && days <= 90) {
    var date = new Date(postDate);
    durationString = date.getDate() + " " + month[date.getMonth()];
  } else if (days !== 0 && days > 0) {
    durationString = days + " d";
  } else if (hours !== 0 && hours > 0) {
    durationString = hours + " h";
  } else if (minutes !== 0 && minutes > 0) {
    durationString = minutes + " m";
  } else if (seconds !== 0 && seconds > 0) {
    durationString = seconds + " s";
  } else {
    durationString = "Just now";
  }

  return durationString;
  // console.log(postDuration)
}

function getTimeIn12Format(date) {
  let dt = new Date(date);
  let hours = dt.getHours(); // gives the value in 24 hours format
  let AmOrPm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  let minutes = dt.getMinutes();
  return hours + ":" + (minutes < 10 ? "0" + minutes : minutes) + " " + AmOrPm; //22:10
}

export default function ChatMessage(props) {
  const { message, myId, roomId } = props;
  const currDate = getTimeIn12Format(message.createdAt);

  const isMyMessage = () => {
    return message.user.id === myId;
  };

  return (
    <View
      style={[
        styles.messageBoxContainer,
        {
          padding: isMyMessage() ? 2 : 10,
        },
      ]}
    >
      <View
        style={[
          styles.messageBox,
          {
            backgroundColor: isMyMessage() ? "#660032" : "white",
            marginRight: isMyMessage() ? 0 : 50,
            marginLeft: isMyMessage() ? 50 : 0,
          },
        ]}
      >
        {!isMyMessage() && <Text style={styles.name}>{message.user.name}</Text>}
        <Text
          style={[
            styles.content,
            {
              color: isMyMessage() ? "white" : "black",
            },
          ]}
        >
          {message.content}
        </Text>
        <Text style={styles.time}>{currDate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageBoxContainer: {
    padding: 10,
  },
  messageBox: {
    backgroundColor: "#e5e5e5",
    marginRight: 50,
    borderRadius: 5,
    padding: 10,
  },
  nameContainer: {
    minWidth: 50,
    backgroundColor: "red",
  },
  contentContainer: {
    marginLeft: 10,
  },
  timeContainer: {},

  name: {
    fontWeight: "bold",
    color: "#660032",
    marginVertical: 5,
  },
  content: {},
  time: {
    fontSize: 10,
    color: "grey",
    alignSelf: "flex-end",
  },
});

/*export default function ChatMessage(props) {
    const {message, myId} = props;

    const isMyMessage = () => {
        return message.user.id === myId;
    }

    return (
        <View style={styles.messageBoxContainer}>
            <View style={[
                styles.messageBox, {
                    backgroundColor: isMyMessage() ? '#DCF8C5' : 'lightblue',
                    marginLeft: isMyMessage() ? 50 : 0,
                    marginRight: isMyMessage() ? 0 : 50,
                }
            ]}>
                {
                    !isMyMessage() &&
                    <Text style={styles.name}>
                        {message.user.name}
                    </Text>
                }
                <Text style={styles.message}>{message.content}</Text>
                <Text style={styles.time}>{getPostDuration(message.createdAt)}</Text>
            </View>
        </View>
    )
}*/

/*

const styles = StyleSheet.create({
    messageBoxContainer: {
        padding: 10,
    },
    messageBox: {
        borderRadius: 5,
        padding: 7,
    },
    name: {
        color: Colors.light.tint,
        fontWeight: "bold",
        marginBottom: 5,
    },
    message: {},
    time: {
        // backgroundColor: 'red',
        alignSelf: "flex-end",
        color: 'grey'
    }
});*/
