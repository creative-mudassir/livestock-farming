import { useMemo, useState } from 'react'
import { X, Printer } from 'lucide-react'
import { PageHead, Card, Kpi, Badge, Table, Tabs, Drawer, useToast } from '../ui.jsx'
import { farmers, animals, investors, partners, ledgerFor, fmtRs, fmtK } from '../data.js'

export function Farmers() {
  const toast = useToast()
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(null)
  const rows = farmers.filter((f) => [f.id, f.name, f.cnic, f.village].join(' ').toLowerCase().includes(q.toLowerCase()))
  return (
    <>
      <PageHead title="Farmers & Khata" sub="Digital farmer profile, Zati Khata (personal ledger) and Mushtarka Khata (joint account)">
        <button className="btn primary" onClick={() => toast('Farmer registration form (demo)')}>+ Add Farmer</button>
      </PageHead>
      <div className="grid g-4 mb">
        <Kpi label="Registered farmers" value="312" delta="+9" />
        <Kpi label="Partner farmers" value="184" />
        <Kpi label="Total jama" value={fmtK(farmers.reduce((s, f) => s + f.jama, 0))} />
        <Kpi label="Total udhar" value={fmtK(farmers.reduce((s, f) => s + f.udhar, 0))} />
      </div>
      <Card flush>
        <div className="toolbar">
          <input className="input" placeholder="Search name, CNIC, village…" value={q} onChange={(e) => setQ(e.target.value)} style={{ width: 280 }} />
          <span className="muted" style={{ marginLeft: 'auto', fontSize: 12 }}>Click a farmer to open profile & khata</span>
        </div>
        <Table
          onRow={setSel}
          cols={[
            { label: 'ID', render: (r) => <span className="mono">{r.id}</span> },
            { label: 'Name', render: (r) => <b>{r.name}</b> },
            { label: 'CNIC', render: (r) => <span className="mono">{r.cnic}</span> },
            { label: 'Mobile', key: 'phone' },
            { label: 'Village', key: 'village' },
            { label: 'Animals', key: 'animals', num: true },
            { label: 'Share', key: 'share' },
            { label: 'Balance', num: true, render: (r) => <b style={{ color: r.balance >= 0 ? '#1f7a4d' : '#c43d3d' }}>{fmtRs(r.balance)}</b> },
          ]}
          rows={rows}
        />
      </Card>
      {sel && <FarmerProfile f={sel} onClose={() => setSel(null)} />}
    </>
  )
}

function FarmerProfile({ f, onClose }) {
  const toast = useToast()
  const [tab, setTab] = useState('Profile')
  const ledger = useMemo(() => ledgerFor(f), [f])
  const own = animals.filter((a) => a.farmerId === f.id)
  const jointIncome = 845000, jointExp = 312000
  return (
    <Drawer onClose={onClose}>
      <div className="drawer-head">
        <div className="photo">👨‍🌾</div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 19 }}>{f.name}</h2>
          <div className="muted" style={{ fontSize: 12.5 }}>{f.id} · s/o {f.father} · {f.village}</div>
        </div>
        <button className="btn sm" onClick={() => toast('Statement sent to printer (demo)')}><Printer size={14} /> Statement</button>
        <button className="icon-btn" onClick={onClose}><X size={18} /></button>
      </div>
      <Tabs tabs={['Profile', 'Zati Khata', 'Mushtarka Khata', 'Animals']} value={tab} onChange={setTab} />
      <div className="drawer-body">
        {tab === 'Profile' && (
          <>
            <Card title="Personal details" className="mb">
              <div className="kv">
                <div><span>CNIC</span><b className="mono">{f.cnic}</b></div>
                <div><span>Mobile</span><b>{f.phone}</b></div>
                <div><span>Joined</span><b>{f.joined}</b></div>
                <div><span>Address</span><b>{f.village}</b></div>
                <div><span>GPS</span><b>30.05°N, 70.63°E</b></div>
                <div><span>Partnership</span><b>{f.share}</b></div>
              </div>
            </Card>
            <Card title="Guarantor & agreement">
              <div className="kv">
                <div><span>Guarantor</span><b>{f.guarantor}</b></div>
                <div><span>Guarantor CNIC</span><b className="mono">32104-5512398-1</b></div>
                <div><span>Agreement</span><b>v3 · signed {f.joined}</b></div>
              </div>
            </Card>
          </>
        )}
        {tab === 'Zati Khata' && (
          <Card title="Personal Ledger" sub="Jama / Udhar with running balance" flush>
            <Table
              cols={[
                { label: 'Date', key: 'date' },
                { label: 'Description', key: 'desc' },
                { label: 'Udhar (Dr)', num: true, render: (r) => (r.debit ? fmtRs(r.debit) : '') },
                { label: 'Jama (Cr)', num: true, render: (r) => (r.credit ? fmtRs(r.credit) : '') },
                { label: 'Balance', num: true, render: (r) => <b style={{ color: r.balance >= 0 ? '#1f7a4d' : '#c43d3d' }}>{fmtRs(r.balance)}</b> },
              ]}
              rows={ledger}
            />
          </Card>
        )}
        {tab === 'Mushtarka Khata' && (
          <Card title="Company – Farmer Joint Account">
            <div className="stat-line"><span>Joint income (milk, sales, newborn value)</span><b>{fmtRs(jointIncome)}</b></div>
            <div className="stat-line"><span>Animal expenses (feed, medicine, vet, transport)</span><b>{fmtRs(jointExp)}</b></div>
            <div className="stat-line"><span>Net joint profit</span><span className="big-total">{fmtRs(jointIncome - jointExp)}</span></div>
            <div className="grid g-2" style={{ marginTop: 14 }}>
              <div className="type-tile"><div><div className="muted" style={{ fontSize: 12 }}>Company share 50%</div><b>{fmtRs((jointIncome - jointExp) / 2)}</b></div></div>
              <div className="type-tile"><div><div className="muted" style={{ fontSize: 12 }}>Farmer share 50%</div><b>{fmtRs((jointIncome - jointExp) / 2)}</b></div></div>
            </div>
          </Card>
        )}
        {tab === 'Animals' && (
          <Card flush title={`Linked animals (${own.length || f.animals})`}>
            <Table
              cols={[{ label: 'ID', render: (r) => <b>{r.id}</b> }, { label: 'Type', key: 'type' }, { label: 'Breed', key: 'breed' }, { label: 'Status', render: (r) => <Badge>{r.status}</Badge> }]}
              rows={own.length ? own : animals.slice(0, 5)}
            />
          </Card>
        )}
      </div>
    </Drawer>
  )
}

const PRESETS = {
  'Company 100%': [['Company', 100]],
  'Company + Farmer (50/50)': [['Company', 50], ['Farmer', 50]],
  'Company + Investor + Farmer (25/25/50)': [['Company', 25], ['Investor', 25], ['Farmer', 50]],
  'Multiple investors & partners': [['Company', 20], ['Investor A', 15], ['Investor B', 15], ['Partner Farmer', 35], ['Partner Shop', 15]],
}

export function Investors() {
  const [tab, setTab] = useState('Investors')
  return (
    <>
      <PageHead title="Investors & Partners" sub="Capital, shares, profit, payments and settlements" />
      <div className="grid g-4 mb">
        <Kpi label="Investor capital" value={fmtK(investors.reduce((s, i) => s + i.capital, 0))} delta="+6.5%" />
        <Kpi label="Profit allocated (YTD)" value={fmtK(investors.reduce((s, i) => s + i.profit, 0))} />
        <Kpi label="Paid to investors" value={fmtK(investors.reduce((s, i) => s + i.paid, 0))} />
        <Kpi label="Settlement remaining" value={fmtK(investors.reduce((s, i) => s + i.remaining, 0))} />
      </div>
      <Card flush className="mb">
        <Tabs tabs={['Investors', 'Partners']} value={tab} onChange={setTab} />
        {tab === 'Investors' ? (
          <Table
            cols={[
              { label: 'ID', render: (r) => <span className="mono">{r.id}</span> },
              { label: 'Investor', render: (r) => <b>{r.name}</b> },
              { label: 'Business', key: 'business' },
              { label: 'Capital', num: true, render: (r) => fmtRs(r.capital) },
              { label: 'Share', num: true, render: (r) => r.share + '%' },
              { label: 'Profit', num: true, render: (r) => fmtRs(r.profit) },
              { label: 'Paid', num: true, render: (r) => fmtRs(r.paid) },
              { label: 'Remaining', num: true, render: (r) => <b>{fmtRs(r.remaining)}</b> },
            ]}
            rows={investors}
          />
        ) : (
          <Table
            cols={[
              { label: 'ID', render: (r) => <span className="mono">{r.id}</span> },
              { label: 'Partner', render: (r) => <b>{r.name}</b> },
              { label: 'Type', key: 'ptype' },
              { label: 'Unit', key: 'unit' },
              { label: 'Share', num: true, render: (r) => r.share + '%' },
              { label: 'Profit (YTD)', num: true, render: (r) => fmtRs(r.profit) },
              { label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
            ]}
            rows={partners}
          />
        )}
      </Card>
      <ProfitCalculator />
    </>
  )
}

function ProfitCalculator() {
  const toast = useToast()
  const [preset, setPreset] = useState('Company + Investor + Farmer (25/25/50)')
  const [rows, setRows] = useState(PRESETS[preset])
  const [profit, setProfit] = useState(1200000)
  const total = rows.reduce((s, r) => s + Number(r[1] || 0), 0)
  const ok = total === 100
  const choose = (p) => { setPreset(p); setRows(PRESETS[p]) }
  return (
    <Card title="Profit Sharing Formula" sub="Configurable percentages with compulsory 100% check">
      <div className="toolbar" style={{ padding: '0 0 12px', borderBottom: 0 }}>
        <select className="select" value={preset} onChange={(e) => choose(e.target.value)}>
          {Object.keys(PRESETS).map((p) => <option key={p}>{p}</option>)}
        </select>
        <span className="muted">Net profit to distribute:</span>
        <input className="input" type="number" value={profit} onChange={(e) => setProfit(Number(e.target.value))} style={{ width: 150 }} />
      </div>
      {rows.map((r, i) => (
        <div className="share-row" key={i}>
          <b>{r[0]}</b>
          <input
            className="input"
            type="number"
            value={r[1]}
            onChange={(e) => setRows(rows.map((x, j) => (j === i ? [x[0], Number(e.target.value)] : x)))}
          />
          <span className="num strong" style={{ textAlign: 'right' }}>{fmtRs((profit * r[1]) / 100)}</span>
        </div>
      ))}
      <div className="stat-line" style={{ marginTop: 8 }}>
        <span>Total</span>
        <Badge tone={ok ? 'ok' : 'danger'}>{total}% {ok ? '✓ valid' : '— must equal 100%'}</Badge>
      </div>
      <button className="btn primary" disabled={!ok} style={{ marginTop: 10, opacity: ok ? 1 : 0.5 }} onClick={() => toast('Formula saved & sent for approval (demo)')}>
        Save formula
      </button>
    </Card>
  )
}
