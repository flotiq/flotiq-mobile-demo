import { StyleSheet } from 'react-native';

import Colors from '../../../helpers/constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    noImgContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#cdcdcd',
        alignItems: 'center',
    },
    noImgText: {
        fontFamily: 'Inter-Bold',
        fontSize: 25,
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 5, height: 5 },
    },
    previewWrapper: {
        flex: 1,
    },
    preview: {
        height: '100%',
    },
    imgBtn: {
        alignSelf: 'center',
        width: '80%',
        marginVertical: 20,
        backgroundColor: Colors.accent2,
    },
    photoBtn: {
        alignSelf: 'center',
        width: '80%',
        backgroundColor: Colors.accent2,
    },
});

export default styles;
