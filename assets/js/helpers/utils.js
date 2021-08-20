// since all web requests are unreliable
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
    string = string + `${key} - ${messages[key]}`;
  }
  return string;
}
