import { Dispatch, SetStateAction } from "react";

type UseStateType<S> = [S, Dispatch<SetStateAction<S>>];


export type { UseStateType };