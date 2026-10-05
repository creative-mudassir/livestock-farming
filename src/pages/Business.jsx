import { useState } from 'react'
import { Trash2, Barcode } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'
import { PageHead, Card, Kpi, Badge, Table, Tabs, Progress, useToast } from '../ui.jsx'
import { businesses, branchesList, stockItems, daysTo, crops, installments, arhtiLots, fmtRs, fmtK } from '../data.js'

export function Businesses() {
  const toast = useToast()
  return (
    <>
      <PageHead title="Businesses & Branches" sub="Multi-business, multi-branch structure with complete data separation">
        <button className="btn primary" onClick={() => toast('New business wizard (demo)')}>+ New Business</button>
      </PageHead>
      <div className="grid g-4 mb">
        {businesses.map((b) => {
          const p = b.revenue - b.expense
          return (
            <div key={b.id} className="card kpi">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 26 }}>{b.icon}</span>
                <div>
                  <b>{b.name}</b>
                  <div className="muted" style={{ fontSize: 12 }}>{b.type}</div>
                </div>
              </div>
              <div className="stat-line" style={{ marginTop: 10 }}><span className="muted">Branches</span><b>{b.branches}</b></div>
              <div className="stat-line"><span className="muted">Users</span><b>{b.users}</b></div>
              <div className="stat-line"><span className="muted">Revenue (YTD)</span><b>{fmtK(b.revenue)}</b></div>
              <div className="stat-line"><span className="muted">Profit</span><b style={{ color: '#1f7a4d' }}>{fmtK(p)}</b></div>
            </div>
          )
        })}
      </div>
      <div className="grid g-21">
        <Card title="Branches / Farms / Shops" flush>
          <Table
            cols={[
              { label: 'Branch', render: (r) => <b>{r.name}</b> },
              { label: 'Business', key: 'business' },
              { label: 'Manager', key: 'manager' },
              { label: 'Location', key: 'location' },
              { label: 'Users', key: 'users', num: true },
            ]}
            rows={branchesList}
          />
        </Card>
        <Card title="Profit by business (YTD)">
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={businesses.map((b) => ({ name: b.name.split(' ')[0], profit: b.revenue - b.expense }))} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid stroke="#eef1ee" horizontal={false} />
              <XAxis type="number" tickFormatter={(v) => (v / 1e6).toFixed(1) + 'M'} fontSize={11} />
              <YAxis type="category" dataKey="name" width={70} fontSize={12} />
              <Tooltip formatter={(v) => fmtRs(v)} />
              <Bar isAnimationActive={false} dataKey="profit" fill="#1f7a4d" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  )
}

const stockState = (s) => {
  const d = daysTo(s.expiry)
  if (d < 0) return ['Expired', 'danger']
  if (d <= 30) return [`Expires in ${d}d`, 'danger']
  if (s.qty < s.min) return ['Below minimum', 'warn']
  return ['In stock', 'ok']
}

export function Inventory() {
  const toast = useToast()
  const [store, setStore] = useState('All')
  const rows = stockItems.filter((s) => store === 'All' || s.store === store)
  return (
    <>
      <PageHead title="Stores & Inventory" sub="Medical · Pesticide · Karyana · Cloth — batch, expiry and low-stock control">
        <button className="btn" onClick={() => toast('Purchase invoice form (demo)')}>+ Purchase</button>
        <button className="btn primary" onClick={() => toast('Product form (demo)')}>+ Product</button>
      </PageHead>
      <div className="grid g-4 mb">
        <Kpi label="Stock value" value="Rs 4.96M" />
        <Kpi label="Products" value="1,284" />
        <Kpi label="Below minimum" value={stockItems.filter((s) => s.qty < s.min).length} />
        <Kpi label="Expiring ≤ 30 days" value={stockItems.filter((s) => daysTo(s.expiry) <= 30).length} />
      </div>
      <Card flush>
        <Tabs tabs={['All', 'Medical', 'Pesticide', 'Karyana', 'Cloth']} value={store} onChange={setStore} />
        <Table
          cols={[
            { label: 'SKU', render: (r) => <span className="mono">{r.sku}</span> },
            { label: 'Product', render: (r) => <b>{r.name}</b> },
            { label: 'Store', key: 'store' },
            { label: 'Category', key: 'category' },
            { label: 'Batch / Lot', render: (r) => <span className="mono">{r.batch}</span> },
            { label: 'Qty', num: true, render: (r) => <b>{r.qty}</b> },
            { label: 'Min', num: true, key: 'min' },
            { label: 'Rate', num: true, render: (r) => fmtRs(r.rate) },
            { label: 'Expiry', key: 'expiry' },
            { label: 'Status', render: (r) => { const [t, tone] = stockState(r); return <Badge tone={tone}>{t}</Badge> } },
          ]}
          rows={rows}
        />
      </Card>
    </>
  )
}

export function Pos() {
  const toast = useToast()
  const [cart, setCart] = useState([])
  const [cat, setCat] = useState('Karyana')
  const add = (p) =>
    setCart((c) => (c.some((x) => x.sku === p.sku) ? c.map((x) => (x.sku === p.sku ? { ...x, q: x.q + 1 } : x)) : [...c, { ...p, q: 1 }]))
  const sub = cart.reduce((s, x) => s + x.q * x.rate, 0)
  const disc = Math.round(sub * 0.02)
  return (
    <>
      <PageHead title="POS / Point of Sale" sub="Madina Karyana Store — Counter 1 · Shift opened 08:00 by Cashier Ali">
        <button className="btn" onClick={() => toast('Barcode scanner ready (demo)')}><Barcode size={15} /> Scan</button>
      </PageHead>
      <div className="grid g-21">
        <Card flush>
          <Tabs tabs={['Karyana', 'Medical', 'Pesticide', 'Cloth']} value={cat} onChange={setCat} />
          <div className="card-body">
            <div className="pos-grid">
              {stockItems.filter((s) => s.store === cat).map((p) => (
                <button key={p.sku} className="pos-item" onClick={() => add(p)}>
                  <b>{p.name}</b>
                  <span>{fmtRs(p.rate)}</span>
                  <div className="muted" style={{ fontSize: 11 }}>Stock {p.qty}</div>
                </button>
              ))}
            </div>
          </div>
        </Card>
        <Card title="Current Sale" sub={cart.length ? `${cart.reduce((s, x) => s + x.q, 0)} items` : 'Tap products to add'}>
          {cart.map((x) => (
            <div key={x.sku} className="stat-line" style={{ alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13 }}>{x.name}</div>
                <div className="muted" style={{ fontSize: 12 }}>{x.q} × {fmtRs(x.rate)}</div>
              </div>
              <b>{fmtRs(x.q * x.rate)}</b>
              <button className="icon-btn" style={{ width: 30, height: 30 }} onClick={() => setCart(cart.filter((y) => y.sku !== x.sku))}><Trash2 size={14} /></button>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--line)', marginTop: 10, paddingTop: 10 }}>
            <div className="stat-line"><span>Subtotal</span><span>{fmtRs(sub)}</span></div>
            <div className="stat-line"><span>Discount (2%)</span><span>- {fmtRs(disc)}</span></div>
            <div className="stat-line"><b>Total</b><span className="big-total">{fmtRs(sub - disc)}</span></div>
          </div>
          <div className="grid g-2" style={{ marginTop: 12 }}>
            <button className="btn" disabled={!cart.length} onClick={() => { toast('Credit sale posted to customer khata (demo)'); setCart([]) }}>Credit Sale</button>
            <button className="btn primary" disabled={!cart.length} onClick={() => { toast('Cash sale completed · receipt printed (demo)'); setCart([]) }}>Cash Sale</button>
          </div>
        </Card>
      </div>
    </>
  )
}

export function Agriculture() {
  const toast = useToast()
  return (
    <>
      <PageHead title="Agriculture Farms" sub="Green Fields Agriculture — plots, crops, inputs, labour and crop P&L">
        <button className="btn primary" onClick={() => toast('Crop operation entry (demo)')}>+ Operation</button>
      </PageHead>
      <div className="grid g-4 mb">
        <Kpi label="Total land" value="103 acre" />
        <Kpi label="Active crops" value="5" />
        <Kpi label="Season cost" value={fmtK(crops.reduce((s, c) => s + c.cost, 0))} />
        <Kpi label="Expected sale" value={fmtK(crops.reduce((s, c) => s + c.expectedSale, 0))} />
      </div>
      <Card title="Plots & crops" flush>
        <Table
          cols={[
            { label: 'Plot', render: (r) => <b>{r.plot}</b> },
            { label: 'Farm', key: 'farm' },
            { label: 'Crop', key: 'crop' },
            { label: 'Area', key: 'area' },
            { label: 'Sown', key: 'sown' },
            { label: 'Harvest', key: 'harvest' },
            { label: 'Stage', render: (r) => <Badge tone="info">{r.stage}</Badge> },
            { label: 'Cost', num: true, render: (r) => fmtRs(r.cost) },
            { label: 'Expected sale', num: true, render: (r) => (r.expectedSale ? fmtRs(r.expectedSale) : 'Own use (fodder)') },
            { label: 'Est. P/L', num: true, render: (r) => r.expectedSale ? <b style={{ color: '#1f7a4d' }}>{fmtRs(r.expectedSale - r.cost)}</b> : '—' },
          ]}
          rows={crops}
        />
      </Card>
    </>
  )
}

export function Installments() {
  const toast = useToast()
  return (
    <>
      <PageHead title="Installment Business" sub="Agreements, recovery schedule, seasonal plans and overdue control">
        <button className="btn primary" onClick={() => toast('New installment agreement (demo)')}>+ Agreement</button>
      </PageHead>
      <div className="grid g-4 mb">
        <Kpi label="Active agreements" value="214" />
        <Kpi label="Receivable" value="Rs 18.6M" />
        <Kpi label="Recovered this month" value="Rs 2.14M" delta="+7%" />
        <Kpi label="Overdue" value={installments.filter((i) => i.overdue).length + ' customers'} />
      </div>
      <Card flush>
        <Table
          cols={[
            { label: 'Agreement', render: (r) => <span className="mono">{r.id}</span> },
            { label: 'Customer', render: (r) => <b>{r.customer}</b> },
            { label: 'Product / Asset', key: 'product' },
            { label: 'Total', num: true, render: (r) => fmtRs(r.total) },
            { label: 'Advance', num: true, render: (r) => fmtRs(r.advance) },
            { label: 'Installment', num: true, render: (r) => fmtRs(r.per) },
            { label: 'Frequency', key: 'freq' },
            { label: 'Recovery', render: (r) => <div style={{ width: 120 }}><Progress value={(r.paidN / r.n) * 100} tone={r.overdue ? 'danger' : ''} /><span className="muted" style={{ fontSize: 11 }}>{r.paidN} / {r.n} paid</span></div> },
            { label: 'Next due', key: 'next' },
            { label: 'Status', render: (r) => <Badge>{r.overdue ? 'Overdue' : 'Active'}</Badge> },
          ]}
          rows={installments}
        />
      </Card>
    </>
  )
}

export function Arhti() {
  const toast = useToast()
  const sold = arhtiLots.filter((l) => l.profit !== null)
  return (
    <>
      <PageHead title="Arhti / Mandi Trading" sub="Farmer purchase → commodity lots → mandi sale → net profit">
        <button className="btn primary" onClick={() => toast('Arhti purchase entry (demo)')}>+ Purchase Lot</button>
      </PageHead>
      <div className="grid g-4 mb">
        <Kpi label="Open lots" value={arhtiLots.length - sold.length} />
        <Kpi label="Stock (maund)" value={arhtiLots.filter((l) => !l.sell).reduce((s, l) => s + l.maund, 0).toLocaleString()} />
        <Kpi label="Net profit (sold lots)" value={fmtK(sold.reduce((s, l) => s + l.profit, 0))} />
        <Kpi label="Farmer settlements due" value="Rs 1.82M" />
      </div>
      <Card flush>
        <Table
          cols={[
            { label: 'Lot', render: (r) => <span className="mono">{r.lot}</span> },
            { label: 'Commodity', render: (r) => <b>{r.commodity}</b> },
            { label: 'Farmer', key: 'farmer' },
            { label: 'Maund', num: true, key: 'maund' },
            { label: 'Buy rate', num: true, render: (r) => fmtRs(r.buy) },
            { label: 'Sale rate', num: true, render: (r) => (r.sell ? fmtRs(r.sell) : '—') },
            { label: 'Expenses', num: true, render: (r) => fmtRs(r.exp) },
            { label: 'Buyer', key: 'buyer' },
            { label: 'Net profit', num: true, render: (r) => (r.profit !== null ? <b style={{ color: r.profit >= 0 ? '#1f7a4d' : '#c43d3d' }}>{fmtRs(r.profit)}</b> : <Badge tone="info">In stock</Badge>) },
          ]}
          rows={arhtiLots}
        />
      </Card>
    </>
  )
}
