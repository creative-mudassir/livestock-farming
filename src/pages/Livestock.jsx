import { useMemo, useState } from 'react'
import { X, QrCode, ArrowRightLeft, Camera } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'
import { PageHead, Card, Kpi, Badge, Table, Tabs, Drawer, useToast } from '../ui.jsx'
import { animals, animalTypes, pregnancyWatch, deliveries, breedingLog, milkEntries, milkWeek, fmtRs } from '../data.js'

const icon = { Buffalo: '🐃', Cow: '🐄', Goat: '🐐', Sheep: '🐑' }

export function Animals() {
  const toast = useToast()
  const [q, setQ] = useState('')
  const [type, setType] = useState('All')
  const [status, setStatus] = useState('All')
  const [sel, setSel] = useState(null)

  const rows = useMemo(
    () =>
      animals.filter(
        (a) =>
          (type === 'All' || a.type === type) &&
          (status === 'All' || a.status === status) &&
          (q === '' || [a.id, a.tag, a.farmer, a.breed].join(' ').toLowerCase().includes(q.toLowerCase())),
      ),
    [q, type, status],
  )

  return (
    <>
      <PageHead title="Animal Registry" sub="Complete profile, lifecycle and history for every animal">
        <button className="btn" onClick={() => toast('QR scanner opened (mobile app feature)')}><QrCode size={15} /> Scan QR / Tag</button>
        <button className="btn primary" onClick={() => toast('New animal form (demo)')}>+ Register Animal</button>
      </PageHead>
      <div className="grid g-4 mb">
        {animalTypes.map((a) => (
          <Kpi key={a.type} label={`${a.icon}  ${a.type}`} value={a.count} />
        ))}
      </div>
      <Card flush>
        <div className="toolbar">
          <input className="input" placeholder="Search ID, tag, farmer, breed…" value={q} onChange={(e) => setQ(e.target.value)} style={{ width: 260 }} />
          <select className="select" value={type} onChange={(e) => setType(e.target.value)}>
            {['All', 'Buffalo', 'Cow', 'Goat', 'Sheep'].map((t) => <option key={t}>{t}</option>)}
          </select>
          <select className="select" value={status} onChange={(e) => setStatus(e.target.value)}>
            {['All', 'Active', 'Pregnant', 'Breeding', 'Under Treatment', 'Sold', 'Transferred'].map((t) => <option key={t}>{t}</option>)}
          </select>
          <span className="muted" style={{ marginLeft: 'auto', fontSize: 12 }}>{rows.length} animals shown · click a row to open profile</span>
        </div>
        <Table
          onRow={setSel}
          cols={[
            { label: 'Animal ID', render: (r) => <span><span style={{ marginRight: 6 }}>{icon[r.type]}</span><b>{r.id}</b></span> },
            { label: 'Ear Tag', render: (r) => <span className="mono">{r.tag}</span> },
            { label: 'Breed', key: 'breed' },
            { label: 'Gender', key: 'gender' },
            { label: 'Age', key: 'age' },
            { label: 'Farmer', key: 'farmer' },
            { label: 'Farm', key: 'farm', cls: 'muted' },
            { label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
            { label: 'Health', render: (r) => <Badge>{r.health}</Badge> },
            { label: 'P / L', num: true, render: (r) => { const p = r.income - r.cost - r.expenses; return <b style={{ color: p >= 0 ? '#1f7a4d' : '#c43d3d' }}>{fmtRs(p)}</b> } },
          ]}
          rows={rows}
        />
      </Card>
      {sel && <AnimalProfile a={sel} onClose={() => setSel(null)} />}
    </>
  )
}

function AnimalProfile({ a, onClose }) {
  const toast = useToast()
  const [tab, setTab] = useState('Overview')
  const profit = a.income - a.cost - a.expenses
  const female = a.gender === 'Female'
  const life = [
    ['Purchased', a.purchaseDate, `From local mandi · ${fmtRs(a.cost)}`],
    ['Assigned to farmer', a.purchaseDate, `${a.farmer} (${a.farmerId}) · 50/50 partnership`],
    ['Vaccinated — FMD', '2026-03-12', 'Dr. Farooq · Batch FM-2690'],
    ...(female ? [
      ['Breeding — AI service', '2026-05-02', 'Semen: Nili-Ravi bull NR-77 · FO Kashif Sheikh'],
      ['Pregnancy confirmed', '2026-07-10', 'Ultrasound · expected delivery 2027-02-08'],
    ] : []),
    ['Moved', '2026-08-01', 'Taunsa Dairy Farm → ' + a.farm + ' · reason: grazing'],
    ['Health check', '2026-09-20', 'Healthy · weight recorded · 2 photos with GPS'],
  ]
  return (
    <Drawer onClose={onClose}>
      <div className="drawer-head">
        <div className="photo">{icon[a.type]}</div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 19 }}>{a.id} <span className="muted" style={{ fontWeight: 400, fontSize: 14 }}>· {a.breed} {a.type}</span></h2>
          <div style={{ marginTop: 6, display: 'flex', gap: 6 }}>
            <Badge>{a.status}</Badge><Badge>{a.health}</Badge><Badge tone="gray">{a.tag}</Badge>
          </div>
        </div>
        <button className="btn sm" onClick={() => toast('Transfer wizard: farmer → farmer / farm → farm (demo)')}><ArrowRightLeft size={14} /> Transfer</button>
        <button className="icon-btn" onClick={onClose}><X size={18} /></button>
      </div>
      <Tabs tabs={['Overview', 'Lifecycle', 'Milk', 'Profit / Loss', 'Media']} value={tab} onChange={setTab} />
      <div className="drawer-body">
        {tab === 'Overview' && (
          <Card>
            <div className="kv">
              <div><span>Animal type</span><b>{a.type}</b></div>
              <div><span>Breed</span><b>{a.breed}</b></div>
              <div><span>Gender</span><b>{a.gender}</b></div>
              <div><span>Age</span><b>{a.age}</b></div>
              <div><span>Mother ID</span><b>{a.mother}</b></div>
              <div><span>Father ID</span><b>{a.father}</b></div>
              <div><span>Owner / Farmer</span><b>{a.farmer}</b></div>
              <div><span>Farm</span><b>{a.farm}</b></div>
              <div><span>Business</span><b>Shahzad Livestock</b></div>
              <div><span>Purchase date</span><b>{a.purchaseDate}</b></div>
              <div><span>Purchase cost</span><b>{fmtRs(a.cost)}</b></div>
              <div><span>Breeding status</span><b>{female ? (a.status === 'Pregnant' ? 'Pregnant' : 'Open') : 'N/A'}</b></div>
            </div>
          </Card>
        )}
        {tab === 'Lifecycle' && (
          <Card title="Complete History" sub="Purchase → Ownership → Breeding → Pregnancy → Health → Movement">
            <div className="timeline">
              {life.map(([t, d, s], i) => (
                <div key={i} className="tl-item"><b>{t}</b> <span className="muted" style={{ fontSize: 12 }}>· {d}</span><div>{s}</div></div>
              ))}
            </div>
          </Card>
        )}
        {tab === 'Milk' && (
          <Card title="Milk record (last 7 days)">
            {a.milk === 0 ? <p className="muted">No milk production recorded for this animal.</p> : (
              <Table
                cols={[{ label: 'Day', key: 'day' }, { label: 'Morning (L)', key: 'm', num: true }, { label: 'Evening (L)', key: 'e', num: true }, { label: 'Total', key: 't', num: true }]}
                rows={milkWeek.map((d, i) => { const m = +(a.milk * 0.55 + (i % 3) * 0.2).toFixed(1); const e = +(a.milk * 0.45 - (i % 2) * 0.2).toFixed(1); return { day: d.day, m, e, t: (m + e).toFixed(1) } })}
              />
            )}
          </Card>
        )}
        {tab === 'Profit / Loss' && (
          <Card title="Animal-wise Profit / Loss" sub="Analysis view — calculated automatically">
            <div className="stat-line"><span>Purchase cost</span><b>{fmtRs(a.cost)}</b></div>
            <div className="stat-line"><span>Feed</span><span>{fmtRs(a.expenses * 0.62)}</span></div>
            <div className="stat-line"><span>Medicine & vaccination</span><span>{fmtRs(a.expenses * 0.21)}</span></div>
            <div className="stat-line"><span>Veterinary, transport & labour</span><span>{fmtRs(a.expenses * 0.17)}</span></div>
            <div className="stat-line"><span>Income (milk + sale + newborn value)</span><b style={{ color: '#1f7a4d' }}>{fmtRs(a.income)}</b></div>
            <div className="stat-line"><span><b>Net Profit / Loss</b></span><span className="big-total" style={{ color: profit >= 0 ? '#1f7a4d' : '#c43d3d' }}>{fmtRs(profit)}</span></div>
            <div className="grid g-2" style={{ marginTop: 12 }}>
              <div className="type-tile"><div><div className="muted" style={{ fontSize: 12 }}>Company share (50%)</div><b>{fmtRs(Math.max(0, profit) / 2)}</b></div></div>
              <div className="type-tile"><div><div className="muted" style={{ fontSize: 12 }}>Farmer share (50%)</div><b>{fmtRs(Math.max(0, profit) / 2)}</b></div></div>
            </div>
          </Card>
        )}
        {tab === 'Media' && (
          <Card title="Photos, videos & documents" sub="Each captured with GPS, date, time and user" right={<button className="btn sm" onClick={() => toast('In-app camera opens on mobile')}><Camera size={14} /> Capture</button>}>
            <div className="grid g-3">
              {['Main photo', 'Ear tag', 'Side view', 'Vet visit', 'Purchase receipt', 'Agreement.pdf'].map((m, i) => (
                <div key={m} className="type-tile" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <div style={{ width: '100%', height: 80, borderRadius: 8, background: '#eef3ef', display: 'grid', placeItems: 'center', fontSize: 28 }}>{i < 4 ? icon[a.type] : '📄'}</div>
                  <b style={{ fontSize: 13 }}>{m}</b>
                  <span className="muted" style={{ fontSize: 11 }}>30.05°N 70.63°E · Sep {10 + i}</span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </Drawer>
  )
}

export function Breeding() {
  const toast = useToast()
  return (
    <>
      <PageHead title="Breeding & Pregnancy" sub="Reproductive monitoring with configurable attention alerts">
        <button className="btn primary" onClick={() => toast('Breeding entry form (demo)')}>+ Breeding Entry</button>
      </PageHead>
      <div className="grid g-4 mb">
        <Kpi label="Pregnant animals" value="301" delta="+14" />
        <Kpi label="Attention required (>90 days)" value="3" />
        <Kpi label="Deliveries next 30 days" value="27" />
        <Kpi label="Newborns this month" value="18" delta="+5" />
      </div>
      <div className="grid g-2 mb">
        <Card title="Pregnancy Attention List" sub="Alert threshold: 90 days (changeable by Admin)" flush>
          <Table
            cols={[
              { label: 'Animal', render: (r) => <b>{r.id}</b> },
              { label: 'Type', key: 'type' },
              { label: 'Farmer', key: 'farmer' },
              { label: 'Last breeding', key: 'lastBreeding' },
              { label: 'Days', num: true, render: (r) => <b style={{ color: r.days >= 90 ? '#c43d3d' : '#b7791f' }}>{r.days}</b> },
              { label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
            ]}
            rows={pregnancyWatch}
          />
        </Card>
        <Card title="Delivery Schedule" flush>
          <Table
            cols={[
              { label: 'Animal', render: (r) => <b>{r.id}</b> },
              { label: 'Farmer', key: 'farmer' },
              { label: 'Expected', key: 'expected' },
              { label: 'In', num: true, render: (r) => (r.days < 0 ? `${-r.days}d late` : `${r.days}d`) },
              { label: 'State', render: (r) => <Badge>{r.state}</Badge> },
            ]}
            rows={deliveries}
          />
        </Card>
      </div>
      <Card title="Breeding Log" sub="Heat, service, AI, pregnancy test, delivery" flush>
        <Table
          cols={[
            { label: 'Date', key: 'date' },
            { label: 'Animal', render: (r) => <b>{r.id}</b> },
            { label: 'Event', key: 'event' },
            { label: 'Recorded by', key: 'by' },
            { label: 'Result', render: (r) => <Badge tone={r.result.includes('Confirmed') || r.result.includes('created') ? 'ok' : r.result === 'Negative' ? 'danger' : 'info'}>{r.result}</Badge> },
          ]}
          rows={breedingLog}
        />
      </Card>
    </>
  )
}

export function MilkPage() {
  const toast = useToast()
  const total = milkEntries.reduce((s, m) => s + m.total, 0)
  const litres = milkEntries.reduce((s, m) => s + m.morning + m.evening, 0)
  return (
    <>
      <PageHead title="Milk Hisab" sub="Morning / evening entries with Fat %, rate and automatic farmer-account posting">
        <button className="btn" onClick={() => toast('Excel exported (demo)')}>Export Excel</button>
        <button className="btn primary" onClick={() => toast('Milk entry form (demo)')}>+ Milk Entry</button>
      </PageHead>
      <div className="grid g-4 mb">
        <Kpi label="Today's collection" value="7,612 L" delta="+3.2%" />
        <Kpi label="Avg buffalo fat %" value="6.8%" />
        <Kpi label="Milk income (Oct)" value="Rs 6.42M" delta="+9.1%" />
        <Kpi label="Payable to farmers" value="Rs 1.37M" />
      </div>
      <div className="grid g-12 mb">
        <Card title="Weekly production (litres)">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={milkWeek}>
              <CartesianGrid stroke="#eef1ee" vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} width={40} />
              <Tooltip />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Bar isAnimationActive={false} dataKey="buffalo" name="Buffalo" fill="#1f7a4d" radius={[3, 3, 0, 0]} />
              <Bar isAnimationActive={false} dataKey="cow" name="Cow" fill="#2b6cb0" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card title="Today's entries" sub={`${litres.toFixed(1)} L · ${fmtRs(total)}`} flush>
          <Table
            cols={[
              { label: 'Animal', render: (r) => <b>{r.animal}</b> },
              { label: 'Farmer', key: 'farmer' },
              { label: 'Morning', num: true, render: (r) => r.morning + ' L' },
              { label: 'Evening', num: true, render: (r) => r.evening + ' L' },
              { label: 'Fat %', num: true, key: 'fat' },
              { label: 'Rate', num: true, render: (r) => fmtRs(r.rate) },
              { label: 'Amount', num: true, render: (r) => <b>{fmtRs(r.total)}</b> },
            ]}
            rows={milkEntries}
          />
        </Card>
      </div>
    </>
  )
}
