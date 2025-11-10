import { createContext, createRef } from "react";
import type { RefObject } from "react";

export const FormCTX =  createContext<RefObject<HTMLFormElement | null>>(createRef());

