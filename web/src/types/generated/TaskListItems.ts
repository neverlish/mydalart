/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TaskListItems
// ====================================================

export interface TaskListItems_items_user {
  email: string;
}

export interface TaskListItems_items_children {
  id: string;
  text: string;
}

export interface TaskListItems_items {
  id: string;
  text: string;
  isMine: boolean;
  user: TaskListItems_items_user;
  children: TaskListItems_items_children[];
}

export interface TaskListItems {
  items: TaskListItems_items[];
}
