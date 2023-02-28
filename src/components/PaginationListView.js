import React, { useState, useMemo, useId, useCallback } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { useFocusEffect } from "@react-navigation/native";

let counter = 0;

const PaginationListView = (props) => {
  const {
    renderItem,
    retrieveData,
    perPage,
    isBottomSheet = false,
    isSend,
    isInverted = false,
    refreshCallBack = null,
    isHideRefreshAnimation = false,
  } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isEndReached, setIsEndReached] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(false);

  const fetchData = async (requestPage) => {
    setLoading(true);

    const params = {
      page: requestPage,
      perPage: perPage, // Replace with your desired number of posts per page
    };

    const response = await retrieveData(params);

    setLoading(false);
    return response;
  };

  // On First Render
  useMemo(() => {
    console.log("New Render");

    //Reset Pages
    setIsEndReached(false);

    //Reset OnEndReachedCalledDuringMomentum
    setOnEndReachedCalledDuringMomentum(false);

    fetchData(page).then((result) => {
      if (result != null) {
        setData([...result]);
      }
    });
  }, []);

  const handleLoadMore = async () => {
    counter += 1;
    console.log(`..................Loading More (${counter}).................`);

    console.log(`isEnd: ${isEndReached}`);
    if (!isEndReached) {
      result = await fetchData(page + 1);

      if (result != null) {
        setData([...data, ...result]);
        setPage(page + 1);
      } else {
        setIsEndReached(true); // mohm
      }
    }
    console.log(
      `..................Loading More Done (${counter}).................`
    );
  };

  const refreshHandler = () => {
    setRefreshing(true);

    fetchData(1).then((result) => {
      setIsEndReached(false);
      setOnEndReachedCalledDuringMomentum(false);

      if (result != null) {
        setData([]);
        setData([...result]);
      }

      setRefreshing(false);
      setPage(1);

      if (refreshCallBack) {
        refreshCallBack();
      }
    });
  };

  useMemo(refreshHandler, [isSend]);

  useFocusEffect(
    useCallback(() => {
      refreshHandler();
    }, [])
  );

  const renderFooter = () => {
    if (!loading) return null;

    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {!isBottomSheet ? (
        <FlatList
          data={data}
          style={props.style}
          // Error here
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onMomentumScrollBegin={() =>
            setOnEndReachedCalledDuringMomentum(false)
          }
          onEndReached={() => {
            if (!onEndReachedCalledDuringMomentum) {
              handleLoadMore();
              setOnEndReachedCalledDuringMomentum(true);
            }
          }}
          onEndReachedThreshold={0.2}
          ListFooterComponent={renderFooter}
          refreshing={isHideRefreshAnimation ? !isHideRefreshAnimation:refreshing}
          onRefresh={refreshHandler}
          inverted={isInverted}
        />
      ) : (
        <BottomSheetFlatList
          data={data}
          style={props.style}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onMomentumScrollBegin={() =>
            setOnEndReachedCalledDuringMomentum(false)
          }
          onEndReached={() => {
            if (!onEndReachedCalledDuringMomentum) {
              handleLoadMore();
              setOnEndReachedCalledDuringMomentum(true);
            }
          }}
          onEndReachedThreshold={0.2}
          ListFooterComponent={renderFooter}
          refreshing={isHideRefreshAnimation ? !isHideRefreshAnimation:refreshing}
          onRefresh={refreshHandler}
          // style={{ flex: 1, backgroundColor: 'red' }}
        />
      )}
    </View>
  );
};

export default PaginationListView;
