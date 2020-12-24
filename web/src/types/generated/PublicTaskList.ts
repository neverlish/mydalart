/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PublicTaskList
// ====================================================

export interface PublicTaskList_publicTaskList_items_user {
  email: string;
}

export interface PublicTaskList_publicTaskList_items_children {
  text: string;
}

export interface PublicTaskList_publicTaskList_items {
  id: string;
  text: string;
  user: PublicTaskList_publicTaskList_items_user;
  children: PublicTaskList_publicTaskList_items_children[];
}

export interface PublicTaskList_publicTaskList {
  items: PublicTaskList_publicTaskList_items[];
}

export interface PublicTaskList {
  publicTaskList: PublicTaskList_publicTaskList;
}
