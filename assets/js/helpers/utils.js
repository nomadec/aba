// since all web requests are unreliable

import { ROLE_ADMIN } from "./consts";

// each request will be wrapped into try-catch block
export async function supervise_rq(req) {
  let resp = {};
  try {
    const result = await req();
    resp.status = "success";
    resp.data = result.data.data;
  } catch (error) {
    resp.status = "error";
    resp.data = compileMessages(error.response.data.data);
  }
  return resp;
}

function compileMessages(messages) {
  let string = "";
  for (let key in messages) {
    string = `${string}, ${key} - ${messages[key]}`;
  }
  return string;
}

// to verify that user has a required role to use given functionality
export function permittedRole(user, role) {
  if (user && role) {
    if (user.role === role || role === ROLE_ADMIN) {
      return true;
    } else {
      return false;
    }
  } else if (!role) {
    // if role is undefined, means no requirement to verify role, hence return true
    return true;
  }
}
