import { Building2, GitBranch, Users, PawPrint, HandCoins, Handshake, TrendingUp, Wallet } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts'
import { PageHead, Card, Kpi, Badge, Table, chartColors, useToast } from '../ui.jsx'
import { businesses, animalTypes, monthly, alerts, pregnancyWatch, deliveries, stockItems, daysTo, activity, milkWeek, fmtK, fmtRs, approvals } from '../data.js'

export default function Dashboard({ go }) {
  const toast = useToast()
  const totalAnimals = animalTypes.reduce((s, a) => s + a.count, 0)
  const totalPregnant = animalTypes.reduce((s, a) => s + a.pregnant, 0)
  const last = monthly[monthly.length - 1]
  const revenue = businesses.reduce((s, b) => s + b.revenue, 0)
  const expense = businesses.reduce((s, b) => s + b.expense, 0)
  const lowStock = stockItems.filter((s) => s.qty < s.min)
  const expiring = stockItems.filter((s) => daysTo(s.expiry) <= 30)
  const todayMilk = milkWeek[milkWeek.length - 1]

  return (
    <>
      <PageHead title="Good morning, Super Admin" sub="Consolidated view across all businesses · Monday, 5 October 2026">
        <button className="btn" onClick={() => toast('Report exported to PDF (demo)')}>Export PDF</button>
        <button className="btn primary" onClick={() => go('animals')}>+ Add Animal</button>
      </PageHead>

      <div className="grid g-6 mb">
        <Kpi icon={Building2} label="Businesses" value={businesses.length} />
        <Kpi icon={GitBranch} label="Branches / Farms" value="24" />
        <Kpi icon={Users} label="Users" value="111" />
        <Kpi icon={PawPrint} label="Farmers" value="312" delta="+9" />
        <Kpi icon={HandCoins} label="Investors" value="46" delta="+3" />
        <Kpi icon={Handshake} label="Partners" value="58" delta="+2" />
      </div>

      <div className="grid g-4 mb">
        <Kpi icon={TrendingUp} label="Sales (this month)" value={fmtK(last.sales)} delta="+12.4%" />
        <Kpi icon={Wallet} label="Expenses (this month)" value={fmtK(last.expenses)} delta="+6.1%" down />
        <Kpi icon={TrendingUp} label="Net Profit (this month)" value={fmtK(last.profit)} delta="+18.2%" />
        <Kpi icon={HandCoins} label="Outstanding receivables" value="Rs 3.18M" delta="-4.0%" />
      </div>

      <div className="grid g-21 mb">
        <Card title="Sales vs Expenses" sub="Last 12 months · all businesses">
          <ResponsiveContainer width="100%" height={270}>
            <AreaChart data={monthly} margin={{ left: 0, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="gs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1f7a4d" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#1f7a4d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#eef1ee" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickFormatter={(v) => (v / 1e6).toFixed(1) + 'M'} tickLine={false} axisLine={false} fontSize={12} width={44} />
              <Tooltip formatter={(v) => fmtRs(v)} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Area isAnimationActive={false} type="monotone" dataKey="sales" name="Sales" stroke="#1f7a4d" strokeWidth={2} fill="url(#gs)" />
              <Area isAnimationActive={false} type="monotone" dataKey="expenses" name="Expenses" stroke="#b7791f" strokeWidth={2} fill="none" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card title="Revenue by Business" sub={`Total ${fmtK(revenue)} · Profit ${fmtK(revenue - expense)}`}>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie isAnimationActive={false} data={businesses} dataKey="revenue" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                {businesses.map((_, i) => <Cell key={i} fill={chartColors[i % chartColors.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => fmtRs(v)} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 10px', fontSize: 12 }}>
            {businesses.map((b, i) => (
              <div key={b.id} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: chartColors[i % chartColors.length] }} />
                <span className="muted" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid g-21 mb">
        <Card title="Livestock Summary" sub={`${totalAnimals.toLocaleString()} animals · ${totalPregnant} pregnant`} right={<button className="btn sm" onClick={() => go('animals')}>View registry</button>}>
          <div className="grid g-4">
            {animalTypes.map((a) => (
              <div key={a.type} className="type-tile">
                <span className="emoji">{a.icon}</span>
                <div>
                  <div className="muted" style={{ fontSize: 12 }}>{a.type}</div>
                  <b>{a.count}</b>
                  <div style={{ fontSize: 11.5 }} className="muted">{a.pregnant} pregnant · {a.milking} milking</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={milkWeek} margin={{ left: 0, right: 8 }}>
                <CartesianGrid stroke="#eef1ee" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} width={40} />
                <Tooltip formatter={(v) => v + ' L'} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                <Bar isAnimationActive={false} dataKey="buffalo" name="Buffalo milk (L)" stackId="m" fill="#1f7a4d" />
                <Bar isAnimationActive={false} dataKey="cow" name="Cow milk (L)" stackId="m" fill="#2b6cb0" />
                <Bar isAnimationActive={false} dataKey="goat" name="Goat milk (L)" stackId="m" fill="#b7791f" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="muted" style={{ fontSize: 12 }}>Today: {(todayMilk.buffalo + todayMilk.cow + todayMilk.goat).toLocaleString()} litres collected</div>
          </div>
        </Card>
        <Card title="Important Alerts" right={<button className="btn sm" onClick={() => go('alerts')}>All alerts</button>} flush>
          <div className="list">
            {alerts.slice(0, 6).map((a, i) => (
              <div key={i} className="list-item">
                <span className={'sev ' + a.level} />
                <div>
                  <div className="ttl">{a.title}</div>
                  <div className="sub">{a.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid g-2 mb">
        <Card title="Pregnancy Attention" sub="Not confirmed beyond 90-day threshold" flush right={<button className="btn sm" onClick={() => go('breeding')}>Open</button>}>
          <Table
            cols={[
              { label: 'Animal', render: (r) => <b>{r.id}</b> },
              { label: 'Farmer', key: 'farmer' },
              { label: 'Days', num: true, render: (r) => <b style={{ color: r.days >= 90 ? '#c43d3d' : undefined }}>{r.days}</b> },
              { label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
            ]}
            rows={pregnancyWatch}
          />
        </Card>
        <Card title="Upcoming Deliveries" flush>
          <Table
            cols={[
              { label: 'Animal', render: (r) => <b>{r.id}</b> },
              { label: 'Farmer', key: 'farmer' },
              { label: 'Expected', key: 'expected' },
              { label: 'State', render: (r) => <Badge>{r.state}</Badge> },
            ]}
            rows={deliveries}
          />
        </Card>
      </div>

      <div className="grid g-3">
        <Card title="Stock Watch" sub={`${lowStock.length} low · ${expiring.length} expiring ≤ 30 days`} flush right={<button className="btn sm" onClick={() => go('inventory')}>Inventory</button>}>
          <div className="list">
            {[...expiring, ...lowStock.filter((s) => !expiring.includes(s))].slice(0, 6).map((s) => (
              <div key={s.sku} className="list-item">
                <div>
                  <div className="ttl">{s.name}</div>
                  <div className="sub">{s.store} · {s.qty} / min {s.min} {s.unit}</div>
                </div>
                <div className="right">{daysTo(s.expiry) <= 30 ? <Badge tone="danger">Exp. {daysTo(s.expiry)}d</Badge> : <Badge tone="warn">Low</Badge>}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Pending Approvals" flush right={<button className="btn sm" onClick={() => go('approvals')}>Inbox</button>}>
          <div className="list">
            {approvals.map((a) => (
              <div key={a.id} className="list-item">
                <div>
                  <div className="ttl">{a.type}</div>
                  <div className="sub">{a.detail}</div>
                </div>
                <div className="right">{a.amount ? fmtK(a.amount) : '—'}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="System Activity" flush>
          <div className="list">
            {activity.map((a, i) => (
              <div key={i} className="list-item">
                <div>
                  <div className="ttl" style={{ fontWeight: 400 }}><b>{a.who}</b> {a.what}</div>
                </div>
                <div className="right">{a.time}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}
