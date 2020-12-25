/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyTaskList
// ====================================================

export interface MyTaskList_myTaskList_items_user {
  email: string;
}

export interface MyTaskList_myTaskList_items_children {
  text: string;
  id: string;
}

export interface MyTaskList_myTaskList_items {
  id: string;
  text: string;
  isMine: boolean;
  user: MyTaskList_myTaskList_items_user;
  children: MyTaskList_myTaskList_items_children[];
}

export interface MyTaskList_myTaskList {
  items: MyTaskList_myTaskList_items[];
}

export interface MyTaskList {
  myTaskList: MyTaskList_myTaskList;
}
