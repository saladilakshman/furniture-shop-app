export const IndianPrice = (pricevalue) => {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumSignificantDigits: Number(pricevalue.toString().length),
    }).format(pricevalue);
  } catch (err) {
    console.log(err);
    return pricevalue;
  }
};
