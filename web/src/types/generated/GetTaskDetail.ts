/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTaskDetail
// ====================================================

export interface GetTaskDetail_task_user {
  email: string;
}

export interface GetTaskDetail_task_parent_parent {
  id: string;
  text: string;
}

export interface GetTaskDetail_task_parent {
  id: string;
  text: string;
  parent: GetTaskDetail_task_parent_parent | null;
}

export interface GetTaskDetail_task_children_children {
  id: string;
  text: string;
}

export interface GetTaskDetail_task_children {
  id: string;
  text: string;
  children: GetTaskDetail_task_children_children[];
}

export interface GetTaskDetail_task {
  id: string;
  text: string;
  isMine: boolean;
  user: GetTaskDetail_task_user;
  parent: GetTaskDetail_task_parent | null;
  children: GetTaskDetail_task_children[];
}

export interface GetTaskDetail {
  task: GetTaskDetail_task;
}

export interface GetTaskDetailVariables {
  id: string;
}
