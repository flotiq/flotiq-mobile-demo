import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as authActions from '../../store/actions/auth';
import styles from './styles';

const LougoutBtn = (navigation) => {
    const dispatch = useDispatch();

    const deleteApiKey = () => {
        dispatch(authActions.removeApiToken());
        navigation.navigate('AuthenticationScreen');
    };
    return (
        <View>
            <Button
                icon={(
                    <MaterialCommunityIcons
                        name="logout"
                        size={25}
                        color="white"
                    />
                )}
                buttonStyle={styles.btn}
                onPress={() => deleteApiKey()}
            />
        </View>
    );
};

export default LougoutBtn;
