/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateTaskInput {
  text: string;
  children?: CreateTaskInputItem[] | null;
  isPublic: boolean;
}

export interface CreateTaskInputItem {
  text: string;
  children?: CreateTaskInputItem[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
