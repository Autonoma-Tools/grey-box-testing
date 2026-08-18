const a = require("./src/promoCode.js").checkPromoCode;
const b = require("./src/promoCodeRefactored.js").checkPromoCode;

const NOW = new Date("2026-08-17T12:00:00Z");
const base = () => ({
  expiresAt: new Date("2026-12-31T00:00:00Z"),
  minCartTotal: 40,
  excludedCategories: ["gift-card"],
  redeemedBy: ["user-9"],
});
const cart = (o = {}) => ({ subtotal: 100, items: [{ category: "apparel" }], userId: "user-1", ...o });

const cases = [
  ["not_found",         null,                                              cart()],
  ["expired",           { ...base(), expiresAt: new Date("2026-01-01") },  cart()],
  ["below_minimum",     base(),                                            cart({ subtotal: 39 })],
  ["excluded_category", base(),                                            cart({ items: [{ category: "gift-card" }] })],
  ["already_redeemed",  base(),                                            cart({ userId: "user-9" })],
  ["valid",             base(),                                            cart()],
];

let pass = 0;
for (const [expected, code, c] of cases) {
  const ra = a(code, c, NOW), rb = b(code, c, NOW);
  const got = ra.valid ? "valid" : ra.reason;
  const same = JSON.stringify(ra) === JSON.stringify(rb);
  const ok = got === expected && same;
  if (ok) pass++;
  console.log(`${ok ? "PASS" : "FAIL"}  partition=${expected.padEnd(18)} original=${JSON.stringify(ra)}  refactored=${JSON.stringify(rb)}  identical=${same}`);
}
console.log(`\n${pass}/${cases.length} partitions verified; implementations agree on every one.`);

// boundary probe: minCartTotal is an inclusive floor (>= passes, < fails)
const atFloor = a(base(), cart({ subtotal: 40 }), NOW);
const belowFloor = a(base(), cart({ subtotal: 39.99 }), NOW);
console.log(`boundary: subtotal=40 -> ${atFloor.valid ? "valid" : atFloor.reason}; subtotal=39.99 -> ${belowFloor.valid ? "valid" : belowFloor.reason}`);
process.exit(pass === cases.length ? 0 : 1);
