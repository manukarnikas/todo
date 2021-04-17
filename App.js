import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList,TextInput } from "react-native";
import ListItem from "./components/ListItem";
import Header from "./components/Header";
import { Ionicons } from "@expo/vector-icons";
import firebaseConfig from "./config/firebase.config";
import * as firebase from "firebase";
import "firebase/firestore";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const App = () => {

  const list = db.collection("list");
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [value,setValue] = useState("");

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
   await list.get()
    .then((snapshot)=>{
      let listData = [];
      listData = snapshot.docs.map((val) => {
        let item = {};
        let itemData = val.data();
        item.id = val.id;
        item.task = itemData.task;
        item.isComplete = itemData.isComplete;
        return item;
      });
      setData(listData);
    })
    .catch(err=>{
      console.log(`Error Fetching data ${err}`);
    });
  };

  const addData = async () => {
    if(value){
      await list.doc().set({
        task: value,
        isComplete:false
      })
      .then(()=>{
         setValue('');
         getListData();
      })
      .catch(err=>{
        console.log(`Error Inserting data ${err}`);
      });
    }
  
  }

  const onComplete = async (id) => {
    await list.doc(id).update({
      isComplete: true
    })
    .then(()=>{
      getListData();
   })
   .catch(err=>{
     console.log(`Error Inserting data ${err}`);
   });
  }

  const deleteItem = async (id) => {
    await list.doc(id).delete()
    .then(()=>{
      getListData();
   })
   .catch(err=>{
     console.log(`Error Deleting data ${err}`);
   });
  }

  const onChange = (inputValue)=>{
    setValue(inputValue)
  }

  return (
    <>
      <Header />
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.Input}
          onChangeText={(event)=> onChange(event)}
          value={value}
          placeholder="Type Task to be done..."
        />
        <Ionicons style={styles.Icon} name="add-outline" size={32} color="black" onPress={addData}/>
      </View>
      <View style={styles.Container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ListItem key={item.id} item={item} onComplete={onComplete} deleteItem={deleteItem}/>}
          refreshing={refresh}
          onRefresh={() => {
            getListData();
          }}
          ItemSeparatorComponent={()=>(
            <View style={styles.Divider}/>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Divider:{
    borderWidth: 0.6,
    borderColor:'#e6e6e6',
    borderStyle: 'solid',
    marginLeft:10,
    marginRight:10
  },
  InputContainer:{
    flexDirection: "row",
    justifyContent: "space-between"
  },
  Input:{
    width: '80%',
    height: 50,
    marginLeft: 10,
  },
  Icon:{
    padding:10,
    marginRight: 10
  }
});


export default App;
