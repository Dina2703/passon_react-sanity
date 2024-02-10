export const userQuery = (userId) => {
  //it says: try to get me a document of type equal user and id equal the userId
  const query = `*[_type == "user" && _id == "${userId}"]`;
  return query;
};
