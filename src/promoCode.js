function checkPromoCode(code, cart, now = new Date()) {
  if (!code) {
    return { valid: false, reason: "not_found" };
  }
  if (now >= code.expiresAt) {
    return { valid: false, reason: "expired" };
  }
  if (cart.subtotal < code.minCartTotal) {
    return { valid: false, reason: "below_minimum" };
  }
  if (cart.items.some((item) => code.excludedCategories.includes(item.category))) {
    return { valid: false, reason: "excluded_category" };
  }
  if (code.redeemedBy.includes(cart.userId)) {
    return { valid: false, reason: "already_redeemed" };
  }
  return { valid: true, reason: null };
}

module.exports = { checkPromoCode };
