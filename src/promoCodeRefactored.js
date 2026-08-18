const RULES = [
  {
    reason: "not_found",
    fails: (code) => !code,
  },
  {
    reason: "expired",
    fails: (code, cart, now) => now >= code.expiresAt,
  },
  {
    reason: "below_minimum",
    fails: (code, cart) => cart.subtotal < code.minCartTotal,
  },
  {
    reason: "excluded_category",
    fails: (code, cart) => cart.items.some((item) => code.excludedCategories.includes(item.category)),
  },
  {
    reason: "already_redeemed",
    fails: (code, cart) => code.redeemedBy.includes(cart.userId),
  },
];

function checkPromoCode(code, cart, now = new Date()) {
  for (const rule of RULES) {
    if (rule.fails(code, cart, now)) {
      return { valid: false, reason: rule.reason };
    }
  }
  return { valid: true, reason: null };
}

module.exports = { checkPromoCode };
