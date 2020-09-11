import React, { useRef } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import RightAction from './Actions/RightAction';
import LeftAction from './Actions/LeftAction';

const SwipeableRow = ({ children, onSwipeLeft, onSwipeRight, isSwipeable, renderLeft }) => {
    const swipeableRow = useRef(null);

    const closeRight = () => {
        onSwipeRight();
        swipeableRow.current.close();
    };

    const closeLeft = () => {
        onSwipeLeft();
        swipeableRow.current.close();
    };

    const renderRightActions = () => (
        <RightAction
            close={closeRight}
        />
    );

    const renderLeftActions = () => (
        <LeftAction
            close={closeLeft}
        />
    );

    return (
        isSwipeable
            ? (
                <Swipeable
                    ref={swipeableRow}
                    friction={2}
                    leftThreshold={40}
                    rightThreshold={40}
                    renderLeftActions={renderLeft ? renderLeftActions : null}
                    renderRightActions={renderRightActions}
                >
                    {children}
                </Swipeable>
            ) : children

    );
};

export default SwipeableRow;
