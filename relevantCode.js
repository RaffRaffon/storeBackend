//This is the frontend code, the function addToCart gets invoked when ever I add an item to cart, (onclick event):
async function addToCart(Name, Price, Picture, Amount, id) {
    if (!localStorage['store-user']) {
      console.log("local storage adding to cart working");
 
      let cartArray
      if (localStorage['cart']) cartArray = localStorage.getArray('cart')
      else cartArray = []
      let checkIfExist = cartArray.find(item => { return item.Id === id })
      if (!checkIfExist) {
        cartArray.push({ Name: Name, Price: Price, Picture: Picture, Amount: Amount, TotalPrice: Price * Amount, Id: id })
        dispatch({ type: "CHANGECART" })
        localStorage.setArray('cart', cartArray)
        console.log(state.cartChanged);
      }
    } else {
      let cartFromDB = await CartService.getUserCartData(localStorage['store-user'])
      let cartData = cartFromDB.Items || cartFromDB
      let checkIfExist = cartData.find(item => { return item.Id === id })
      if (!checkIfExist) {
        cartData.push({ Name: Name, Price: Price, Picture: Picture, Amount: Amount, TotalPrice: Price * Amount, Id: id })
        CartService.updateUserCartData(cartData, localStorage['store-user'])
        dispatch({ type: "CHANGECART" })
      }
    }
  }
 
//This is the backend code:
 
async function updateUserCartData(cartData, token) {
    const userDetails = jwt.verify(token, jwtSecret);
    if (cartData.length === 0) {
        Cart.findOneAndDelete({ UserId: userDetails._id }, function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Cart deleted");
            }
        });
        return
    }
    const checkIfExist = await Cart.findOne({ UserId: userDetails._id }).exec();
    if (checkIfExist === null) {
        const newCart = new Cart({
            Items: cartData,
            UserId: userDetails._id
        })
        newCart.save(function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Cart inserted successfully")
            }
        })
    } else {
        await Cart.findOneAndUpdate({ UserId: userDetails._id }, {
            Items: cartData
        });
        console.log("Cart updated")
    }
}
async function getUserCartData(token) {
    //  Need to change the retrivation by token to retrivation by uid
    if (token) {
        const userDetails = jwt.verify(token, jwtSecret);
        const retrievedCart = await Cart.findOne({ UserId: userDetails._id }).exec();
        if (retrievedCart) return retrievedCart
        else return []
    } else return []
}