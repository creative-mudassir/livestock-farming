import { createContext, useContext, useState, useCallback } from 'react'

export const ToastCtx = createContext(() => {})
export const useToast = () => useContext(ToastCtx)

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState(null)
  const show = useCallback((m) => {
    setMsg(m)
    clearTimeout(window.__toastT)
    window.__toastT = setTimeout(() => setMsg(null), 2400)
  }, [])
  return (
    <ToastCtx.Provider value={show}>
      {children}
      {msg && <div className="toast">{msg}</div>}
    </ToastCtx.Provider>
  )
}

export const PageHead = ({ title, sub, children }) => (
  <div className="page-head">
    <div>
      <h1>{title}</h1>
      {sub && <p>{sub}</p>}
    </div>
    {children && <div className="actions">{children}</div>}
  </div>
)

export const Card = ({ title, sub, right, children, flush, className = '' }) => (
  <div className={'card ' + className}>
    {title && (
      <div className="card-head">
        <div>
          <h3>{title}</h3>
          {sub && <small>{sub}</small>}
        </div>
        {right}
      </div>
    )}
    <div className={'card-body' + (flush ? ' flush' : '')}>{children}</div>
  </div>
)

export const Kpi = ({ icon: Icon, label, value, delta, down }) => (
  <div className="card kpi">
    <div className="label">
      {Icon && (
        <span className="ic">
          <Icon size={16} />
        </span>
      )}
      {label}
    </div>
    <div className="value">{value}</div>
    {delta && (
      <div className="delta">
        <span className={down ? 'down' : 'up'}>{delta}</span> vs last month
      </div>
    )}
  </div>
)

const statusTone = {
  Active: 'ok', Healthy: 'ok', Synced: 'ok', Posted: 'ok', Confirmed: 'ok', 'On field': 'ok', Paid: 'ok', 'In stock': 'ok',
  Pregnant: 'info', Breeding: 'info', Scheduled: 'info', Reviewer: 'info', Draft: 'gray', Sold: 'gray', Transferred: 'gray', 'Checked out': 'gray', Offline: 'gray',
  'Under Treatment': 'warn', 'Vaccination Due': 'warn', Pending: 'warn', 'Pending Approval': 'warn', Approaching: 'warn', 'Settlement Due': 'warn', Approver: 'warn', 'Low stock': 'warn', 'Expiring soon': 'warn', 'Offline queue': 'warn', 'Test pending': 'warn',
  Overdue: 'danger', Dead: 'danger', Missing: 'danger', Expired: 'danger', Suspended: 'danger', 'Not confirmed': 'danger', 'Repeat breeding': 'danger', 'Below minimum': 'danger',
}
export const Badge = ({ children, tone }) => <span className={'badge ' + (tone || statusTone[children] || 'gray')}>{children}</span>

export const Progress = ({ value, tone }) => (
  <div className={'progress ' + (tone || '')}>
    <span style={{ width: Math.min(100, Math.max(0, value)) + '%' }} />
  </div>
)

export function Table({ cols, rows, onRow, empty = 'No records' }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {cols.map((c) => (
              <th key={c.key || c.label} className={c.num ? 'num' : ''}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={cols.length} className="muted" style={{ textAlign: 'center', padding: 30 }}>
                {empty}
              </td>
            </tr>
          )}
          {rows.map((r, i) => (
            <tr key={i} className={onRow ? 'click' : ''} onClick={onRow ? () => onRow(r) : undefined}>
              {cols.map((c) => (
                <td key={c.key || c.label} className={(c.num ? 'num ' : '') + (c.cls || '')}>
                  {c.render ? c.render(r) : r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Tabs({ tabs, value, onChange }) {
  return (
    <div className="tabs">
      {tabs.map((t) => (
        <button key={t} className={'tab' + (t === value ? ' active' : '')} onClick={() => onChange(t)}>
          {t}
        </button>
      ))}
    </div>
  )
}

export function Drawer({ onClose, children }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export const chartColors = ['#1f7a4d', '#2b6cb0', '#b7791f', '#8b5cf6', '#c43d3d', '#0e9aa7', '#6b7f72', '#d97706']
