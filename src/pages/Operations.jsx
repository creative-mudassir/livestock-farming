import { useRef, useState, useEffect } from 'react'
import { FileText, FileSpreadsheet, Send } from 'lucide-react'
import { PageHead, Card, Kpi, Badge, Table, Tabs, Progress, useToast } from '../ui.jsx'
import { fieldVisits, officers, alerts, animalTypes, monthly, fmtRs, fmtK } from '../data.js'

export function Field() {
  return (
    <>
      <PageHead title="Field Officers & GPS" sub="Live location, geofenced attendance, field evidence and offline sync" />
      <div className="grid g-4 mb">
        <Kpi label="Officers on field" value="3 / 5" />
        <Kpi label="Visits today" value="25" delta="+4" />
        <Kpi label="Evidence captured" value="61 files" />
        <Kpi label="Offline sync queue" value="5 records" />
      </div>
      <div className="grid g-21 mb">
        <Card title="Live map" sub="DG Khan division · positions refresh every 5 min">
          <div className="map">
            <div className="river" />
            <span className="town" style={{ left: '53%', top: '20%' }}>TAUNSA</span>
            <span className="town" style={{ left: '50%', top: '46%' }}>DERA GHAZI KHAN</span>
            <span className="town" style={{ left: '34%', top: '70%' }}>JAMPUR</span>
            <span className="town" style={{ left: '22%', top: '93%' }}>RAJANPUR</span>
            <span className="town" style={{ left: '76%', top: '42%' }}>MUZAFFARGARH</span>
            {officers.map((o) => (
              <div key={o.name} className={'pin ' + (o.status === 'On field' ? '' : 'off')} style={{ left: o.x + '%', top: o.y + '%' }}>
                <div className="dot" />
                <div className="lbl">{o.name}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Officers" flush>
          <div className="list">
            {officers.map((o) => (
              <div key={o.name} className="list-item" style={{ alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div className="ttl">{o.name}</div>
                  <div className="sub">{o.area} · in {o.checkIn} · {o.visits} visits</div>
                  <div style={{ width: 120, marginTop: 6 }}><Progress value={o.battery} tone={o.battery < 35 ? 'danger' : ''} /></div>
                </div>
                <Badge>{o.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card title="Today's field activity" sub="Every entry carries GPS + date + time + user + photo/video evidence" flush>
        <Table
          cols={[
            { label: 'Time', key: 'time' },
            { label: 'Officer', render: (r) => <b>{r.officer}</b> },
            { label: 'Record', key: 'target' },
            { label: 'Activity', key: 'activity' },
            { label: 'GPS', render: (r) => <span className="mono">{r.lat.toFixed(4)}, {r.lng.toFixed(4)}</span> },
            { label: 'Media', num: true, render: (r) => `📷 ${r.media}` },
            { label: 'Sync', render: (r) => <Badge>{r.sync}</Badge> },
          ]}
          rows={fieldVisits}
        />
      </Card>
    </>
  )
}

export function Alerts() {
  const [cat, setCat] = useState('All')
  const rows = alerts.filter((a) => cat === 'All' || a.cat === cat)
  return (
    <>
      <PageHead title="Alert Center" sub="Alert periods configurable: 7 / 15 / 30 / 60 / 90 days or custom" />
      <Card flush>
        <Tabs tabs={['All', 'Livestock', 'Stock', 'Finance', 'Operations']} value={cat} onChange={setCat} />
        <div className="list">
          {rows.map((a, i) => (
            <div key={i} className="list-item">
              <span className={'sev ' + a.level} />
              <div>
                <div className="ttl">{a.title}</div>
                <div className="sub">{a.cat} · {a.sub}</div>
              </div>
              <div className="right">{a.time}</div>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}

const REPORTS = [
  ['Livestock', 'Complete livestock report', 'Animals, types, pregnancy, births, deaths, milk, P&L'],
  ['Livestock', 'Pregnancy & breeding report', 'Attention list, repeat breeding, delivery schedule'],
  ['Livestock', 'Milk production report', 'Animal-wise, farm-wise, daily / monthly'],
  ['Farmers', 'Farmer Zati Khata statement', 'Date-range ledger with running balance'],
  ['Farmers', 'Mushtarka Khata report', 'Joint income, expenses and shares'],
  ['Partnership', 'Investor statement', 'Capital, profit, withdrawals, remaining'],
  ['Partnership', 'Profit sharing & settlement', 'Company / investor / partner shares'],
  ['Business', 'Business P&L', 'Income, expenses, profit by business'],
  ['Business', 'Branch performance', 'Sales, purchase, stock, expenses by branch'],
  ['Stock', 'Expiry & low stock', 'Expired, expiring soon, below minimum'],
  ['Finance', 'Trial balance & ledger', 'Double-entry accounts'],
  ['Finance', 'Receivable aging', 'Current, 1-30, 31-60, 61-90, 90+ days'],
]

export function Reports() {
  const toast = useToast()
  return (
    <>
      <PageHead title="Reports" sub="Daily, weekly, monthly and custom ranges · view, PDF, Excel, print">
        <select className="select"><option>This month</option><option>Last month</option><option>This year</option><option>Custom range…</option></select>
        <select className="select"><option>All businesses</option><option>Shahzad Livestock</option><option>Green Fields Agriculture</option></select>
      </PageHead>
      <div className="grid g-3">
        {REPORTS.map(([cat, name, desc]) => (
          <div key={name} className="card kpi">
            <Badge tone="gray">{cat}</Badge>
            <div style={{ fontWeight: 600, marginTop: 10 }}>{name}</div>
            <div className="muted" style={{ fontSize: 12.5, marginTop: 4, minHeight: 34 }}>{desc}</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
              <button className="btn sm" onClick={() => toast(`${name} — PDF generated (demo)`)}><FileText size={13} /> PDF</button>
              <button className="btn sm" onClick={() => toast(`${name} — Excel generated (demo)`)}><FileSpreadsheet size={13} /> Excel</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

const totalAnimals = animalTypes.reduce((s, a) => s + a.count, 0)
const last = monthly[monthly.length - 1]
const ANSWERS = [
  [/animal|janwar|janwaron/i, `Aap ke total ${totalAnimals.toLocaleString()} animals hain:\n• Buffalo: 486 (112 pregnant)\n• Cow: 392 (87 pregnant)\n• Goat: 371\n• Sheep: 237\n\n3 animals pregnancy attention list par hain (B-102, C-117, B-131).`],
  [/sale|sales|bikri/i, `Is month ki total sales ${fmtK(last.sales)} hain, expenses ${fmtK(last.expenses)}, aur net profit ${fmtK(last.profit)}.\nSab se zyada revenue: Shahzad Livestock (Rs 8.45M YTD).`],
  [/milk|doodh/i, 'Aaj 7,612 litres doodh collect hua (buffalo 3,210 L, cow 4,290 L, goat 112 L). Average buffalo fat 6.8%. Farmers ko payable Rs 1.37M.'],
  [/stock|expir|expiry/i, '2 items 30 din mein expire ho rahe hain:\n• Paracetamol 500mg — 6 days (120 boxes)\n• Glyphosate 41% — 15 days\n\n5 items minimum level se neeche hain, including DAP 50kg (44 / 80).'],
  [/investor|profit share|munafa/i, `10 active investors, total capital Rs 31.4M. Q3 settlement due: 6 investors, Rs 1.24M. Default formula: Company 25% / Investor 25% / Farmer 50%.`],
  [/zakat|ushr/i, 'Current Business Zakat base (Shahzad Group) Rs 10.49M, Zakat @2.5% = Rs 262,125. Ushr for Paddy (Block B) Rs 179,000 @5%.'],
]

export function Assistant() {
  const [msgs, setMsgs] = useState([{ from: 'bot', text: 'Assalam o Alaikum! Main aap ka AI assistant hoon. English, Urdu ya Roman Urdu mein poochain — e.g. "Mere total animals kitne hain?"' }])
  const [text, setText] = useState('')
  const box = useRef(null)
  useEffect(() => { box.current && (box.current.scrollTop = box.current.scrollHeight) }, [msgs])
  const ask = (q) => {
    if (!q.trim()) return
    const hit = ANSWERS.find(([re]) => re.test(q))
    const reply = hit ? hit[1] : 'Demo mode mein main animals, sales, milk, stock, investors aur zakat ke sawalon ke jawab de sakta hoon. Live system mein har report ka data database se aayega (RBAC ke mutabiq).'
    setMsgs((m) => [...m, { from: 'user', text: q }, { from: 'bot', text: reply }])
    setText('')
  }
  return (
    <>
      <PageHead title="AI Assistant" sub="Available to Super Admin / Admin only · answers from authorised data, respecting permissions" />
      <Card flush>
        <div className="chat">
          <div className="chat-msgs" ref={box}>
            {msgs.map((m, i) => <div key={i} className={'msg ' + m.from}>{m.text}</div>)}
          </div>
          <div className="chips">
            {['Mere total animals kitne hain?', 'Is month ki sales kitni hain?', 'Aaj doodh kitna aya?', 'Kaun sa stock expire ho raha hai?', 'Investor profit status', 'Zakat kitni banti hai?'].map((c) => (
              <button key={c} className="chip" onClick={() => ask(c)}>{c}</button>
            ))}
          </div>
          <form className="chat-input" onSubmit={(e) => { e.preventDefault(); ask(text) }}>
            <input className="input" style={{ flex: 1 }} placeholder="Type your question…" value={text} onChange={(e) => setText(e.target.value)} />
            <button className="btn primary" type="submit"><Send size={15} /> Send</button>
          </form>
        </div>
      </Card>
    </>
  )
}
