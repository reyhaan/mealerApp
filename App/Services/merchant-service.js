import database from '../Config/database';

const userObject = [
    {
      name: "Mohammad Rehaan",
      avatar: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAARGAAAAJGE5ZTUxOWE3LWUwNjItNGZiMi1hMDdkLTA1MzE5YWVlYzBmZQ.jpg",
      cousineType: "Indian",
      rating: 3.6,
      quotaLimit: 30,
      quotaUsed: 24
    },
    {
      name: "Mohammad Rehaan",
      avatar: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAARGAAAAJGE5ZTUxOWE3LWUwNjItNGZiMi1hMDdkLTA1MzE5YWVlYzBmZQ.jpg",
      cousineType: "Indian",
      rating: 3.6,
      quotaLimit: 30,
      quotaUsed: 24
    },
    {
      name: "Mohammad Rehaan",
      avatar: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAARGAAAAJGE5ZTUxOWE3LWUwNjItNGZiMi1hMDdkLTA1MzE5YWVlYzBmZQ.jpg",
      cousineType: "Indian",
      rating: 3.6,
      quotaLimit: 30,
      quotaUsed: 24
    },
    {
      name: "Mohammad Rehaan",
      avatar: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAARGAAAAJGE5ZTUxOWE3LWUwNjItNGZiMi1hMDdkLTA1MzE5YWVlYzBmZQ.jpg",
      cousineType: "Indian",
      rating: 3.6,
      quotaLimit: 30,
      quotaUsed: 24
    },
    {
      name: "Mohammad Rehaan",
      avatar: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAARGAAAAJGE5ZTUxOWE3LWUwNjItNGZiMi1hMDdkLTA1MzE5YWVlYzBmZQ.jpg",
      cousineType: "Indian",
      rating: 3.6,
      quotaLimit: 30,
      quotaUsed: 24
    },
    {
      name: "Mohammad Rehaan",
      avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
      cousineType: "Indian",
      rating: 3.6,
      quotaLimit: 30,
      quotaUsed: 24
    },
    {
      name: "Mohammad Rehaan",
      avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
      cousineType: "Indian",
      rating: 3.6,
      quotaLimit: 30,
      quotaUsed: 24
    },
    {
      name: "Mohammad Rehaan",
      avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
      cousineType: "Indian",
      rating: 3.6,
      quotaLimit: 30,
      quotaUsed: 24
    }
  ]
let merchant = {};

merchant.createMenu = (userId, menu) => {
    let userMenuRef = database.user(userId + '/menu');
    return userMenuRef.push().set(menu);
};

merchant.removeMenu = (userId, menuId) => {
    let userMenuRef = database.user(userId + '/menu/' + menuId);
    return userMenuRef.remove();
};

merchant.getMenu = (userId) => {
    return new Promise((resolve, reject) => {
        let userMenuRef = database.user(userId + '/menu' );
        userMenuRef.once('value').then((snapshot) => {
            let menus = [];
            snapshot.forEach(function (childSnapshot) {
                let id = childSnapshot.key;
                let data = childSnapshot.val();
                menus.push({id, ...data});
            });
            resolve(menus);
        }).catch(error => {
            reject(error);
        })
    });
};

export default merchant;
