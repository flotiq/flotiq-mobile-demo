import React, {useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';


const IndicatorOverlay = (props) => {

    return(
        <View style={[styles.indicatorContainer, styles.indicatorHorizontal]}>
            <ActivityIndicator size="large" color="#000"/>
        </View>
    );
};

const styles = StyleSheet.create({
    indicatorContainer: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 1,
        backgroundColor: 'rgba(255,255,255,0.5)'
    },
    indicatorHorizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    }
});

export default IndicatorOverlay;
