// All data in this file is mock data for the client demo. No backend, no credentials.

let seed = 42
const rnd = () => {
  seed = (seed * 16807) % 2147483647
  return (seed - 1) / 2147483646
}
const pick = (arr) => arr[Math.floor(rnd() * arr.length)]
const int = (a, b) => Math.floor(a + rnd() * (b - a + 1))

export const fmtRs = (n) => 'Rs ' + Math.round(n).toLocaleString('en-PK')
export const fmtK = (n) =>
  n >= 1e6 ? 'Rs ' + (n / 1e6).toFixed(2) + 'M' : n >= 1e3 ? 'Rs ' + (n / 1e3).toFixed(0) + 'K' : 'Rs ' + n

export const company = { name: 'Shahzad Group', product: 'Livestock Partnership Platform', short: 'LPP' }

const firstNames = ['Muhammad', 'Ali', 'Ahmed', 'Bilal', 'Usman', 'Hamza', 'Imran', 'Tariq', 'Asif', 'Rashid', 'Zahid', 'Naveed', 'Kashif', 'Sajid', 'Waqas', 'Shahid', 'Farooq', 'Javed', 'Nadeem', 'Irfan']
const lastNames = ['Khan', 'Akhtar', 'Hussain', 'Iqbal', 'Malik', 'Butt', 'Chaudhry', 'Rana', 'Qureshi', 'Sheikh', 'Gondal', 'Bhatti', 'Jutt', 'Leghari', 'Khosa']
const places = ['Dera Ghazi Khan', 'Taunsa', 'Kot Chutta', 'Choti Zareen', 'Jampur', 'Rajanpur', 'Muzaffargarh', 'Layyah']
const personName = () => `${pick(firstNames)} ${pick(lastNames)}`
const cnic = () => `32${int(100, 999)}-${int(1000000, 9999999)}-${int(1, 9)}`
const phone = () => `03${int(0, 4)}${int(0, 9)}-${int(1000000, 9999999)}`

export const businesses = [
  { id: 'B1', name: 'Shahzad Livestock', type: 'Livestock', icon: '🐃', branches: 6, users: 34, revenue: 8450000, expense: 5920000 },
  { id: 'B2', name: 'Green Fields Agriculture', type: 'Agriculture Farm', icon: '🌾', branches: 3, users: 18, revenue: 5120000, expense: 3870000 },
  { id: 'B3', name: 'Al-Shifa Medical Store', type: 'Medical Store', icon: '💊', branches: 2, users: 9, revenue: 2310000, expense: 1840000 },
  { id: 'B4', name: 'Kisan Pesticide Centre', type: 'Pesticide Store', icon: '🧪', branches: 3, users: 11, revenue: 3980000, expense: 3120000 },
  { id: 'B5', name: 'Madina Karyana Store', type: 'Karyana Store', icon: '🛒', branches: 4, users: 14, revenue: 4260000, expense: 3710000 },
  { id: 'B6', name: 'Noor Cloth House', type: 'Cloth Shop', icon: '👕', branches: 2, users: 7, revenue: 1890000, expense: 1430000 },
  { id: 'B7', name: 'Indus Arhti & Mandi', type: 'Arhti / Mandi', icon: '⚖️', branches: 2, users: 10, revenue: 7340000, expense: 6510000 },
  { id: 'B8', name: 'Shahzad Installments', type: 'Installment Business', icon: '📆', branches: 2, users: 8, revenue: 2750000, expense: 1960000 },
]

export const branchesList = [
  { name: 'DG Khan Main Farm', business: 'Shahzad Livestock', manager: 'Bilal Akhtar', users: 9, location: 'Dera Ghazi Khan' },
  { name: 'Taunsa Dairy Farm', business: 'Shahzad Livestock', manager: 'Usman Malik', users: 6, location: 'Taunsa' },
  { name: 'Kot Chutta Goat Farm', business: 'Shahzad Livestock', manager: 'Hamza Rana', users: 5, location: 'Kot Chutta' },
  { name: 'Jampur Cattle Farm', business: 'Shahzad Livestock', manager: 'Tariq Khosa', users: 5, location: 'Jampur' },
  { name: 'Rajanpur Buffalo Farm', business: 'Shahzad Livestock', manager: 'Asif Leghari', users: 5, location: 'Rajanpur' },
  { name: 'Choti Sheep Farm', business: 'Shahzad Livestock', manager: 'Imran Gondal', users: 4, location: 'Choti Zareen' },
  { name: 'Green Fields — Block A', business: 'Green Fields Agriculture', manager: 'Zahid Hussain', users: 7, location: 'Muzaffargarh' },
  { name: 'Green Fields — Block B', business: 'Green Fields Agriculture', manager: 'Naveed Iqbal', users: 6, location: 'Layyah' },
  { name: 'Al-Shifa — Main Bazar', business: 'Al-Shifa Medical Store', manager: 'Kashif Sheikh', users: 5, location: 'Dera Ghazi Khan' },
  { name: 'Kisan Centre — Jampur', business: 'Kisan Pesticide Centre', manager: 'Sajid Bhatti', users: 4, location: 'Jampur' },
]

export const animalTypes = [
  { type: 'Buffalo', icon: '🐃', count: 486, pregnant: 112, milking: 268 },
  { type: 'Cow', icon: '🐄', count: 392, pregnant: 87, milking: 214 },
  { type: 'Goat', icon: '🐐', count: 371, pregnant: 64, milking: 41 },
  { type: 'Sheep', icon: '🐑', count: 237, pregnant: 38, milking: 0 },
]

const breeds = { Buffalo: ['Nili-Ravi', 'Kundi'], Cow: ['Sahiwal', 'Cholistani', 'Red Sindhi', 'Holstein Cross'], Goat: ['Beetal', 'Teddy', 'Dera Din Panah'], Sheep: ['Lohi', 'Kajli', 'Thalli'] }
const statuses = ['Active', 'Active', 'Active', 'Pregnant', 'Pregnant', 'Breeding', 'Under Treatment', 'Sold', 'Transferred']
const prefix = { Buffalo: 'B', Cow: 'C', Goat: 'G', Sheep: 'S' }

export const farmers = Array.from({ length: 24 }, (_, i) => {
  const jama = int(150000, 900000)
  const udhar = int(40000, 600000)
  return {
    id: `F-${String(1001 + i)}`,
    name: personName(),
    father: personName(),
    cnic: cnic(),
    phone: phone(),
    village: pick(places),
    animals: int(4, 28),
    share: pick(['50 / 50', '50 / 50', '25 / 25 / 50']),
    jama,
    udhar,
    balance: jama - udhar,
    guarantor: personName(),
    joined: `${int(2019, 2025)}-${String(int(1, 12)).padStart(2, '0')}-${String(int(1, 28)).padStart(2, '0')}`,
  }
})

export const animals = Array.from({ length: 60 }, (_, i) => {
  const type = pick(['Buffalo', 'Buffalo', 'Cow', 'Cow', 'Goat', 'Sheep'])
  const status = pick(statuses)
  const cost = type === 'Buffalo' ? int(280000, 520000) : type === 'Cow' ? int(180000, 380000) : int(45000, 120000)
  const expenses = Math.round(cost * (0.15 + rnd() * 0.25))
  const income = Math.round(cost * (0.2 + rnd() * 0.7))
  const farmer = pick(farmers)
  return {
    id: `${prefix[type]}-${100 + i}`,
    tag: `ET-${int(10000, 99999)}`,
    type,
    breed: pick(breeds[type]),
    gender: type === 'Sheep' || type === 'Goat' ? pick(['Female', 'Female', 'Male']) : pick(['Female', 'Female', 'Female', 'Male']),
    age: `${int(1, 8)}y ${int(0, 11)}m`,
    status,
    health: pick(['Healthy', 'Healthy', 'Healthy', 'Healthy', 'Under Treatment', 'Vaccination Due']),
    farmer: farmer.name,
    farmerId: farmer.id,
    farm: pick(branchesList.slice(0, 6)).name,
    purchaseDate: `${int(2021, 2025)}-${String(int(1, 12)).padStart(2, '0')}-${String(int(1, 28)).padStart(2, '0')}`,
    cost,
    expenses,
    income,
    milk: type === 'Buffalo' ? int(8, 14) : type === 'Cow' ? int(10, 22) : type === 'Goat' ? int(1, 3) : 0,
    mother: rnd() > 0.5 ? `${prefix[type]}-${int(10, 99)}` : '—',
    father: rnd() > 0.6 ? `${prefix[type]}-${int(10, 99)}` : '—',
  }
})

export const pregnancyWatch = [
  { id: 'B-102', type: 'Buffalo', farmer: 'Muhammad Akhtar', lastBreeding: '2026-06-18', days: 109, status: 'Not confirmed', level: 'danger' },
  { id: 'C-117', type: 'Cow', farmer: 'Ali Hussain', lastBreeding: '2026-06-29', days: 98, status: 'Not confirmed', level: 'danger' },
  { id: 'B-131', type: 'Buffalo', farmer: 'Usman Rana', lastBreeding: '2026-07-04', days: 93, status: 'Repeat breeding', level: 'danger' },
  { id: 'G-144', type: 'Goat', farmer: 'Hamza Khosa', lastBreeding: '2026-07-21', days: 76, status: 'Test pending', level: 'warn' },
  { id: 'C-109', type: 'Cow', farmer: 'Imran Malik', lastBreeding: '2026-08-02', days: 64, status: 'Test pending', level: 'warn' },
]

export const deliveries = [
  { id: 'B-118', type: 'Buffalo', farmer: 'Bilal Gondal', expected: '2026-10-09', days: 4, state: 'Approaching' },
  { id: 'C-125', type: 'Cow', farmer: 'Asif Leghari', expected: '2026-10-12', days: 7, state: 'Approaching' },
  { id: 'G-150', type: 'Goat', farmer: 'Tariq Bhatti', expected: '2026-10-02', days: -3, state: 'Overdue' },
  { id: 'B-139', type: 'Buffalo', farmer: 'Naveed Qureshi', expected: '2026-10-21', days: 16, state: 'Scheduled' },
  { id: 'S-157', type: 'Sheep', farmer: 'Javed Sheikh', expected: '2026-10-25', days: 20, state: 'Scheduled' },
]

export const breedingLog = [
  { date: '2026-10-04', id: 'B-121', event: 'Artificial insemination', by: 'FO Kashif Sheikh', result: 'Pending test' },
  { date: '2026-10-03', id: 'C-111', event: 'Pregnancy confirmed', by: 'Dr. Farooq (Vet)', result: 'Confirmed' },
  { date: '2026-10-02', id: 'G-146', event: 'Heat detected', by: 'Partner Farmer', result: 'Service scheduled' },
  { date: '2026-10-01', id: 'B-102', event: 'Pregnancy test', by: 'Dr. Farooq (Vet)', result: 'Negative' },
  { date: '2026-09-29', id: 'C-128', event: 'Natural service', by: 'FO Sajid Bhatti', result: 'Pending test' },
  { date: '2026-09-27', id: 'B-136', event: 'Delivery — female calf', by: 'FO Waqas Butt', result: 'Newborn B-161 created' },
]

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export const milkWeek = days.map((d) => ({ day: d, buffalo: int(2900, 3400), cow: int(3800, 4500), goat: int(90, 140) }))

export const milkEntries = Array.from({ length: 14 }, () => {
  const a = pick(animals.filter((x) => x.milk > 0))
  const morning = +(a.milk * (0.5 + rnd() * 0.1)).toFixed(1)
  const evening = +(a.milk * (0.4 + rnd() * 0.1)).toFixed(1)
  const rate = a.type === 'Buffalo' ? 220 : a.type === 'Cow' ? 180 : 250
  return { animal: a.id, type: a.type, farmer: a.farmer, morning, evening, fat: +(a.type === 'Buffalo' ? 6 + rnd() * 2 : 3.5 + rnd() * 1.2).toFixed(1), rate, total: Math.round((morning + evening) * rate) }
})

export const monthly = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map((m, i) => {
  const sales = 2600000 + i * 95000 + int(-250000, 300000)
  const expenses = Math.round(sales * (0.68 + rnd() * 0.08))
  return { month: m, sales, expenses, profit: sales - expenses }
})

export const investors = Array.from({ length: 10 }, (_, i) => {
  const capital = int(10, 60) * 100000
  const profit = Math.round(capital * (0.08 + rnd() * 0.14))
  const paid = Math.round(profit * (0.3 + rnd() * 0.6))
  return { id: `INV-${201 + i}`, name: personName(), cnic: cnic(), business: pick(businesses).name, capital, share: int(10, 35), profit, paid, remaining: profit - paid, since: `${int(2020, 2025)}` }
})

export const partners = Array.from({ length: 10 }, (_, i) => ({
  id: `PRT-${301 + i}`,
  name: personName(),
  ptype: pick(['Partner Farmer', 'Partner Farmer', 'Partner Shop', 'Partner Agriculture Farm']),
  unit: pick(branchesList).name,
  share: pick([25, 50, 50, 40]),
  profit: int(80000, 650000),
  status: pick(['Active', 'Active', 'Active', 'Settlement Due']),
}))

export const stockItems = [
  { store: 'Medical', sku: 'MED-1021', name: 'Oxytetracycline 20% Inj 100ml', category: 'Veterinary', batch: 'OX-2611', qty: 18, min: 25, unit: 'Vial', rate: 640, expiry: '2026-10-28' },
  { store: 'Medical', sku: 'MED-1034', name: 'Ivermectin 1% Inj 50ml', category: 'Veterinary', batch: 'IV-2588', qty: 64, min: 20, unit: 'Vial', rate: 520, expiry: '2027-03-14' },
  { store: 'Medical', sku: 'MED-1050', name: 'Calcium Borogluconate 450ml', category: 'Veterinary', batch: 'CB-2702', qty: 9, min: 15, unit: 'Bottle', rate: 380, expiry: '2026-12-02' },
  { store: 'Medical', sku: 'MED-1066', name: 'Paracetamol 500mg (10x10)', category: 'Human', batch: 'PC-2519', qty: 120, min: 40, unit: 'Box', rate: 210, expiry: '2026-10-11' },
  { store: 'Medical', sku: 'MED-1077', name: 'FMD Vaccine 50 dose', category: 'Vaccine', batch: 'FM-2690', qty: 22, min: 10, unit: 'Vial', rate: 2900, expiry: '2026-11-19' },
  { store: 'Pesticide', sku: 'PST-2010', name: 'Emamectin Benzoate 1.9EC 1L', category: 'Insecticide', batch: 'EM-2440', qty: 86, min: 30, unit: 'Bottle', rate: 2150, expiry: '2027-06-01' },
  { store: 'Pesticide', sku: 'PST-2025', name: 'Glyphosate 41% 1L', category: 'Herbicide', batch: 'GL-2412', qty: 12, min: 40, unit: 'Bottle', rate: 1450, expiry: '2026-10-20' },
  { store: 'Pesticide', sku: 'PST-2039', name: 'Imidacloprid 20SL 250ml', category: 'Insecticide', batch: 'IM-2391', qty: 140, min: 50, unit: 'Bottle', rate: 690, expiry: '2027-01-09' },
  { store: 'Pesticide', sku: 'PST-2044', name: 'Urea 50kg', category: 'Fertilizer', batch: 'UR-2601', qty: 310, min: 100, unit: 'Bag', rate: 4650, expiry: '—' },
  { store: 'Pesticide', sku: 'PST-2051', name: 'DAP 50kg', category: 'Fertilizer', batch: 'DP-2603', qty: 44, min: 80, unit: 'Bag', rate: 13800, expiry: '—' },
  { store: 'Karyana', sku: 'KRY-3001', name: 'Basmati Rice 5kg', category: 'Grocery', batch: '—', qty: 96, min: 30, unit: 'Bag', rate: 1650, expiry: '2027-04-01' },
  { store: 'Karyana', sku: 'KRY-3014', name: 'Cooking Oil 5L', category: 'Grocery', batch: 'CO-2608', qty: 22, min: 25, unit: 'Tin', rate: 2780, expiry: '2027-02-15' },
  { store: 'Karyana', sku: 'KRY-3022', name: 'Sugar 1kg', category: 'Grocery', batch: '—', qty: 240, min: 100, unit: 'Pack', rate: 165, expiry: '—' },
  { store: 'Karyana', sku: 'KRY-3035', name: 'Tea Leaves 950g', category: 'Grocery', batch: 'TL-2577', qty: 58, min: 20, unit: 'Pack', rate: 1590, expiry: '2027-08-30' },
  { store: 'Cloth', sku: 'CLT-4001', name: 'Wash & Wear Suit (Unstitched)', category: 'Gents', batch: '—', qty: 74, min: 20, unit: 'Suit', rate: 3200, expiry: '—' },
  { store: 'Cloth', sku: 'CLT-4012', name: 'Lawn 3-Piece', category: 'Ladies', batch: '—', qty: 15, min: 25, unit: 'Suit', rate: 4800, expiry: '—' },
  { store: 'Cloth', sku: 'CLT-4020', name: 'Khaddar Shawl', category: 'Winter', batch: '—', qty: 41, min: 15, unit: 'Piece', rate: 2400, expiry: '—' },
]

export const TODAY = new Date('2026-10-05')
export const daysTo = (d) => (d === '—' ? Infinity : Math.round((new Date(d) - TODAY) / 86400000))

export const crops = [
  { plot: 'A-01', farm: 'Block A', crop: 'Cotton', area: '25 acre', sown: '2026-05-04', harvest: '2026-11-10', stage: 'Picking', cost: 1840000, expectedSale: 3150000 },
  { plot: 'A-02', farm: 'Block A', crop: 'Sugarcane', area: '18 acre', sown: '2026-02-20', harvest: '2027-01-15', stage: 'Growing', cost: 1420000, expectedSale: 2680000 },
  { plot: 'B-01', farm: 'Block B', crop: 'Rice (Paddy)', area: '30 acre', sown: '2026-06-25', harvest: '2026-10-30', stage: 'Maturing', cost: 2110000, expectedSale: 3720000 },
  { plot: 'B-02', farm: 'Block B', crop: 'Fodder (Berseem)', area: '8 acre', sown: '2026-09-28', harvest: '2026-12-20', stage: 'Sowing', cost: 160000, expectedSale: 0 },
  { plot: 'B-03', farm: 'Block B', crop: 'Wheat', area: '22 acre', sown: '—', harvest: '2027-04-15', stage: 'Land Prep', cost: 85000, expectedSale: 2400000 },
]

export const installments = Array.from({ length: 9 }, (_, i) => {
  const total = int(12, 45) * 10000
  const advance = Math.round(total * 0.2)
  const n = pick([6, 10, 12])
  const paidN = int(1, n)
  const per = Math.round((total - advance) / n)
  const overdue = rnd() > 0.65
  return { id: `INS-${5101 + i}`, customer: personName(), product: pick(['Motorcycle CD-70', 'Solar Panel 550W', 'Refrigerator', 'Buffalo (B-1' + int(60, 99) + ')', 'Tractor Trolley', 'Washing Machine', 'LED TV 43"']), total, advance, n, paidN, per, freq: pick(['Monthly', 'Monthly', 'Seasonal', 'Weekly']), next: `2026-10-${String(int(1, 28)).padStart(2, '0')}`, overdue }
})

export const arhtiLots = Array.from({ length: 7 }, (_, i) => {
  const commodity = pick(['Paddy', 'Cotton', 'Wheat', 'Sugarcane'])
  const maund = int(150, 900)
  const buy = commodity === 'Cotton' ? int(8200, 9000) : commodity === 'Paddy' ? int(3800, 4300) : commodity === 'Wheat' ? int(3500, 3900) : int(420, 480)
  const sell = Math.round(buy * (1.03 + rnd() * 0.06))
  const exp = Math.round(maund * buy * 0.018)
  const sold = rnd() > 0.35
  return { lot: `LOT-${7201 + i}`, commodity, farmer: personName(), maund, buy, sell: sold ? sell : null, exp, buyer: sold ? pick(['Fatima Sugar Mills', 'Ghazi Rice Traders', 'Multan Cotton Ginners', 'Punjab Flour Mills']) : '—', profit: sold ? maund * (sell - buy) - exp : null }
})

export const fieldVisits = [
  { time: '10:42', officer: 'Kashif Sheikh', target: 'Farmer F-1004 — Animal B-121', activity: 'AI service + photo', lat: 30.0561, lng: 70.6348, sync: 'Synced', media: 3 },
  { time: '10:15', officer: 'Sajid Bhatti', target: 'Taunsa Dairy Farm', activity: 'Milk record (morning)', lat: 30.7048, lng: 70.6505, sync: 'Synced', media: 1 },
  { time: '09:58', officer: 'Waqas Butt', target: 'Animal C-117 — Vaccination', activity: 'FMD vaccine + video', lat: 29.9673, lng: 70.4885, sync: 'Pending', media: 2 },
  { time: '09:31', officer: 'Kashif Sheikh', target: 'Farmer F-1011 — Shed inspection', activity: 'Observation + 4 photos', lat: 30.0812, lng: 70.6021, sync: 'Synced', media: 4 },
  { time: '08:47', officer: 'Irfan Jutt', target: 'Green Fields Plot A-01', activity: 'Crop evidence — cotton picking', lat: 30.0726, lng: 71.1932, sync: 'Offline queue', media: 5 },
  { time: '08:20', officer: 'Waqas Butt', target: 'Kisan Centre — Jampur', activity: 'Stock count + barcode scan', lat: 29.6418, lng: 70.5954, sync: 'Synced', media: 2 },
]

export const officers = [
  { name: 'Kashif Sheikh', area: 'DG Khan', status: 'On field', visits: 7, battery: 78, checkIn: '08:02', x: 52, y: 38 },
  { name: 'Sajid Bhatti', area: 'Taunsa', status: 'On field', visits: 5, battery: 54, checkIn: '07:48', x: 46, y: 14 },
  { name: 'Waqas Butt', area: 'Kot Chutta / Jampur', status: 'On field', visits: 6, battery: 31, checkIn: '08:10', x: 40, y: 62 },
  { name: 'Irfan Jutt', area: 'Muzaffargarh', status: 'Offline', visits: 4, battery: 66, checkIn: '07:55', x: 80, y: 34 },
  { name: 'Shahid Iqbal', area: 'Rajanpur', status: 'Checked out', visits: 3, battery: 90, checkIn: '07:40', x: 30, y: 86 },
]

export const alerts = [
  { cat: 'Livestock', level: 'danger', title: 'Animal B-102 — pregnancy not confirmed for 109 days', sub: 'Threshold: 90 days · Farmer Muhammad Akhtar', time: '2h ago' },
  { cat: 'Livestock', level: 'danger', title: 'Delivery overdue — G-150 (expected 02 Oct)', sub: 'Farmer Tariq Bhatti · Kot Chutta Goat Farm', time: '3h ago' },
  { cat: 'Stock', level: 'danger', title: 'Paracetamol 500mg expiring in 6 days', sub: 'Al-Shifa Medical · Batch PC-2519 · 120 boxes', time: '5h ago' },
  { cat: 'Stock', level: 'warn', title: 'Glyphosate 41% below minimum (12 / 40)', sub: 'Kisan Pesticide Centre — Jampur', time: '6h ago' },
  { cat: 'Livestock', level: 'warn', title: '14 animals — FMD vaccination due this week', sub: 'Taunsa Dairy Farm', time: '8h ago' },
  { cat: 'Finance', level: 'warn', title: '3 installment recoveries overdue', sub: 'Total Rs 86,400 · Shahzad Installments', time: 'Today' },
  { cat: 'Finance', level: 'info', title: 'Investor profit settlement due — Q3', sub: '6 investors · Rs 1.24M', time: 'Today' },
  { cat: 'Operations', level: 'info', title: '5 approvals pending in Approval Inbox', sub: '2 purchases · 1 animal transfer · 2 expenses', time: 'Today' },
  { cat: 'Operations', level: 'warn', title: 'Field device offline > 2 hours — Irfan Jutt', sub: '5 records in offline sync queue', time: '1h ago' },
]

export const approvals = [
  { id: 'APR-881', type: 'Purchase', detail: 'Urea 50kg × 200 bags — Kisan Centre', amount: 930000, by: 'Sajid Bhatti (Manager)', stage: 'Reviewer' },
  { id: 'APR-882', type: 'Animal Transfer', detail: 'B-118: Taunsa Dairy → DG Khan Main Farm', amount: 0, by: 'Usman Malik (Manager)', stage: 'Approver' },
  { id: 'APR-883', type: 'Expense', detail: 'Feed (wanda) — 60 bags', amount: 252000, by: 'Bilal Akhtar (Manager)', stage: 'Approver' },
  { id: 'APR-884', type: 'Animal Sale', detail: 'C-122 Sahiwal cow — buyer Rana Traders', amount: 340000, by: 'Tariq Khosa (Manager)', stage: 'Reviewer' },
  { id: 'APR-885', type: 'Expense', detail: 'Tractor repair — Block A', amount: 48500, by: 'Zahid Hussain (Manager)', stage: 'Approver' },
]

export const activity = [
  { who: 'Kashif Sheikh', what: 'recorded AI service for B-121 with GPS + 3 photos', time: '10:42' },
  { who: 'Usman Malik', what: 'posted milk sale Rs 74,800 — Taunsa Dairy', time: '10:20' },
  { who: 'Admin', what: 'changed pregnancy attention threshold to 90 days', time: '09:50' },
  { who: 'Kashif Sheikh', what: 'created newborn record B-161 (mother B-136)', time: '09:12' },
  { who: 'Sajid Bhatti', what: 'purchase invoice PI-2291 · 40 × Imidacloprid', time: '08:55' },
  { who: 'Super Admin', what: 'approved investor withdrawal INV-204 · Rs 150,000', time: '08:30' },
]

export const ledgerFor = (f) => {
  const rows = []
  let bal = 0
  const types = [
    ['Jama — milk payment', 1],
    ['Udhar — feed advance', -1],
    ['Cash received', 1],
    ['Udhar — medicine', -1],
    ['Jama — calf sale share', 1],
    ['Cash paid', -1],
  ]
  for (let i = 0; i < 9; i++) {
    const [desc, sign] = types[i % types.length]
    const amt = int(5, 80) * 1000
    bal += sign * amt
    rows.push({ date: `2026-${String(9 + Math.floor(i / 5)).padStart(2, '0')}-${String(3 + (i * 3) % 27).padStart(2, '0')}`, desc, debit: sign < 0 ? amt : 0, credit: sign > 0 ? amt : 0, balance: bal })
  }
  return rows
}

export const trialBalance = [
  { code: '1001', account: 'Cash in Hand', debit: 1845000, credit: 0 },
  { code: '1002', account: 'Bank — HBL Current', debit: 6420000, credit: 0 },
  { code: '1101', account: 'Accounts Receivable', debit: 3180000, credit: 0 },
  { code: '1201', account: 'Inventory — Stores', debit: 4960000, credit: 0 },
  { code: '1301', account: 'Livestock (Biological Assets)', debit: 21750000, credit: 0 },
  { code: '2001', account: 'Accounts Payable', debit: 0, credit: 2740000 },
  { code: '2101', account: 'Zakat Payable', debit: 0, credit: 412000 },
  { code: '3001', account: 'Company Capital', debit: 0, credit: 25000000 },
  { code: '3101', account: 'Investor Capital', debit: 0, credit: 7800000 },
  { code: '4001', account: 'Sales Revenue', debit: 0, credit: 36100000 },
  { code: '5001', account: 'Cost of Sales', debit: 22460000, credit: 0 },
  { code: '5101', account: 'Operating Expenses', debit: 5397000, credit: 0 },
  { code: '5201', account: 'Feed & Fodder', debit: 6040000, credit: 0 },
]

export const vouchers = [
  { no: 'CRV-1182', type: 'Cash Receipt', date: '2026-10-05', party: 'Rana Traders', amount: 340000, status: 'Posted' },
  { no: 'CPV-0941', type: 'Cash Payment', date: '2026-10-05', party: 'Feed supplier — Al-Noor', amount: 252000, status: 'Pending Approval' },
  { no: 'BRV-0318', type: 'Bank Receipt', date: '2026-10-04', party: 'Fatima Sugar Mills', amount: 1460000, status: 'Posted' },
  { no: 'JV-0207', type: 'Journal', date: '2026-10-03', party: 'Profit allocation — Q3', amount: 1240000, status: 'Posted' },
  { no: 'BPV-0522', type: 'Bank Payment', date: '2026-10-02', party: 'Engro Fertilizers', amount: 930000, status: 'Draft' },
]

export const users = [
  { name: 'Aamir Shahzad', role: 'Super Admin', scope: 'All businesses', last: 'Online now', status: 'Active' },
  { name: 'Bilal Akhtar', role: 'Admin', scope: 'Shahzad Livestock', last: '10 min ago', status: 'Active' },
  { name: 'Usman Malik', role: 'Manager', scope: 'Taunsa Dairy Farm', last: '25 min ago', status: 'Active' },
  { name: 'Kashif Sheikh', role: 'Field Officer', scope: 'DG Khan region', last: 'Online now', status: 'Active' },
  { name: 'Sajid Bhatti', role: 'Manager', scope: 'Kisan Pesticide — Jampur', last: '1 h ago', status: 'Active' },
  { name: 'Nadeem Qureshi', role: 'Accountant', scope: 'All businesses', last: '2 h ago', status: 'Active' },
  { name: 'Shahid Iqbal', role: 'Investor', scope: 'Own investment only', last: 'Yesterday', status: 'Active' },
  { name: 'Javed Butt', role: 'Partner Farmer', scope: 'Own animals & khata', last: '3 days ago', status: 'Suspended' },
]

export const permissionMatrix = [
  ['Super Admin', 'Full, system-wide', 'Full', 'Full', 'All roles', 'Full', 'Full'],
  ['Admin', 'Assigned businesses', 'Full (routine)', 'Protected', 'Lower tiers', 'Create / edit', 'Assigned'],
  ['Manager', 'Own branch', 'Daily transactions', 'Request only', 'No', 'View + reports', 'No'],
  ['Field Officer', 'Own submissions', 'Field data, GPS, camera', 'No', 'No', 'No access', 'No'],
  ['Investor', 'Own investment', 'No', 'No', 'No', 'Own statements', 'No'],
  ['Partner Farmer', 'Own animals & farm', 'Limited (if allowed)', 'No', 'No', 'Own khata', 'No'],
  ['Partner Shop', 'Own shop', 'Limited (if allowed)', 'No', 'No', 'Own shop', 'No'],
  ['Custom Role', 'As configured', 'As configured', 'As configured', 'As configured', 'As configured', 'As configured'],
]
