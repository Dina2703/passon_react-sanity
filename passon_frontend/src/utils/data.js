export const userQuery = (userId) => {
  //it says: try to get me a document of type equal user and id equal the userId
  const query = `*[_type == "user" && _id == "${userId}"]`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type =="pin" && title match '${searchTerm}*'|| category match '${searchTerm}*' || about match  '${searchTerm}*']{
    image {
      asset -> {
        url
      }
    },
    _id,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    }, 
    save[] {
      _key,
      postedBy -> {
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const feedQuery = `*[_type == 'pin'] | order(_createAt desc) {
  image {
    asset -> {
      url
    }
  },
  _id,
  destination,
  postedBy -> {
    _id,
    userName,
    image
  }, 
  save[] {
    _key,
    postedBy -> {
      _id,
      userName,
      image
    },
  },
}`;
