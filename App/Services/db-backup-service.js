import db from '../Config/database';

const dbString = '{"menus":{"12j3VND2oXZBhMG9Y14ytB5YY3y1":{"-L0-aJz13Rf7ZmIcWXcw":{"id":"-L0-aJz13Rf7ZmIcWXcw","itemCost":1.21,"itemDetail":"Asia","itemImage":"https://airnd-product-images.s3.amazonaws.com/saSas12j3VND2oXZBhMG9Y14ytB5YY3y1mealer_app_imageairnd.png","itemName":"saSas"},"-L0-aNPIeaK6vSgJeKh6":{"id":"-L0-aNPIeaK6vSgJeKh6","itemCost":112.12,"itemDetail":"Asddadsad","itemImage":"https://airnd-product-images.s3.amazonaws.com/wqwqqw12j3VND2oXZBhMG9Y14ytB5YY3y1mealer_app_imageairnd.png","itemName":"wqwqqw"},"-L0-aQWOhJjOFg9DLIiI":{"id":"-L0-aQWOhJjOFg9DLIiI","itemCost":32.12,"itemDetail":"12eqwdsaf","itemImage":"https://airnd-product-images.s3.amazonaws.com/sadasds12j3VND2oXZBhMG9Y14ytB5YY3y1mealer_app_imageairnd.png","itemName":"sadasds"}}},"messages":{"-L-lD9dD_VncfD0k6ksv":{"original":"uppercaseme"},"-L-lEfj0wWUh4JS1FxjB":{"original":"uppercaseme"},"-L-oBgOlmByPEcqEFn4Q":{"original":"uppercaseme"},"-L-oBod7CcSrowKRsATi":{"original":"uppercaseme"},"-L-oD5yA_lYo24ezPZ6m":{"original":"uppercaseme"},"-L-oDU-GfFT6ler9m_wd":{"original":"uppercaseme"},"-L-oDW4ly0WBlaytjlMK":{"original":"uppercaseme"},"-L-oHWq9Bu2O0miJwPxK":{"original":"uppercaseme"},"-L-oHaNiyqoNQQAqerdy":{"original":"uppercaseme"},"-L-oI1pCrvgitzJmn3bM":{"original":"uppercaseme"},"-L-oIZUu4dHRZZ7IQAt0":{"original":"uppercaseme"},"-L-oJl4e-faG0qTGTMzy":{"original":"uppercaseme"},"-L-oKLDgSD5ICJcRgPgk":{"original":"uppercaseme"},"-L-oKcdENbd0exUZZi9c":{"original":"uppercaseme"},"-L-oKgzK1uZiZq_EN8zl":{"original":"uppercaseme"},"-L-oKhe8kpAxBEL4nwAz":{"original":"uppercaseme"}},"orders":{"-L-zLzqESMGq3AuQWNue":{"from":"yPeGFu975KQbfFrKo04lcn44VGz1","id":"-L-zLzqESMGq3AuQWNue","status":"new","time":1512891481965,"to":{"4gNYuLcLJTYvAugHWIfxZVBYe2k2":{"-L-4oZSeWoUY3gFXLiop":{"id":"-L-4oZSeWoUY3gFXLiop","itemCost":140,"itemCount":1,"itemDetail":"something really awesome","itemImage":"https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1438133716000/photosp/ig-498695320661758884_396353171/stock-photo-food-soup-healthy-foods-health-recipe-vegan-food-and-drink-stew-ig-498695320661758884_396353171.jpg","itemName":"Blah blah","key":"-L-4oZSeWoUY3gFXLiop","merchantInfo":{"email":"uk@mealer.com","id":"4gNYuLcLJTYvAugHWIfxZVBYe2k2","key":"4gNYuLcLJTYvAugHWIfxZVBYe2k2","name":"Uk Chef","type":"vendor","uid":"4gNYuLcLJTYvAugHWIfxZVBYe2k2"}}}},"userInfo":{"address":"1012 Pinecrest","avatar":"https://airnd-product-images.s3.amazonaws.com/yPeGFu975KQbfFrKo04lcn44VGz1mealer_app_imageairnd.png","email":"customer@mealer.com","name":"Customer Food","phone":"(613) 111-2223","type":"customer","uid":"yPeGFu975KQbfFrKo04lcn44VGz1"}}},"users":{"12j3VND2oXZBhMG9Y14ytB5YY3y1":{"email":"vendor@mealer.com","name":"vendor","type":"vendor","uid":"12j3VND2oXZBhMG9Y14ytB5YY3y1"},"1JtF1GnnJSW98J5pRIPZT7feFA73":{"email":"customer@mealer.com","name":"customer","type":"customer","uid":"1JtF1GnnJSW98J5pRIPZT7feFA73"},"OQ2CuAhuNue5ZXhiFnRN2defNNJ2":{"email":"moyo@mealer.com","name":"Moyo","type":"customer","uid":"OQ2CuAhuNue5ZXhiFnRN2defNNJ2"},"r1SWHkkGq6g6sCHKv3ph0EK8b9w2":{"address":"120 Main Street","email":"ukeme@mealer.com","name":"uk","phone":"1234567","type":"customer","uid":"r1SWHkkGq6g6sCHKv3ph0EK8b9w2"}}}';

const backupDB = {};

backupDB.writeUsers = async () => {
  await db.user().set({
    '12j3VND2oXZBhMG9Y14ytB5YY3y1': {
      email: 'vendor@mealer.com',
      name: 'vendor',
      type: 'vendor',
      uid: '12j3VND2oXZBhMG9Y14ytB5YY3y1',
    },
    '1JtF1GnnJSW98J5pRIPZT7feFA73': {
      email: 'customer@mealer.com',
      name: 'customer',
      type: 'customer',
      uid: '1JtF1GnnJSW98J5pRIPZT7feFA73',
    },
    OQ2CuAhuNue5ZXhiFnRN2defNNJ2: {
      email: 'moyo@mealer.com',
      name: 'Moyo',
      type: 'customer',
      uid: 'OQ2CuAhuNue5ZXhiFnRN2defNNJ2',
    },
    r1SWHkkGq6g6sCHKv3ph0EK8b9w2: {
      address: '120 Main Street',
      email: 'ukeme@mealer.com',
      name: 'uk',
      phone: '1234567',
      type: 'customer',
      uid: 'r1SWHkkGq6g6sCHKv3ph0EK8b9w2',
    },
  });
};

backupDB.populateDB = async () => {
  await db.root().set(JSON.parse(dbString));
};

backupDB.getBackupJson = () => JSON.parse(dbString);

export default backupDB;
