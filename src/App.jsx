import { useEffect, useState } from 'react'
import {
  LayoutDashboard, Building2, PawPrint, HeartPulse, Milk, Users, HandCoins, Package, ShoppingCart, Wheat, CalendarClock,
  Scale, BookOpen, Moon, MapPin, Bell, FileBarChart, Bot, ShieldCheck, Settings, Search, Menu, CheckSquare,
} from 'lucide-react'
import { ToastProvider } from './ui.jsx'
import { company, alerts } from './data.js'
import Dashboard from './pages/Dashboard.jsx'
import { Animals, Breeding, MilkPage } from './pages/Livestock.jsx'
import { Farmers, Investors } from './pages/People.jsx'
import { Businesses, Inventory, Pos, Agriculture, Installments, Arhti } from './pages/Business.jsx'
import { Accounting, Zakat, Approvals } from './pages/Finance.jsx'
import { Field, Alerts, Reports, Assistant } from './pages/Operations.jsx'
import { UsersRoles, SettingsPage } from './pages/Admin.jsx'

const NAV = [
  { group: 'Overview', ur: 'جائزہ', items: [
    ['dashboard', 'Dashboard', 'ڈیش بورڈ', LayoutDashboard, Dashboard],
    ['businesses', 'Businesses & Branches', 'کاروبار و برانچز', Building2, Businesses],
  ] },
  { group: 'Livestock', ur: 'مویشی', items: [
    ['animals', 'Animal Registry', 'جانوروں کا ریکارڈ', PawPrint, Animals],
    ['breeding', 'Breeding & Pregnancy', 'افزائش و حمل', HeartPulse, Breeding],
    ['milk', 'Milk Hisab', 'دودھ حساب', Milk, MilkPage],
  ] },
  { group: 'People & Partnership', ur: 'افراد و شراکت', items: [
    ['farmers', 'Farmers & Khata', 'کسان و کھاتہ', Users, Farmers],
    ['investors', 'Investors & Partners', 'سرمایہ کار و شراکت دار', HandCoins, Investors],
  ] },
  { group: 'Business Operations', ur: 'کاروباری امور', items: [
    ['inventory', 'Stores & Inventory', 'اسٹور و اسٹاک', Package, Inventory],
    ['pos', 'POS / Sale', 'پوائنٹ آف سیل', ShoppingCart, Pos],
    ['agriculture', 'Agriculture Farms', 'زرعی فارم', Wheat, Agriculture],
    ['installments', 'Installments', 'اقساط', CalendarClock, Installments],
    ['arhti', 'Arhti / Mandi', 'آڑھت / منڈی', Scale, Arhti],
  ] },
  { group: 'Finance', ur: 'مالیات', items: [
    ['accounting', 'Accounting', 'اکاؤنٹنگ', BookOpen, Accounting],
    ['approvals', 'Approval Inbox', 'منظوری', CheckSquare, Approvals],
    ['zakat', 'Zakat & Ushr', 'زکوٰۃ و عشر', Moon, Zakat],
  ] },
  { group: 'Field & Intelligence', ur: 'فیلڈ و ذہانت', items: [
    ['field', 'Field Officers & GPS', 'فیلڈ آفیسر و جی پی ایس', MapPin, Field],
    ['alerts', 'Alert Center', 'الرٹس', Bell, Alerts],
    ['reports', 'Reports', 'رپورٹس', FileBarChart, Reports],
    ['assistant', 'AI Assistant', 'اے آئی معاون', Bot, Assistant],
  ] },
  { group: 'Administration', ur: 'انتظامیہ', items: [
    ['users', 'Users & Roles', 'صارفین و کردار', ShieldCheck, UsersRoles],
    ['settings', 'Configuration', 'ترتیبات', Settings, SettingsPage],
  ] },
]
const ALL = NAV.flatMap((g) => g.items)

const readHash = () => {
  const h = window.location.hash.replace('#/', '')
  return ALL.some((i) => i[0] === h) ? h : 'dashboard'
}

export default function App() {
  const [page, setPage] = useState(readHash)
  const [urdu, setUrdu] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setPage(readHash())
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  useEffect(() => {
    document.body.classList.toggle('urdu', urdu)
  }, [urdu])

  const go = (id) => {
    window.location.hash = '/' + id
    setOpen(false)
    window.scrollTo(0, 0)
  }
  const Current = ALL.find((i) => i[0] === page)[4]

  return (
    <ToastProvider>
      <div className="app">
        <aside className={'sidebar' + (open ? ' open' : '')}>
          <div className="brand">
            <div className="brand-logo">{company.short}</div>
            <div>
              <div className="brand-name">{company.product}</div>
              <div className="brand-sub">{company.name}</div>
            </div>
          </div>
          {NAV.map((g) => (
            <div className="nav-group" key={g.group}>
              <div className="nav-title nav-label">{urdu ? g.ur : g.group}</div>
              {g.items.map(([id, en, ur, Icon]) => (
                <button key={id} className={'nav-item' + (page === id ? ' active' : '')} onClick={() => go(id)}>
                  <Icon size={17} />
                  <span className="nav-label">{urdu ? ur : en}</span>
                  {id === 'alerts' && <span className="count">{alerts.filter((a) => a.level === 'danger').length}</span>}
                  {id === 'approvals' && <span className="count">5</span>}
                </button>
              ))}
            </div>
          ))}
          <div className="side-foot">Demo build · sample data only</div>
        </aside>
        <div className={'backdrop' + (open ? ' show' : '')} onClick={() => setOpen(false)} />

        <div className="main">
          <header className="topbar">
            <button className="menu-btn" onClick={() => setOpen(true)} aria-label="Menu">
              <Menu size={22} />
            </button>
            <div className="search">
              <Search size={16} />
              <input placeholder="Search animal ID, tag, farmer, CNIC, invoice…" />
            </div>
            <div className="top-right">
              <span className="demo-pill">DEMO MODE</span>
              <button className="lang-btn" onClick={() => setUrdu(!urdu)}>
                {urdu ? 'English' : 'اردو'}
              </button>
              <button className="icon-btn" onClick={() => go('alerts')} aria-label="Alerts">
                <Bell size={18} />
                <span className="dot" />
              </button>
              <div className="avatar">SA</div>
              <div className="who">
                <b>Super Admin</b>
                <span>All businesses</span>
              </div>
            </div>
          </header>
          <main className="content">
            <Current go={go} />
          </main>
        </div>
      </div>
    </ToastProvider>
  )
}
