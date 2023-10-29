import { configureStore } from "@reduxjs/toolkit";
import popUpState from './reducer/changePopState'
import playNumber from './reducer/playNumber'
import gameName from "./reducer/gameName";
import playColor from './reducer/playColor'
import changeSecond from "./reducer/seconds";
import parityPrevResult from './reducer/parityResult'
import bconePrevResult from "./reducer/bconeResult";
import saprePrevResult from "./reducer/sapreResult";
import emerdPrevResult from "./reducer/emerdResult";

const store = configureStore({
    reducer: {
        popUpState,
        playNumber,
        gameName,
        playColor,
        changeSecond,
        parityPrevResult,
        bconePrevResult,
        emerdPrevResult,
        saprePrevResult
    }
})

export default store