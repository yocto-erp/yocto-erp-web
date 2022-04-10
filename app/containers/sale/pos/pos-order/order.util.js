import { v4 as uuidv4 } from "uuid";
import { multiply, plus, subtract } from "../../../../libs/utils/math.util";
import { TAX_TYPE } from "../../../finance/tax/tax/constants";

export const initProduct = prod => ({
  product: prod,
  qty: 0,
  tax: 0,
  total: 0,
  totalWithTax: 0,
  taxes: [],
});

export const initOrder = () => ({
  id: uuidv4(),
  name: `Order ${new Date().toLocaleString("vi-VN")}`,
  customer: null,
  products: [],
  total: 0,
  totalWithTax: 0,
  tax: 0,
  email: "",
  phone: "",
  address: "",
  taxes: [],
  isShipping: false,
  debt: 0,
  return: 0,
  paymentAmountInput: "",
  paymentAmount: 0,
});

function calculateProductTax(taxes, amount) {
  const rs = {
    tax: 0,
    taxes: [],
    totalWithTax: 0,
    total: amount,
  };
  for (let i = 0; i < taxes.length; i += 1) {
    const { type, amount: taxAmount } = taxes[i];
    let taxVal = 0;
    if (type === TAX_TYPE.PERCENT) {
      taxVal = multiply(amount, taxAmount / 100);
    } else {
      taxVal = taxAmount;
    }
    rs.taxes.push({ ...taxes[i], taxAmount: taxVal });
    rs.tax = plus(rs.tax, taxVal);
    rs.totalWithTax = plus(amount, taxVal);
  }
  return rs;
}

/**
 * Return: {
 *   total,
 *   tax,
 *   totalTax
 * }
 * @param order
 */
export function calculateOrder(order) {
  const rs = {
    total: 0,
    taxes: [],
    totalWithTax: 0,
    debt: 0,
    return: 0,
    tax: 0,
  };
  if (order) {
    const { products, paymentAmount } = order;
    for (let i = 0; i < products.length; i += 1) {
      const product = products[i];
      const price = multiply(product.qty, product.product.price);
      const productTax = calculateProductTax(product.product.taxes, price);
      product.tax = productTax.tax;
      product.taxes = productTax.taxes;
      product.total = productTax.total;
      product.totalWithTax = productTax.totalWithTax;
      rs.total = plus(rs.total, price);
      rs.tax = plus(rs.tax, product.tax);
      rs.totalWithTax = plus(rs.totalWithTax, productTax.totalWithTax);
      for (let j = 0; j < product.taxes.length; j += 1) {
        const tax = product.taxes[j];
        let taxExisted = rs.taxes.find(t => t.id === tax.id);
        if (!taxExisted) {
          taxExisted = { ...tax };
          rs.taxes.push(taxExisted);
        } else {
          taxExisted.taxAmount = plus(taxExisted.taxAmount, tax.taxAmount);
        }
      }
    }
    rs.return = subtract(paymentAmount, rs.total);
    rs.debt = subtract(rs.totalWithTax, paymentAmount);
  }
  console.log(rs);
  return { ...order, ...rs };
}
