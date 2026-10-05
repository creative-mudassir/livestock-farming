import { useState } from 'react'
import { PageHead, Card, Badge, Table, Tabs, useToast } from '../ui.jsx'
import { users, permissionMatrix } from '../data.js'

export function UsersRoles() {
  const toast = useToast()
  const [tab, setTab] = useState('Users')
  return (
    <>
      <PageHead title="Users & Roles" sub="Role-based access control · business-wise, branch-wise and module-wise">
        <button className="btn primary" onClick={() => toast('Invite user form (demo)')}>+ Add User</button>
      </PageHead>
      <Card flush>
        <Tabs tabs={['Users', 'Permission Matrix']} value={tab} onChange={setTab} />
        {tab === 'Users' ? (
          <Table
            cols={[
              { label: 'Name', render: (r) => <b>{r.name}</b> },
              { label: 'Role', render: (r) => <Badge tone="info">{r.role}</Badge> },
              { label: 'Scope', key: 'scope' },
              { label: 'Last active', key: 'last', cls: 'muted' },
              { label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
            ]}
            rows={users}
          />
        ) : (
          <Table
            cols={['Role', 'View Data', 'Create / Edit', 'Delete', 'Manage Users', 'Financial Records', 'Configuration'].map((label, i) => ({
              label,
              render: (r) => (i === 0 ? <b>{r[0]}</b> : r[i] === 'No' || r[i] === 'No access' ? <span className="muted">—</span> : r[i]),
            }))}
            rows={permissionMatrix}
          />
        )}
      </Card>
    </>
  )
}

const Row = ({ label, children }) => (
  <div className="stat-line" style={{ alignItems: 'center' }}>
    <span>{label}</span>
    <span>{children}</span>
  </div>
)

export function SettingsPage() {
  const toast = useToast()
  return (
    <>
      <PageHead title="Configuration" sub="No hard-coded settings — everything is controlled by Super Admin / Admin">
        <button className="btn primary" onClick={() => toast('Settings saved (demo)')}>Save changes</button>
      </PageHead>
      <div className="grid g-2">
        <Card title="Livestock alerts">
          <Row label="Pregnancy attention threshold"><select className="select" defaultValue="90"><option>60</option><option>90</option><option>120</option></select> days</Row>
          <Row label="Delivery reminder before"><select className="select" defaultValue="7"><option>3</option><option>7</option><option>15</option></select> days</Row>
          <Row label="Vaccination due reminder"><select className="select" defaultValue="7"><option>7</option><option>15</option><option>30</option></select> days</Row>
          <Row label="Animal types"><span className="muted">Buffalo, Cow, Goat, Sheep</span> <button className="btn sm">+ Add</button></Row>
        </Card>
        <Card title="Stock & expiry">
          <Row label="Expiry alert period"><select className="select" defaultValue="30"><option>7</option><option>15</option><option>30</option><option>60</option></select> days</Row>
          <Row label="Negative stock"><Badge tone="danger">Blocked</Badge></Row>
          <Row label="Stock issue method"><Badge tone="info">FEFO</Badge></Row>
        </Card>
        <Card title="Profit sharing defaults">
          <Row label="Company + Farmer"><b>50% / 50%</b></Row>
          <Row label="Company + Investor + Farmer"><b>25% / 25% / 50%</b></Row>
          <Row label="100% total check"><Badge tone="ok">Enforced</Badge></Row>
        </Card>
        <Card title="Media & storage">
          <Row label="Active photo limit per animal"><select className="select" defaultValue="10"><option>5</option><option>10</option><option>15</option><option>20</option></select></Row>
          <Row label="When limit exceeded"><select className="select" defaultValue="Archive automatically"><option>Archive automatically</option><option>Ask before</option><option>Oldest first</option></select></Row>
          <Row label="Image compression"><Badge tone="ok">On (legal docs kept original)</Badge></Row>
          <Row label="Storage used"><b>38.2 GB</b> <span className="muted">of 100 GB</span></Row>
        </Card>
        <Card title="Language & region">
          <Row label="Default language"><select className="select"><option>English</option><option>اردو</option></select></Row>
          <Row label="Currency"><b>PKR (Rs)</b></Row>
          <Row label="Units"><span className="muted">Kg, Maund, Litre, Acre, Kanal…</span></Row>
        </Card>
        <Card title="Security">
          <Row label="Two-factor auth (Admin)"><Badge tone="ok">Required</Badge></Row>
          <Row label="Audit trail"><Badge tone="ok">All changes logged</Badge></Row>
          <Row label="Automated backup"><span>Daily · 02:00 · 30-day retention</span></Row>
        </Card>
      </div>
    </>
  )
}
