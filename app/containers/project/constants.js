import { PERMISSION_ENABLE_TYPE } from "../../components/Acl/permission/constants";

export const PROJECT_PERMISSION = {
  PROJECT: {
    READ: 128,
    CREATE: 129,
    DELETE: 130,
    UPDATE: 131,
  },
  PROJECT_TASK: {
    READ: 132,
    CREATE: 133,
    DELETE: 134,
    UPDATE: 135,
  },
};

export const PERMISSION_MODULE_PROJECT = [
  {
    id: 28,
    name: "Project",
    permissions: [
      {
        id: PROJECT_PERMISSION.PROJECT.CREATE,
        name: "CREATE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PROJECT_PERMISSION.PROJECT.READ,
        name: "CREATE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PROJECT_PERMISSION.PROJECT.UPDATE,
        name: "CREATE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PROJECT_PERMISSION.PROJECT.DELETE,
        name: "CREATE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
    ],
  },
  {
    id: 29,
    name: "Project Task",
    permissions: [
      {
        id: PROJECT_PERMISSION.PROJECT_TASK.CREATE,
        name: "CREATE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PROJECT_PERMISSION.PROJECT_TASK.READ,
        name: "CREATE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PROJECT_PERMISSION.PROJECT_TASK.UPDATE,
        name: "CREATE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PROJECT_PERMISSION.PROJECT_TASK.DELETE,
        name: "CREATE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
    ],
  },
];
