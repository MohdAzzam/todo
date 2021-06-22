import React, { createContext, useState } from "react";

const Context = createContext();

function Provider({ children }) {
    const [isShowCompletedItem, setShowCompletedItems] = useState(true);
    const [numberOfItemsPerScreen, setNumberOfItemsPerScreen] = useState(2);
    const [targetSortField, setTargetSortField] = useState('text')
    
    return (
        <Context.Provider
            value={{
                isShowCompletedItem,
                setShowCompletedItems,
                numberOfItemsPerScreen,
                setNumberOfItemsPerScreen,
                targetSortField,
                setTargetSortField
            }}
        >
            {children}
        </Context.Provider>
    );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    Context,
    Provider,
    Consumer: Context.Consumer,
};