export const categories = [
  {
    name: 'Backgrounds',
    image: 'https://d2zia2w5autnlg.cloudfront.net/39157/profile-5f8b1017bd5ae-small',
  },
  {
    name: 'Comidas',
    image: 'https://2.bp.blogspot.com/-pK_0zQVRZS4/VzedseH5c4I/AAAAAAAAAHI/uWGwx6aAFK4Zvw0_keEYHx27HlTjtIzmgCLcB/s320/1211809336.png',
  },
  {
    name: 'Cosplay',
    image: 'https://a.wattpad.com/useravatar/En_busca_de_un_pato.256.37732.jpg',
  },
  {
    name: 'Deportes',
    image: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/sports-ball-2631620-2175652.png',
  },
  {
    name: 'Fitness',
    image: 'https://pbs.twimg.com/profile_images/629670916725821441/ly8asSaq_400x400.jpg',
  },
  {
    name: 'Memes',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYnuGP0KUAWul1y_XDIn4ZtiU0bD40miX1Zw&usqp=CAU',
  }, 
  {
    name: 'Naturalza',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiKLX9DUZn9RtlmHvw9PzmJZ7yO9mmitgetRe79Tv98yEpWoh6vYxRYNWXCUBr83e7It8&usqp=CAU',
  },
  {
    name: 'Programación',
    image: 'https://sistemasdn9blog.files.wordpress.com/2017/10/cropped-icono-programacion.png',
  },
  {
    name: 'Setups',
    image: 'https://m.media-amazon.com/images/I/81wiWwKfCoL._CR204,0,1224,1224_UX256.jpg',
  },
  {
    name: 'gatos',
    image: 'https://i.pinimg.com/originals/6b/a2/06/6ba206756137a462018fd26e98ac2c9c.jpg',
  },
  {
    name: 'perros',
    image: 'https://images-na.ssl-images-amazon.com/images/I/710zCJptT3L._CR84,0,1332,1332_UX256.jpg',
  },
  {
    name: 'otros',
    image: 'https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg',
  },
];

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
  image{
    asset->{
      url
    }
  },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    } `;

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image{
          asset->{
            url
          }
        },
            _id,
            destination,
            postedBy->{
              _id,
              userName,
              image
            },
            save[]{
              _key,
              postedBy->{
                _id,
                userName,
                image
              },
            },
          }`;
  return query;
};

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};