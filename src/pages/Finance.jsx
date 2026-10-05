import { useState } from 'react'
import { PageHead, Card, Kpi, Badge, Table, Tabs, useToast } from '../ui.jsx'
import { trialBalance, vouchers, approvals, fmtRs } from '../data.js'

export function Accounting() {
  const toast = useToast()
  const [tab, setTab] = useState('Trial Balance')
  const dr = trialBalance.reduce((s, r) => s + r.debit, 0)
  const cr = trialBalance.reduce((s, r) => s + r.credit, 0)
  return (
    <>
      <PageHead title="Accounting" sub="Double-entry ledger · vouchers · trial balance · P&L">
        <button className="btn" onClick={() => toast('Excel exported (demo)')}>Export</button>
        <button className="btn primary" onClick={() => toast('Voucher form (demo)')}>+ Voucher</button>
      </PageHead>
      <div className="grid g-4 mb">
        <Kpi label="Cash in hand" value="Rs 1.85M" />
        <Kpi label="Bank balance" value="Rs 6.42M" />
        <Kpi label="Receivables" value="Rs 3.18M" />
        <Kpi label="Payables" value="Rs 2.74M" />
      </div>
      <Card flush>
        <Tabs tabs={['Trial Balance', 'Vouchers', 'Profit & Loss']} value={tab} onChange={setTab} />
        {tab === 'Trial Balance' && (
          <>
            <Table
              cols={[
                { label: 'Code', render: (r) => <span className="mono">{r.code}</span> },
                { label: 'Account', render: (r) => <b>{r.account}</b> },
                { label: 'Debit', num: true, render: (r) => (r.debit ? fmtRs(r.debit) : '') },
                { label: 'Credit', num: true, render: (r) => (r.credit ? fmtRs(r.credit) : '') },
              ]}
              rows={trialBalance}
            />
            <div className="toolbar" style={{ borderTop: '1px solid var(--line)', borderBottom: 0, justifyContent: 'flex-end', gap: 24 }}>
              <span>Total Debit <b>{fmtRs(dr)}</b></span>
              <span>Total Credit <b>{fmtRs(cr)}</b></span>
              <Badge tone={dr === cr ? 'ok' : 'danger'}>{dr === cr ? 'Balanced ✓' : 'Unbalanced'}</Badge>
            </div>
          </>
        )}
        {tab === 'Vouchers' && (
          <Table
            cols={[
              { label: 'Voucher #', render: (r) => <span className="mono">{r.no}</span> },
              { label: 'Type', key: 'type' },
              { label: 'Date', key: 'date' },
              { label: 'Party / Narration', key: 'party' },
              { label: 'Amount', num: true, render: (r) => <b>{fmtRs(r.amount)}</b> },
              { label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
            ]}
            rows={vouchers}
          />
        )}
        {tab === 'Profit & Loss' && (
          <div className="card-body" style={{ maxWidth: 560 }}>
            <div className="stat-line"><span>Sales revenue</span><b>{fmtRs(36100000)}</b></div>
            <div className="stat-line"><span>Cost of sales</span><span>- {fmtRs(22460000)}</span></div>
            <div className="stat-line"><b>Gross profit</b><b>{fmtRs(13640000)}</b></div>
            <div className="stat-line"><span>Feed & fodder</span><span>- {fmtRs(6040000)}</span></div>
            <div className="stat-line"><span>Operating expenses</span><span>- {fmtRs(5397000)}</span></div>
            <div className="stat-line"><b>Net profit</b><span className="big-total">{fmtRs(2203000)}</span></div>
          </div>
        )}
      </Card>
    </>
  )
}

export function Approvals() {
  const toast = useToast()
  const [items, setItems] = useState(approvals)
  const act = (id, msg) => { setItems(items.filter((i) => i.id !== id)); toast(msg) }
  return (
    <>
      <PageHead title="Approval Inbox" sub="Maker-checker workflow: Created → Submitted → Reviewer → Approver → Posted" />
      <Card flush>
        <Table
          empty="All caught up — no pending approvals"
          cols={[
            { label: 'Ref', render: (r) => <span className="mono">{r.id}</span> },
            { label: 'Type', render: (r) => <b>{r.type}</b> },
            { label: 'Detail', key: 'detail' },
            { label: 'Amount', num: true, render: (r) => (r.amount ? fmtRs(r.amount) : '—') },
            { label: 'Submitted by', key: 'by' },
            { label: 'Stage', render: (r) => <Badge>{r.stage}</Badge> },
            { label: '', render: (r) => (
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="btn sm" onClick={() => act(r.id, `${r.id} rejected`)}>Reject</button>
                <button className="btn sm primary" onClick={() => act(r.id, `${r.id} approved & posted`)}>Approve</button>
              </div>
            ) },
          ]}
          rows={items}
        />
      </Card>
    </>
  )
}

const Num = ({ label, value, onChange }) => (
  <div className="share-row" style={{ gridTemplateColumns: '1fr 180px' }}>
    <span>{label}</span>
    <input className="input" type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} />
  </div>
)

export function Zakat() {
  const toast = useToast()
  const [inv, setInv] = useState(4960000)
  const [cash, setCash] = useState(1845000)
  const [bank, setBank] = useState(6420000)
  const [pay, setPay] = useState(2740000)
  const [zr, setZr] = useState(2.5)
  const base = inv + cash + bank - pay

  const [sale, setSale] = useState(3720000)
  const [mill, setMill] = useState(140000)
  const [ur, setUr] = useState(5)
  const [opEx, setOpEx] = useState(2110000)
  const ushrBase = sale - mill
  const ushr = (ushrBase * ur) / 100

  return (
    <>
      <PageHead title="Zakat & Ushr" sub="Initiated manually by authorised Admin · rates configurable · no automatic religious ruling" />
      <div className="grid g-2 mb">
        <Card title="Business Zakat" sub="Zakat Base = Inventory (purchase rate) + Cash + Bank − Actual Payables">
          <Num label="Inventory at purchase rate" value={inv} onChange={setInv} />
          <Num label="Cash in hand" value={cash} onChange={setCash} />
          <Num label="Bank cash" value={bank} onChange={setBank} />
          <Num label="Actual payables" value={pay} onChange={setPay} />
          <Num label="Zakat rate %" value={zr} onChange={setZr} />
          <div className="stat-line" style={{ marginTop: 8 }}><span>Zakat base</span><b>{fmtRs(base)}</b></div>
          <div className="stat-line"><b>Zakat payable</b><span className="big-total">{fmtRs((base * zr) / 100)}</span></div>
          <button className="btn primary" style={{ marginTop: 10 }} onClick={() => toast('Zakat calculation submitted for approval (demo)')}>Submit for approval</button>
        </Card>
        <Card title="Agriculture Ushr — Rice (Paddy), Block B" sub="Ushr Base = Crop Sale − one optional Mill / Transport expense">
          <Num label="Total crop sale amount" value={sale} onChange={setSale} />
          <Num label="Mill / transport expense" value={mill} onChange={setMill} />
          <Num label="Ushr rate %" value={ur} onChange={setUr} />
          <Num label="Actual farm operating expenses" value={opEx} onChange={setOpEx} />
          <div className="stat-line" style={{ marginTop: 8 }}><span>Ushr base</span><b>{fmtRs(ushrBase)}</b></div>
          <div className="stat-line"><span>Ushr amount</span><b style={{ color: '#b7791f' }}>{fmtRs(ushr)}</b></div>
          <div className="stat-line"><b>Net distributable profit</b><span className="big-total">{fmtRs(ushrBase - ushr - opEx)}</span></div>
        </Card>
      </div>
      <Card title="Zakat accounts" flush>
        <Table
          cols={[
            { label: 'Account', render: (r) => <b>{r[0]}</b> },
            { label: 'Opening', num: true, render: (r) => fmtRs(r[1]) },
            { label: 'Generated', num: true, render: (r) => fmtRs(r[2]) },
            { label: 'Paid', num: true, render: (r) => fmtRs(r[3]) },
            { label: 'Remaining', num: true, render: (r) => <b>{fmtRs(r[1] + r[2] - r[3])}</b> },
          ]}
          rows={[
            ['Business Zakat — Shahzad Livestock', 120000, 310000, 180000],
            ['Business Zakat — Kisan Pesticide', 40000, 96000, 96000],
            ['Agriculture Ushr — Green Fields', 0, 186000, 60000],
            ['Livestock Trading Zakat', 15000, 42000, 30000],
          ]}
        />
      </Card>
    </>
  )
}
